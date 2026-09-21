import { devices, PlaywrightTestConfig } from '@playwright/test';

/**
 * Общая матрица браузеров для всех Playwright-тестов против Storybook.
 *
 * Визуальные снэпшоты снимаются только на `chrome` (визуальные spec'и
 * делают `test.skip` для остальных проектов) — попиксельный паритет
 * между движками недостижим и не даёт сигнала. Исключение — mobile-only
 * bottom-sheet: его эталоны снимаются на `mobile-android`.
 */

// BottomSheet — mobile-only компонент: поведение снимается на `mobile-android` (Chromium)
// и `mobile-ios` (WebKit), в остальных проектах спеки не собираются. Маска задана здесь,
// чтобы `testMatch` мобильного проекта и `testIgnore` остальных не разъезжались.
const BOTTOM_SHEET_SPECS = 'packages/bottom-sheet/__test__/**/*.spec.ts';

export const PROJECTS: NonNullable<PlaywrightTestConfig['projects']> = [
  {
    name: 'chrome',
    testIgnore: [BOTTOM_SHEET_SPECS],
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 1200, height: 871 },
    },
  },
  {
    name: 'firefox',
    testIgnore: [BOTTOM_SHEET_SPECS],
    use: {
      ...devices['Desktop Firefox'],
      viewport: { width: 1200, height: 871 },
    },
  },
  {
    name: 'safari',
    testIgnore: [BOTTOM_SHEET_SPECS],
    use: {
      ...devices['Desktop Safari'],
      viewport: { width: 1200, height: 871 },
    },
  },
  {
    name: 'mobile',
    testIgnore: [BOTTOM_SHEET_SPECS],
    use: {
      ...devices['Pixel 7'],
    },
  },
  {
    name: 'mobile-android',
    testMatch: [BOTTOM_SHEET_SPECS],
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
