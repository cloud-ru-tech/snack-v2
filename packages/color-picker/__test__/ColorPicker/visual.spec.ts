import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import { buildStoryOptions, COLOR_PICKER_STORIES, TEST_IDS } from './helpers';

test.describe('ColorPicker — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, COLOR_PICKER_STORIES.visualMatrix));
    await waitForFonts(page);

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
  });

  test.describe('interaction (Playground)', () => {
    test('hover on hex field', async ({ page, gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ autoApply: true }));
      await waitForFonts(page);

      await getByTestId(TEST_IDS.fieldHex).hover();

      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        'interaction-hover-field.png',
        SCREENSHOT_DEFAULT_OPTS,
      );
    });

    test('focus on hex field', async ({ page, gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ autoApply: true }));
      await waitForFonts(page);

      await getByTestId(TEST_IDS.fieldHex).locator('input').focus();

      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        'interaction-focus-field.png',
        SCREENSHOT_DEFAULT_OPTS,
      );
    });

    test('focus on hue slider', async ({ page, gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ autoApply: true }));
      await waitForFonts(page);

      await getByTestId(TEST_IDS.sliderH).focus();

      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        'interaction-focus-slider.png',
        SCREENSHOT_DEFAULT_OPTS,
      );
    });
  });
});
