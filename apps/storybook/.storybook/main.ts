import { existsSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import type { StorybookConfig } from '@storybook/react-vite';
import istanbul from 'vite-plugin-istanbul';

// Включается только для playwright-dev-сервера (`INSTRUMENT=true storybook dev`).
// В vitest НЕ ставим — там coverage-istanbul провайдер инструментирует сам,
// иначе получается двойная инструментация и пустой coverage-final.json.
const COVERAGE_ENABLED = process.env.INSTRUMENT === 'true';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', '..', '..');

/**
 * Автоматически собирает алиасы `@ds/<pkg>` для всех `packages/<pkg>` с `src/index.ts`.
 * Чтобы добавить новый пакет в Storybook, достаточно создать `packages/<pkg>/src/index.ts` —
 * вручную править этот список не нужно.
 */
function collectDsAliases(): Record<string, string> {
  const packagesDir = join(root, 'packages');
  return Object.fromEntries(
    readdirSync(packagesDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory() && existsSync(join(packagesDir, entry.name, 'src/index.ts')))
      .map(entry => [`@ds/${entry.name}`, join(packagesDir, entry.name, 'src/index.ts')]),
  );
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
  stories: ['../../../packages/*/stories/**/*.stories.@(ts|tsx)'],
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
  async viteFinal(config) {
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
        '#storybook/components': join(__dirname, 'components/index.ts'),
        '#storybook/hooks/useDraggable': join(__dirname, 'hooks/useDraggable.ts'),
        '#storybook/hooks': join(__dirname, 'hooks/index.ts'),
        '#docs/lib/figma': join(root, 'apps/docs/src/lib/figma.ts'),
      },
    };

    if (COVERAGE_ENABLED) {
      config.plugins = [
        ...(config.plugins ?? []),
        istanbul({
          cwd: root,
          // test-exclude (v9) сравнивает relative-from-cwd через minimatch,
          // абсолютные globs не работают.
          include: ['packages/*/src/**/*.ts', 'packages/*/src/**/*.tsx'],
          exclude: [
            '**/node_modules/**',
            '**/*.stories.ts',
            '**/*.stories.tsx',
            '**/*.test.ts',
            '**/*.test.tsx',
            '**/__test__/**',
            '**/*.d.ts',
            // Барели и type-only — не несут runtime-кода, всегда 0% и
            // искажают per-пакет метрику. См. .claude/rules/coverage-standard.md.
            'packages/*/src/**/index.ts',
            'packages/*/src/**/types.ts',
            'packages/*/src/types.ts',
          ],
          extension: ['.ts', '.tsx'],
          forceBuildInstrument: true,
          requireEnv: false,
        }),
      ];
    }

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
