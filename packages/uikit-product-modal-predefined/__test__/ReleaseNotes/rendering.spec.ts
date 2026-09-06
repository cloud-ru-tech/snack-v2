import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, RELEASE_NOTES_STORIES, STORY_TEST_IDS, VM_TRIGGER_TEST_ID } from './helpers';

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

  // Размер окна не зависит ни от длины описания, ни от того, доехали ли данные и иллюстрация.
  test.describe('layout stability', () => {
    test('modal keeps its height between loading and data states', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ contentState: 'data', loading: true }));
      await getByTestId(STORY_TEST_IDS.triggerOpen).click();
      await expect(getByTestId(TEST_IDS.releaseNotesSkeleton)).toBeVisible();

      const loadingHeight = (await getByTestId(TEST_IDS.releaseNotes).boundingBox())?.height;

      await gotoStory(buildStoryOptions({ contentState: 'data', loading: false }));
      await getByTestId(STORY_TEST_IDS.triggerOpen).click();
      await expect(getByTestId(TEST_IDS.releaseNotesItem).first()).toBeVisible();

      expect((await getByTestId(TEST_IDS.releaseNotes).boundingBox())?.height).toBe(loadingHeight);
    });

    test('media slot keeps its box between loading and data states', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ contentState: 'data', loading: true }));
      await getByTestId(STORY_TEST_IDS.triggerOpen).click();

      const loadingBox = await getByTestId(TEST_IDS.releaseNotesMedia).boundingBox();

      await gotoStory(buildStoryOptions({ contentState: 'data', loading: false }));
      await getByTestId(STORY_TEST_IDS.triggerOpen).click();

      const dataBox = await getByTestId(TEST_IDS.releaseNotesMedia).first().boundingBox();

      expect(dataBox?.width).toBe(loadingBox?.width);
      expect(dataBox?.height).toBe(loadingBox?.height);
      expect(dataBox?.x).toBe(loadingBox?.x);
    });

    test('modal keeps its height across slides of different length', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ contentState: 'data' }));
      await getByTestId(STORY_TEST_IDS.triggerOpen).click();

      const firstSlideHeight = (await getByTestId(TEST_IDS.releaseNotes).boundingBox())?.height;

      await getByTestId(TEST_IDS.releaseNotesNextButton).click();
      await expect(getByTestId(TEST_IDS.releaseNotesNextButton)).toBeDisabled();

      expect((await getByTestId(TEST_IDS.releaseNotes).boundingBox())?.height).toBe(firstSlideHeight);
    });

    test('failed illustration renders the fallback instead of the broken img', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, RELEASE_NOTES_STORIES.visualMatrix));
      await getByTestId(VM_TRIGGER_TEST_ID('mediaError')).click();

      const media = getByTestId(TEST_IDS.releaseNotesMedia).first();

      await expect(getByTestId(TEST_IDS.releaseNotesMediaFallback).first()).toBeVisible();
      await expect(media.locator('img')).toHaveCount(0);
    });
  });
});
