import { resolve } from 'path';

import { defineConfig } from '@playwright/test';

import {
  // IS_LOCAL, // используется когда включен webServer
  PLAYWRIGHT_ROOT_DIR,
  TEST_ID_ATTRIBUTE,
  UIKIT_URL,
} from './playwright/constants/common';
import { PROJECTS } from './playwright/constants/projects';
// import { getCustomHeaders } from './playwright/utils/getCustomHeaders';
import { getEnvironmentDependentConfigPart } from './playwright/utils/getEnvironmentDependentConfigPart';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  testDir: '.',
  testMatch: ['packages/**/__test__/**/*.spec.ts', 'playwright/coverage/**/*.spec.ts'],
  tsconfig: './tsconfig.json',
  outputDir: resolve(PLAYWRIGHT_ROOT_DIR, 'test-results'),
  testIgnore: [
    '**/node_modules/**',
    // Пропускаем visual regression spec'и, чтобы не
    // блокировать пайплайн на расхождении macOS↔Linux font-rendering.
    // Включение обратно — снять переменную SKIP_VISUAL в CI.
    ...(process.env.SKIP_VISUAL ? ['**/__test__/**/visual.spec.ts'] : []),
  ],
  fullyParallel: true,
  // Baseline PNG: packages/<pkg>/__test__/<Component>/__snapshots__/<arg>-<projectName>.png
  // `{testFileDir}` — путь test-файла относительно `{testDir}`, поэтому обязательно его префиксить,
  // иначе снимки уйдут в `<cwd>/<pkg>/__test__/...` (без `packages/`).
  snapshotPathTemplate: '{testDir}/{testFileDir}/__snapshots__/{arg}-{projectName}{ext}',

  use: {
    baseURL: UIKIT_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: TEST_ID_ATTRIBUTE,
    actionTimeout: 10000,
    navigationTimeout: 20000,
    // extraHTTPHeaders: getCustomHeaders(),
  },

  projects: PROJECTS,

  // webServer отключен - запускайте Storybook вручную: pnpm storybook
  // webServer: IS_LOCAL
  //   ? {
  //       command: 'pnpm storybook',
  //       url: UIKIT_URL,
  //       reuseExistingServer: true,
  //       timeout: 120000,
  //     }
  //   : undefined,

  ...getEnvironmentDependentConfigPart({ outputDir: resolve(PLAYWRIGHT_ROOT_DIR, 'test-results') }),
});
