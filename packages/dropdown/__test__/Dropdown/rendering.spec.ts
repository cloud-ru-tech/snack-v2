import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

// Локальная копия `@ds/bottom-sheet` TEST_IDS.handle — маркер mobile-поверхности (swipe-handle
// рендерит только BottomSheet). Кросс-пакетный импорт в spec ломает playwright-compile. Синхронизируй при изменении.
const BOTTOM_SHEET_HANDLE_TEST_ID = 'bottom-sheet__handle';

test.describe('Dropdown — rendering', () => {
  test('renders trigger', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.triggerOpen)).toBeVisible();
  });

  test('opens dropdown content on trigger click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ trigger: 'click' }));
    await getByTestId(TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  // Функциональная проверка адаптивного свапа surface (не визуальная): раскладка из тулбар-глобала
  // `layoutType`. Desktop → popover (нет BottomSheet-handle); mobile → BottomSheet (handle есть).
  test.describe('adaptive surface swap', () => {
    test('desktop layout opens popover (no bottom-sheet surface)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ trigger: 'click' }, undefined, { layoutType: 'desktop' }));
      await getByTestId(TEST_IDS.triggerOpen).click();
      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toHaveCount(0);
    });

    test('mobile layout swaps to bottom-sheet surface', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions({ trigger: 'click' }, undefined, { layoutType: 'mobile' }));
      await getByTestId(TEST_IDS.triggerOpen).click();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toBeVisible();
    });
  });
});
