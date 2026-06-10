import { devices, PlaywrightTestConfig } from '@playwright/test';

/**
 * Общая матрица браузеров для всех Playwright-тестов против Storybook.
 *
 * Визуальные снэпшоты снимаются только на `chrome` (визуальные spec'и
 * делают `test.skip` для остальных проектов) — попиксельный паритет
 * между движками недостижим и не даёт сигнала.
 */
export const PROJECTS: NonNullable<PlaywrightTestConfig['projects']> = [
  {
    name: 'chrome',
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1200, height: 871 },
    },
  },
  {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox'],
      viewport: { width: 1200, height: 871 },
    },
  },
  {
    name: 'safari',
    use: {
      ...devices['Desktop Safari'],
      viewport: { width: 1200, height: 871 },
    },
  },
  {
    name: 'mobile',
    use: {
      ...devices['Pixel 7'],
    },
  },
  {
    name: 'mobile-android',
    use: {
      ...devices['Pixel 7'],
    },
  },
  {
    name: 'mobile-ios',
    use: {
      ...devices['iPhone 14'],
    },
  },
];

export const VISUAL_BASELINE_PROJECT = 'chrome';
