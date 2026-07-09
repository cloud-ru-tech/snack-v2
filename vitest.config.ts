import createConfig from '@cloud-ru/ft-config-vitest';

export default createConfig(
  {
    test: {
      // *.test.ts — Vitest unit tests.
      // Playwright E2E/visual specs в packages/<pkg>/__test__/*.spec.ts — не трогаем.
      include: ['packages/**/__tests__/**/*.test.ts', 'scripts/__tests__/**/*.test.ts'],
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
