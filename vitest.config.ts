import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import createConfig from '@cloud-ru/ft-config-vitest';

// `@ds/<pkg>[/<subpath>]` → исходник из поля `source` в `exports` пакета (как Storybook
// collectDsAliases). Даёт резолв workspace-пакетов в исходники — vitest трансформирует TS
// на лету, dist не нужен, поэтому unit-джобе не нужен build. `useAliases: false` оставлен:
// авто-конвертер tsconfig-путей мапит `@ds/*` на директорию без `/index` и ломает резолв —
// тут явный. Subpath-экспорты (`@ds/icons/interface/system`) обязаны резолвиться так же,
// как корень: пакеты вроде @ds/icons публикуют поверхность только через них.
const PACKAGES_DIR = resolve(process.cwd(), 'packages');

function collectDsSourceAliases(): Map<string, string> {
  const aliases = new Map<string, string>();

  for (const name of readdirSync(PACKAGES_DIR)) {
    const pkgDir = resolve(PACKAGES_DIR, name);
    const pkgJsonPath = resolve(pkgDir, 'package.json');
    if (!existsSync(pkgJsonPath)) continue;

    const { exports: pkgExports } = JSON.parse(readFileSync(pkgJsonPath, 'utf8')) as {
      exports?: Record<string, { source?: string } | string>;
    };

    for (const [entry, target] of Object.entries(pkgExports ?? {})) {
      const source = typeof target === 'object' ? target.source : undefined;
      if (!source) continue;

      const specifier = entry === '.' ? `@ds/${name}` : `@ds/${name}/${entry.replace(/^\.\//, '')}`;
      aliases.set(specifier, resolve(pkgDir, source));
    }

    // Пакеты без `exports` (или без `source` в нём) — прежний фолбэк на барель.
    if (!aliases.has(`@ds/${name}`) && existsSync(resolve(pkgDir, 'src/index.ts'))) {
      aliases.set(`@ds/${name}`, resolve(pkgDir, 'src/index.ts'));
    }
  }

  return aliases;
}

const dsSourceAliases = collectDsSourceAliases();

export default createConfig(
  {
    // Unit-тесты проверяют логику (utils/mappers/validators), не стили. CSS заглушается,
    // чтобы тест, загружающий @ds/*-barrel с компонентом, не требовал собранный dist-CSS
    // зависимостей (build:pkg собирает per-component styles.module.css только для
    // запрошенных пакетов, не для их deps). Import CSS-модуля → Proxy, отдающий имя
    // класса как есть; plain .css → пусто. Так selective build (JS-замыкание) достаточно.
    plugins: [
      {
        name: 'ds-source-resolve',
        enforce: 'pre',
        resolveId(id: string) {
          return dsSourceAliases.get(id) ?? null;
        },
      },
      {
        name: 'stub-css-for-unit',
        enforce: 'pre',
        resolveId(id: string) {
          if (/\.(css|scss|sass)(\?.*)?$/.test(id)) return `\0stub-css:${id}`;
          return null;
        },
        load(id: string) {
          if (id.startsWith('\0stub-css:')) {
            return 'export default new Proxy({}, { get: (_, k) => (typeof k === "string" ? k : "") });';
          }
          return null;
        },
      },
    ],
    test: {
      // *.test.ts — Vitest unit tests.
      // Playwright E2E/visual specs в packages/<pkg>/__test__/*.spec.ts — не трогаем.
      // Vendored @ds/tokens-builder (apps/) несёт свой upstream-набор unit-тестов
      // в `__tests__/` (double underscore — не путать с Playwright `__test__/`). Гоняем их тоже.
      include: [
        'packages/**/__tests__/**/*.test.ts',
        'scripts/__tests__/**/*.test.ts',
        'apps/tokens-builder/__tests__/**/*.test.ts',
      ],
      // Базовый конфиг добавляет `**/__tests__/**/*.spec.*` — в репо `.spec.ts`
      // зарезервирован под Playwright (`__test__/`), а `.claude/` — временный
      // скретч агента. Исключаем, чтобы не тянуть их в unit-прогон.
      exclude: ['**/.claude/**'],
      testTimeout: 120_000,
      coverage: {
        // Активируется только при `--coverage`. Дамп в coverage/raw/vitest/ —
        // третий источник для scripts/coverage-merge.mts (рядом с harvester'ом
        // из storybook и e2e-spec'ами из playwright). См. coverage-standard.md.
        provider: 'istanbul',
        reporter: ['json'],
        reportsDirectory: 'coverage/raw/vitest',
        // Не задаём include явно — istanbul инструментирует только модули, реально
        // импортированные тестом. С явным include всё src/** инструментируется и
        // показывает 0/total для нетронутых файлов, что после merge с playwright
        // даёт раздутые totals и просадку процентов.
        exclude: [
          'packages/*/src/**/index.ts',
          'packages/*/src/**/types.ts',
          'packages/*/src/types.ts',
          '**/*.d.ts',
          '**/*.stories.{ts,tsx}',
          '**/__tests__/**',
          '**/__test__/**',
        ],
      },
    },
  },
  {
    // tsconfig-алиасы отключены: root `tsconfig.json` мапит `@ds/*` на
    // `packages/*/src` (директорию без `/index`), из-за чего конвертер
    // ломает резолв `@ds/*`. Unit-тесты резолвят workspace-пакеты через
    // node_modules (pnpm-симлинки), как и до миграции.
    useAliases: false,
  },
);
