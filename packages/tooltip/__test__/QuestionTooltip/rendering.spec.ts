import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  QUESTION_TOOLTIP_KEY_COMBOS,
  QUESTION_TOOLTIP_STORIES,
  QUESTION_TOOLTIP_TRIGGER_LABEL,
  TEST_IDS,
} from './helpers';

// Локальная копия `@ds/bottom-sheet` TEST_IDS.handle — маркер mobile-поверхности (swipe-handle
// рендерит только BottomSheet). Кросс-пакетный импорт в spec ломает playwright-compile. Синхронизируй при изменении.
const BOTTOM_SHEET_HANDLE_TEST_ID = 'bottom-sheet__handle';

test.describe('QuestionTooltip — rendering', () => {
  test.describe('render', () => {
    test('playground renders trigger button', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, QUESTION_TOOLTIP_STORIES.playground));
      await expect(page.getByRole('button', { name: QUESTION_TOOLTIP_TRIGGER_LABEL })).toBeVisible();
    });

    test('visual-matrix renders multiple triggers', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions(undefined, QUESTION_TOOLTIP_STORIES.visualMatrix));
      await expect(page.locator('#storybook-root')).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const { size, placement } of QUESTION_TOOLTIP_KEY_COMBOS) {
      test(`size=${size} placement=${placement} — trigger has data-size`, async ({ gotoStory, page }) => {
        await gotoStory(buildStoryOptions({ size, placement }, QUESTION_TOOLTIP_STORIES.playground));
        const trigger = page.getByRole('button', { name: QUESTION_TOOLTIP_TRIGGER_LABEL });
        await expect(trigger).toBeVisible();
        await expect(trigger).toHaveAttribute('data-size', size);
      });
    }
  });

  // Функциональная проверка адаптивного свапа surface (не визуальная): раскладка из тулбар-глобала
  // `layoutType`. Desktop → hover-tooltip (нет BottomSheet-handle); mobile → `tip` в BottomSheet по клику.
  test.describe('adaptive surface swap', () => {
    test('desktop layout shows hover tooltip (no bottom-sheet surface)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, QUESTION_TOOLTIP_STORIES.playground, { layoutType: 'desktop' }));
      await getByTestId(TEST_IDS.questionTooltip.triggerOpen).hover();
      await expect(getByTestId(TEST_IDS.questionTooltip.content)).toBeVisible();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toHaveCount(0);
    });

    test('mobile layout opens tip in bottom-sheet surface', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions(undefined, QUESTION_TOOLTIP_STORIES.playground, { layoutType: 'mobile' }));
      await getByTestId(TEST_IDS.questionTooltip.triggerOpen).click();
      await expect(getByTestId(TEST_IDS.questionTooltip.content)).toBeVisible();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toBeVisible();
    });
  });
});
