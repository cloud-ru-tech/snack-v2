import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, waitForStableBbox } from '#playwright-tooling/utils';

import { buildStoryOptions, BUTTON_DROPDOWN_STORIES, TEST_IDS } from './helpers';

test.describe('ButtonDropdown — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, BUTTON_DROPDOWN_STORIES.visualMatrix));
    await waitForFonts();

    await assertVisualMatrixSnapshot(page);
  });

  test('open droplist (desktop)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    await getByTestId(TEST_IDS.buttonDropdown).click();
    await waitForStableBbox(getByTestId(TEST_IDS.droplist));
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('open.png', SCREENSHOT_DEFAULT_OPTS);
  });
});
