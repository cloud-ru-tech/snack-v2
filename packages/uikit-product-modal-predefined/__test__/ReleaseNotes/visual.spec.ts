import { Page } from '@playwright/test';

import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { composeScreenshots } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, RELEASE_NOTES_STORIES, VM_TRIGGER_TEST_ID } from './helpers';

/**
 * Ждёт декодирования всех картинок в кадре: `toBeVisible()` проходит на ещё
 * не отрисованном `<img>`, и снимок фиксирует карточку без изображения.
 */
async function waitForImages(page: Page): Promise<void> {
  await page.waitForFunction(() =>
    Array.from(document.images).every(image => image.complete && image.naturalWidth > 0),
  );
}

test.describe('ReleaseNotes — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('content states (desktop surface)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    // Пять перезагрузок story с ожиданием шрифтов и картинок: не укладывается в 30s.
    test.slow();
    const cells = [];

    for (const state of ['data', 'one', 'noData', 'error', 'loading']) {
      await gotoStory(buildStoryOptions(undefined, RELEASE_NOTES_STORIES.visualMatrix));
      await getByTestId(VM_TRIGGER_TEST_ID(state)).click();
      await expect(getByTestId(TEST_IDS.releaseNotes)).toBeVisible();
      await waitForFonts();
      await waitForImages(page);
      cells.push({ label: state, png: await page.screenshot(SCREENSHOT_DEFAULT_OPTS) });
    }

    const composite = await composeScreenshots(cells, { layout: 'col' });
    expect(composite).toMatchSnapshot('content-states.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Mobile-поверхность (bottom sheet): форсим тулбар-глобалом `layoutType='mobile'` + mobile viewport.
  // Композит по всем состояниям контента — симметрично desktop-снимку `content-states.png`.
  test('content states (mobile surface)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    const cells = [];

    for (const state of ['data', 'one', 'noData', 'error', 'loading']) {
      await gotoStory(buildStoryOptions(undefined, RELEASE_NOTES_STORIES.visualMatrix, { layoutType: 'mobile' }));
      await getByTestId(VM_TRIGGER_TEST_ID(state)).click();
      await expect(getByTestId(TEST_IDS.releaseNotes)).toBeVisible();
      await waitForFonts();
      await waitForImages(page);
      cells.push({ label: state, png: await page.screenshot(SCREENSHOT_DEFAULT_OPTS) });
    }

    const composite = await composeScreenshots(cells, { layout: 'row' });
    expect(composite).toMatchSnapshot('content-states-mobile.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
