import { existsSync, readdirSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import type { StorybookConfig } from '@storybook/react-vite';
import { sanitize } from 'storybook/internal/csf';
import type { Indexer, IndexInput } from 'storybook/internal/types';
import type { Plugin } from 'vite';

import {
  CATEGORIES_BY_DOMAIN,
  categoriesForDomain,
  domainHasCategories,
  OTHER_CATEGORY,
  resolveCategoryId,
} from '../../docs/src/config/categories.ts';
import { DOMAINS, resolveDomainId } from '../../docs/src/config/domains.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', '..', '..');

const STORY_PKG_RE = /[\\/]packages[\\/]([^\\/]+)[\\/]stories[\\/]/;

/**
 * Набор stories можно сузить до части пакетов через env `SB_PACKAGES`
 * (через запятую, имена папок в `packages/`): `SB_PACKAGES=button,link`.
 * Пусто/не задано — собираются все пакеты (дефолт). Используется в preview-джобе,
 * чтобы собирать Storybook только по изменённым пакетам. Алиасы `@ds/*` при этом
 * остаются полными (см. collectDsAliases) — отфильтрованные stories всё равно
 * импортят соседние пакеты.
 */
function storiesGlobs(): string[] {
  const pkgs = (process.env.SB_PACKAGES ?? '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  if (pkgs.length === 0) return ['../../../packages/*/stories/**/*.stories.@(ts|tsx)'];
  return pkgs.map(p => `../../../packages/${p}/stories/**/*.stories.@(ts|tsx)`);
}

declare global {
  var __DS_SB_ORDER__: { domains: string[]; categories: string[] } | undefined;
}

// Порядок групп сайдбара для storySort (preview.tsx). Storybook статически парсит
// storySort и не исполняет его, поэтому импортнуть реестр внутри нельзя — прокидываем
// порядок через globalThis (main.ts и eval storySort живут в одном Node-процессе).
// Источник один: domains.ts + categories.ts.
globalThis.__DS_SB_ORDER__ = {
  domains: DOMAINS.map(d => d.storybookLabel),
  categories: [
    ...new Set([
      ...Object.values(CATEGORIES_BY_DOMAIN)
        .flat()
        .map(c => c.label),
      OTHER_CATEGORY.label,
    ]),
  ],
};

/**
 * По пути стори-файла и исходному meta.title считает новый title с сегментом
 * категории (домен → категория → компонент, как в доке; реестр — config/categories.ts)
 * и стабильный id = sanitize(исходный title). Возвращает null, если домен без
 * категорий или title уже преобразован. Категория берётся из пути, а не из title.
 */
function regroupTitle(fileName: string, originalTitle: string): { title: string; id: string } | null {
  const pkg = fileName.match(STORY_PKG_RE)?.[1];
  if (!pkg) return null;
  const domain = resolveDomainId(pkg);
  if (!domainHasCategories(domain)) return null;
  const cat = categoriesForDomain(domain).find(c => c.id === resolveCategoryId(domain, pkg));
  if (!cat) return null;
  const domainLabel = DOMAINS.find(d => d.id === domain)?.storybookLabel ?? domain;
  const prefix = `${domainLabel}/${cat.label}/`;
  if (originalTitle.startsWith(prefix)) return null;
  const rest = originalTitle.split('/').slice(1).join('/'); // отбрасываем исходный домен-сегмент
  return { title: `${prefix}${rest}`, id: sanitize(originalTitle) };
}

/**
 * Группировка stories в сайдбаре по категориям (как в доке) — без изменения story ID,
 * поэтому StorybookEmbed в доках и e2e-хелперы продолжают работать. Нужны оба слоя:
 *  - индексатор (`withCategoryGrouping`) — переписывает title записи индекса + `metaId`
 *    (сайдбарное дерево + id записи в индексе);
 *  - vite-трансформ (`categoryGroupingPlugin`) — инжектит `id` в рантайм-CSF, чтобы
 *    рантайм story id совпал с индексным (иначе Storybook не находит стори).
 * Оба считают (title, id) из одного `regroupTitle`. meta.title в файлах не трогаем.
 *
 * meta.title — единственный `title:` со слешем (args-проп title слеша не содержит).
 */
function categoryGroupingPlugin(): Plugin {
  return {
    name: 'ds-storybook-category-grouping',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.stories\.tsx?$/.test(id)) return null;
      let changed = false;
      const out = code.replace(/title:\s*'([^']*\/[^']*)'/g, (full, title: string) => {
        const r = regroupTitle(id, title);
        if (!r) return full;
        changed = true;
        return `title: '${r.title}', id: '${r.id}'`;
      });
      return changed ? { code: out, map: null } : null;
    },
  };
}

function withCategoryGrouping(indexers: Indexer[] = []): Indexer[] {
  return indexers.map(indexer => ({
    ...indexer,
    createIndex: async (fileName, options) =>
      (await indexer.createIndex(fileName, options)).map(input => {
        const r = input.title ? regroupTitle(fileName, input.title) : null;
        return r ? ({ ...input, title: r.title, metaId: (input as IndexInput).metaId ?? r.id } as IndexInput) : input;
      }),
  }));
}

/**
 * Автоматически собирает алиасы `@ds/<pkg>` (и все его подпути из `package.json::exports`,
 * например `@ds/icons/interface/system`) на исходники. Источник истины — `exports` пакета:
 * любая запись с полем `source` получает алиас `<pkgName><subpath>` → этот `source`-файл.
 * Чтобы добавить новый пакет/подпуть в Storybook, достаточно завести его в `package.json`
 * пакета — вручную этот список не правится.
 */
function collectDsAliases(): Record<string, string> {
  const packagesDir = join(root, 'packages');
  const aliases: Record<string, string> = {};

  for (const entry of readdirSync(packagesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const pkgDir = join(packagesDir, entry.name);
    const pkgJsonPath = join(pkgDir, 'package.json');
    if (!existsSync(pkgJsonPath)) continue;

    const pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf-8')) as {
      name?: string;
      exports?: Record<string, { source?: string } | string>;
    };
    if (typeof pkg.name !== 'string' || !pkg.name.startsWith('@ds/')) continue;

    if (pkg.exports) {
      // Vite matches string aliases by prefix ('@ds/icons' also matches '@ds/icons/foo'), so the
      // more specific subpath entries must be inserted before the root '.' entry — otherwise the
      // root alias would be tried first and silently swallow every subpath import.
      const entries = Object.entries(pkg.exports).sort(([a], [b]) => Number(a === '.') - Number(b === '.'));
      for (const [subpath, condition] of entries) {
        if (subpath === './package.json' || typeof condition === 'string') continue;
        const source = condition.source;
        if (typeof source !== 'string') continue;
        const specifier = subpath === '.' ? pkg.name : `${pkg.name}/${subpath.replace(/^\.\//, '')}`;
        aliases[specifier] = join(pkgDir, source);
      }
    } else if (existsSync(join(pkgDir, 'src/index.ts'))) {
      aliases[pkg.name] = join(pkgDir, 'src/index.ts');
    }
  }

  return aliases;
}

/**
 * Ensure __REACT__ / __REACT_DOM__ are set before manager addon chunks run.
 * Addon chunks may execute before globals-runtime.js in some load orders; this avoids "React is not defined".
 */
const MANAGER_REACT_POLYFILL = `
<script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
<script>
(function(){ if (typeof globalThis.__REACT__ !== 'undefined') return;
  globalThis.__REACT__ = globalThis.React;
  globalThis.__REACT_DOM__ = globalThis.ReactDOM;
  var r = globalThis.ReactDOM;
  globalThis.__REACT_DOM_CLIENT__ = r && { createRoot: r.createRoot, hydrateRoot: r.hydrateRoot };
})();
</script>
`;

const config: StorybookConfig = {
  stories: storiesGlobs(),
  managerHead: head => `${MANAGER_REACT_POLYFILL}${head ?? ''}`,
  addons: [
    join(__dirname, 'addons/theme-controls/preset.ts'),
    join(__dirname, 'addons/readme/preset.ts'),
    join(__dirname, 'addons/figma/preset.ts'),
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Включает автогенерацию argTypes из TS-типов компонентов
  // (same wiring как у `pnpm gen:props` / `scripts/gen-props.mts`, который пишет
  // `packages/<pkg>/docs/props.json`). Без этого SB-дефолт = `react-docgen` (JS,
  // не понимает TS-типы) → enum-пропы получают text-control вместо radio.
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: join(root, 'tsconfig.gen-props.json'),
      // Плагин-уровневый include матчится относительно vite-root (`apps/storybook`).
      // Без явного указания дефолт `**/*.tsx` не достаёт до `packages/*/src/**`, и
      // плагин логирует "Skipping docgen ... not in TypeScript project" для всех
      // компонентов пакетов. См. resolveDocgenRootFiles в плагине.
      // Только `.tsx` — иначе плагин обрабатывает `.ts`-файлы с `as const`-объектами
      // (`BACKGROUND_PREDEFINED_FILL`, `SIZE`, `VARIANT`, …) и навешивает на них
      // `displayName` / `__docgenInfo`. Эти ключи всплывают в `Object.values(...)`
      // в stories → улетают в компонент как невалидный enum-литерал → краш VM.
      include: ['../../packages/*/src/**/*.tsx'],
      exclude: ['../../packages/icons/**'],
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: prop => !prop.parent || !prop.parent.fileName.includes('node_modules'),
    },
  },
  experimental_indexers: withCategoryGrouping,
  async viteFinal(config) {
    config.plugins = [categoryGroupingPlugin(), ...(config.plugins ?? [])];

    // Stories live under packages/* — ensure automatic JSX runtime so JSX works without `import React`.
    config.esbuild = {
      ...config.esbuild,
      jsx: 'automatic',
      jsxImportSource: 'react',
    };

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        ...collectDsAliases(),
        '@sbercloud/snack-v2-locale': join(root, 'packages/locale/src/index.ts'),
        '#storybook/components': join(__dirname, 'components/index.ts'),
        '#storybook/hooks/useDraggable': join(__dirname, 'hooks/useDraggable.ts'),
        '#storybook/hooks': join(__dirname, 'hooks/index.ts'),
        '#docs/lib/figma': join(root, 'apps/docs/src/lib/figma.ts'),
      },
    };

    // Sourcemaps (внешние .map рядом с чанками) нужны для runtime V8-coverage:
    // playwright собирает покрытие по собранному бандлу и маппит его обратно на
    // packages/*/src через эти .map (см. playwright/fixtures.ts → collectCoverage).
    // Билд остаётся чистым (без инструментации), поэтому один и тот же артефакт
    // идёт и в деплой, и в тесты — на MR и на master одинаково.
    config.build = {
      ...config.build,
      sourcemap: true,
    };

    config.css = {
      ...config.css,
      modules: { localsConvention: 'camelCaseOnly' },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          loadPaths: [join(root, 'node_modules')],
        },
      },
    };

    return config;
  },
};

export default config;
