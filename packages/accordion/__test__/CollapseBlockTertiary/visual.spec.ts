import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import { buildStoryOptions, ROOT_SELECTOR, SCREENSHOT_OPTS, STORIES } from './helpers';

test.describe('CollapseBlockTertiary — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, STORIES.visualMatrix));
    await waitForFonts(page);

    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_OPTS);
  });
});
