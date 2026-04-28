import { VISUAL_BASELINE_PROJECT } from '../../../../playwright/constants/projects';
import { expect, test } from '../../../../playwright/fixtures';
import { waitForFonts } from '../../../../playwright/utils';
import { buildMobileInfoRowStoryOptions, MOBILE_INFO_ROW_STORIES } from './helpers';

const SCREENSHOT_OPTS = {
  animations: 'disabled',
  caret: 'hide',
};

test.describe('MobileInfoRow — visual', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== VISUAL_BASELINE_PROJECT, `Baselines are ${VISUAL_BASELINE_PROJECT}-only`);
  });

  test('visual matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildMobileInfoRowStoryOptions(undefined, MOBILE_INFO_ROW_STORIES.visualMatrix));
    await waitForFonts(page);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('visual-matrix.png', SCREENSHOT_OPTS);
  });
});
