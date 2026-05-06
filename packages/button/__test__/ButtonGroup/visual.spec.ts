import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import {
  buildButtonGroupStoryOptions,
  BUTTON_GROUP_ROOT_SELECTOR,
  BUTTON_GROUP_SCREENSHOT_OPTS,
  BUTTON_GROUP_STORIES,
} from './helpers';

test.describe('ButtonGroup — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildButtonGroupStoryOptions(undefined, BUTTON_GROUP_STORIES.visualMatrix));
    await waitForFonts(page);

    await expect(page.locator(BUTTON_GROUP_ROOT_SELECTOR)).toHaveScreenshot(
      'visual-matrix.png',
      BUTTON_GROUP_SCREENSHOT_OPTS,
    );
  });
});
