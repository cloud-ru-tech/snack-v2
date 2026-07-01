import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, itemTestId, TEST_IDS } from './helpers';

// Локальная копия `@ds/bottom-sheet` TEST_IDS.handle — маркер mobile-поверхности (swipe-handle
// рендерит только BottomSheet). Кросс-пакетный импорт в spec ломает playwright-compile. Синхронизируй при изменении.
const BOTTOM_SHEET_HANDLE_TEST_ID = 'bottom-sheet__handle';

test.describe('Droplist — rendering', () => {
  test('renders trigger (closed by default)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.droplist.triggerOpen)).toBeVisible();
  });

  // size попадает на открытый popover, а не на триггер: проверяем data-size на item'е
  // после открытия. Ключевая выборка (s / l), не весь enum — все размеры покрыты
  // визуально в open-sizes composite (visual.spec.ts).
  test.describe('size prop propagates to the open list', () => {
    for (const size of ['s', 'l'] as const) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        await getByTestId(TEST_IDS.droplist.triggerOpen).click();
        await expect(getByTestId(itemTestId('overview'))).toHaveAttribute('data-size', size);
      });
    }
  });

  // Функциональная проверка адаптивного свапа surface (не визуальная): раскладка из тулбар-глобала
  // `layoutType`. Desktop → popover-список (нет BottomSheet-handle); mobile → MobileDroplist в BottomSheet.
  test.describe('adaptive surface swap', () => {
    test('desktop layout opens popover list (no bottom-sheet surface)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, undefined, { layoutType: 'desktop' }));
      await getByTestId(TEST_IDS.droplist.triggerOpen).click();
      await expect(getByTestId(itemTestId('overview'))).toBeVisible();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toHaveCount(0);
    });

    test('mobile layout swaps to bottom-sheet surface', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions(undefined, undefined, { layoutType: 'mobile' }));
      await getByTestId(TEST_IDS.droplist.triggerOpen).click();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toBeVisible();
    });
  });
});
