import { resolve } from 'path';

import { defineConfig } from '@playwright/test';

import {
  // IS_LOCAL, // используется когда включен webServer
  PLAYWRIGHT_ROOT_DIR,
  TEST_ID_ATTRIBUTE,
  UIKIT_URL,
} from './playwright/constants/common';
import { PROJECTS } from './playwright/constants/projects';
import { getCustomHeaders } from './playwright/utils/getCustomHeaders';
import { getEnvironmentDependentConfigPart } from './playwright/utils/getEnvironmentDependentConfigPart';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  testDir: './packages',
  testMatch: ['**/__test__/**/*.spec.ts'],
  outputDir: resolve(PLAYWRIGHT_ROOT_DIR, 'test-results'),
  testIgnore: ['**/node_modules/**'],
  fullyParallel: true,

  use: {
    baseURL: UIKIT_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: TEST_ID_ATTRIBUTE,
    actionTimeout: 10000,
    navigationTimeout: 20000,
    extraHTTPHeaders: getCustomHeaders(),
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
