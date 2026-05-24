import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // *.test.ts — Vitest unit tests.
    // Playwright E2E/visual specs в packages/<pkg>/__test__/*.spec.ts — не трогаем.
    include: ['packages/**/__tests__/**/*.test.ts', 'scripts/__tests__/**/*.test.ts'],
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
});
