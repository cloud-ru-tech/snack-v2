import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, screenshotRegion } from '#playwright-tooling/utils';

import { buildStoryOptions, TEST_IDS, WIDGET_STORIES } from './helpers';

test.describe('Widget — visual regression', () => {
  test.beforeEach((_, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, WIDGET_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('open kebab droplist', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await getByTestId(TEST_IDS.kebabButton).click();
    await expect(getByTestId(TEST_IDS.kebabDroplist)).toBeVisible();

    const png = await screenshotRegion(
      page,
      [getByTestId(TEST_IDS.kebabButton), getByTestId(TEST_IDS.kebabDroplist)],
      16,
      SCREENSHOT_DEFAULT_OPTS,
    );
    expect(png).toMatchSnapshot('open-kebab.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
