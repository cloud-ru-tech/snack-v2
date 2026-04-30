import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // *.test.ts — Vitest unit tests.
    // Playwright E2E/visual specs в packages/<pkg>/__tests__/*.spec.ts — не трогаем.
    include: ['packages/**/__tests__/**/*.test.ts', 'scripts/__tests__/**/*.test.ts'],
    testTimeout: 120_000,
  },
});
