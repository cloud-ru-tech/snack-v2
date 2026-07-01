import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, STORY_TEST_IDS } from './helpers';

// Локальная копия `@ds/bottom-sheet` TEST_IDS.handle — маркер mobile-поверхности (swipe-handle
// рендерит только BottomSheet). Кросс-пакетный импорт в spec ломает playwright-compile. Синхронизируй при изменении.
const BOTTOM_SHEET_HANDLE_TEST_ID = 'bottom-sheet__handle';

test.describe('ReleaseNotes — rendering', () => {
  test('opens release notes with data state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ contentState: 'data' }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();

    await expect(getByTestId(TEST_IDS.releaseNotes)).toBeVisible();
    await expect(getByTestId(TEST_IDS.releaseNotesItem).first()).toBeVisible();
  });

  // Функциональная проверка адаптивного свапа поверхности (не визуальная): раскладка из тулбар-глобала
  // `layoutType`. Desktop → модальное окно (нет BottomSheet-handle); mobile → BottomSheet (handle есть).
  test.describe('adaptive surface swap', () => {
    test('desktop layout opens modal (no bottom-sheet surface)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ contentState: 'data' }, undefined, { layoutType: 'desktop' }));
      await getByTestId(STORY_TEST_IDS.triggerOpen).click();

      await expect(getByTestId(TEST_IDS.releaseNotes)).toBeVisible();
      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toHaveCount(0);
    });

    test('mobile layout swaps to bottom-sheet surface', async ({ page, gotoStory, getByTestId }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await gotoStory(buildStoryOptions({ contentState: 'data' }, undefined, { layoutType: 'mobile' }));
      await getByTestId(STORY_TEST_IDS.triggerOpen).click();

      await expect(getByTestId(BOTTOM_SHEET_HANDLE_TEST_ID)).toBeVisible();
    });
  });
});
