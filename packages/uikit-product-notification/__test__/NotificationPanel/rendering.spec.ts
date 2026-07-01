import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, DRAWER_TRIGGER_TEST_ID, TEST_IDS } from './helpers';

// Локальная копия `@ds/bottom-sheet` TEST_IDS.handle — маркер mobile-поверхности (swipe-handle
// рендерит только BottomSheet). Кросс-пакетный импорт в spec ломает playwright-compile. Синхронизируй при изменении.
const BOTTOM_SHEET_HANDLE_TEST_ID = 'bottom-sheet__handle';

test.describe('NotificationPanel — rendering', () => {
  test('renders trigger by default; panel mounts after click', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const trigger = getByTestId(DRAWER_TRIGGER_TEST_ID);
    await expect(trigger).toBeVisible();
    await trigger.click();
    await expect(page.getByTestId(TEST_IDS.panel.title)).toBeVisible();
  });

  // Функциональная проверка адаптивного свапа surface (не визуальная): раскладка из тулбар-глобала
  // `layoutType`. Desktop → боковой drawer-панель (нет BottomSheet-handle); mobile → BottomSheet (handle есть).
  test.describe('adaptive surface swap', () => {
    test('desktop layout opens drawer panel (no bottom-sheet surface)', async ({ page, gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, undefined, { layoutType: 'desktop' }));
      await getByTestId(DRAWER_TRIGGER_TEST_ID).click();
      await expect(page.getByTestId(TEST_IDS.panel.title)).toBeVisible();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toHaveCount(0);
    });

    test('mobile layout swaps to bottom-sheet surface', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions(undefined, undefined, { layoutType: 'mobile' }));
      await getByTestId(DRAWER_TRIGGER_TEST_ID).click();
      await expect(page.getByTestId(TEST_IDS.panel.title)).toBeVisible();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toBeVisible();
    });
  });
});
