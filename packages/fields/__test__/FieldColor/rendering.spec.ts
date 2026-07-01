import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, COLOR_PICKER_ROOT_TEST_ID, FIELD_COLOR_STORIES, TEST_IDS } from './helpers';

// Локальная копия `@ds/bottom-sheet` TEST_IDS.handle — маркер mobile-поверхности (swipe-handle
// рендерит только BottomSheet). Кросс-пакетный импорт в spec ломает playwright-compile. Синхронизируй при изменении.
const BOTTOM_SHEET_HANDLE_TEST_ID = 'bottom-sheet__handle';

test.describe('FieldColor — rendering', () => {
  test('renders root, swatch and input', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldColor)).toBeVisible();
    await expect(getByTestId(TEST_IDS.fieldColorSwatch)).toBeVisible();
    await expect(getByTestId(TEST_IDS.fieldColorInput)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const size of ['s', 'l'] as const) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        await expect(getByTestId(TEST_IDS.fieldColor)).toHaveAttribute('data-size', size);
      });
    }

    for (const state of ['error', 'success'] as const) {
      test(`validationState=${state}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ validationState: state }));
        await expect(getByTestId(TEST_IDS.fieldColor)).toHaveAttribute('data-validation-state', state);
      });
    }
  });

  test('disabled state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.fieldColorInput)).toBeDisabled();
  });

  test('background propagates to data-withbackground (present by default, absent when false)', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldColor)).toHaveAttribute('data-withbackground', 'true');

    await gotoStory(buildStoryOptions({ background: false }));
    await expect(getByTestId(TEST_IDS.fieldColor)).not.toHaveAttribute('data-withbackground');
  });

  test('chevron shown by default and in readonly (Figma parity)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldColorChevron)).toBeVisible();

    // Figma readonly-варианты fieldSelectColor показывают chevron-down
    // рядом с copy — в readonly он остаётся видимым.
    await gotoStory(buildStoryOptions({ readonly: true }));
    await expect(getByTestId(TEST_IDS.fieldColorChevron)).toBeVisible();
  });

  // Функциональная проверка адаптивного свапа surface (не визуальная): раскладка из тулбар-глобала
  // `layoutType`. Desktop → popover-палитра (нет BottomSheet-handle); mobile → палитра в BottomSheet.
  test.describe('adaptive surface swap', () => {
    test('desktop layout opens popover picker (no bottom-sheet surface)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, FIELD_COLOR_STORIES.open, { layoutType: 'desktop' }));
      await expect(getByTestId(COLOR_PICKER_ROOT_TEST_ID)).toBeVisible();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toHaveCount(0);
    });

    test('mobile layout swaps to bottom-sheet surface', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions(undefined, FIELD_COLOR_STORIES.open, { layoutType: 'mobile' }));
      await expect(getByTestId(COLOR_PICKER_ROOT_TEST_ID)).toBeVisible();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toBeVisible();
    });
  });
});
