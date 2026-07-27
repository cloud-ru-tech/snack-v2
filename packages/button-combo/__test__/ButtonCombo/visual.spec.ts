import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  waitForSettledInViewport,
} from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/testIds';
import { buildStoryOptions, BUTTON_COMBO_ITEM_TEST_IDS, BUTTON_COMBO_STORIES } from './helpers';

test.describe('ButtonCombo — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, BUTTON_COMBO_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus × pressed)', async ({
    page,
    gotoStory,
    waitForFonts,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await assertInteractionStatesSnapshot(page, { target: getByTestId(TEST_IDS.option), includePressed: true });
  });

  test('open droplist (desktop)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BUTTON_COMBO_STORIES.interactionTest));
    await waitForFonts();
    await getByTestId(TEST_IDS.dropdownTrigger).click();
    await expect(getByTestId(BUTTON_COMBO_ITEM_TEST_IDS.duplicate)).toBeVisible();
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-desktop.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });

  // Mobile: адаптивный @ds/list раскрывает список в BottomSheet; раскладку задаёт тулбар-глобал layoutType.
  test('open droplist (mobile bottom-sheet)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions(undefined, BUTTON_COMBO_STORIES.interactionTest, { layoutType: 'mobile' }));
    await waitForFonts();
    await getByTestId(TEST_IDS.dropdownTrigger).click();
    const item = getByTestId(BUTTON_COMBO_ITEM_TEST_IDS.duplicate);
    await expect(item).toBeVisible();
    await waitForSettledInViewport(item);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
