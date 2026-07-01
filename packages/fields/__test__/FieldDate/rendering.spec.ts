import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, CALENDAR_DROPDOWN_CONTENT_TEST_ID, TEST_IDS } from './helpers';

// Локальная копия `@ds/bottom-sheet` TEST_IDS.handle — маркер mobile-поверхности (swipe-handle
// рендерит только BottomSheet). Кросс-пакетный импорт в spec ломает playwright-compile. Синхронизируй при изменении.
const BOTTOM_SHEET_HANDLE_TEST_ID = 'bottom-sheet__handle';

test.describe('FieldDate — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldDate)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const size of ['s', 'l'] as const) {
      test(`size=${size} → data-size`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        await expect(getByTestId(TEST_IDS.fieldDate)).toHaveAttribute('data-size', size);
      });
    }

    for (const validationState of ['error', 'warning'] as const) {
      test(`validationState=${validationState} → data-validation-state`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ validationState }));
        await expect(getByTestId(TEST_IDS.fieldDate)).toHaveAttribute('data-validation-state', validationState);
      });
    }
  });

  test('mode=date-range renders two masked inputs (from / to)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: 'date-range' }));
    const root = getByTestId(TEST_IDS.fieldDate);
    await expect(root.getByTestId(TEST_IDS.fieldDateInputFrom)).toBeVisible();
    await expect(root.getByTestId(TEST_IDS.fieldDateInputTo)).toBeVisible();
  });

  test('mode=date-time exposes the RU time mask in the placeholder (чч:мм:сс)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: 'date-time' }));
    // showSeconds=true по умолчанию в Playground → маска включает секунды.
    await expect(getByTestId(TEST_IDS.fieldDateInput)).toHaveAttribute('placeholder', /чч:мм:сс/);
  });

  // Функциональная проверка адаптивного свапа surface (не визуальная): раскладка из тулбар-глобала
  // `layoutType`. Desktop → popover-календарь (нет BottomSheet-handle); mobile → календарь в BottomSheet.
  test.describe('adaptive surface swap', () => {
    test('desktop layout opens popover calendar (no bottom-sheet surface)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ mode: 'date-time' }, undefined, { layoutType: 'desktop' }));
      await getByTestId(TEST_IDS.fieldDate).getByTestId(TEST_IDS.fieldDateCalendar).click();
      await expect(getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toHaveCount(0);
    });

    test('mobile layout swaps to bottom-sheet surface', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions({ mode: 'date-time' }, undefined, { layoutType: 'mobile' }));
      await getByTestId(TEST_IDS.fieldDate).getByTestId(TEST_IDS.fieldDateCalendar).click();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toBeVisible();
    });
  });
});
