import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import { buildStoryOptions, SWITCH_ROW_STORIES, SWITCH_ROW_TEST_ID } from './helpers';

test.describe('SwitchRow — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, SWITCH_ROW_STORIES.visualMatrix));
    await waitForFonts(page);

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
  });

  test.describe('interaction states', () => {
    test('hover', async ({ page, gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await waitForFonts(page);

      await getByTestId(SWITCH_ROW_TEST_ID).hover();

      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        'interaction-hover.png',
        SCREENSHOT_DEFAULT_OPTS,
      );
    });

    test('focus', async ({ page, gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await waitForFonts(page);

      await page.keyboard.press('Tab');
      await expect(getByTestId(SWITCH_ROW_TEST_ID)).toBeFocused();

      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        'interaction-focus.png',
        SCREENSHOT_DEFAULT_OPTS,
      );
    });
  });
});
