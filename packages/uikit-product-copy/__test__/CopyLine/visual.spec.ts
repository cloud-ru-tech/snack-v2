import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import { buildStoryOptions, COPY_LINE_STORIES, COPY_LINE_TEST_ID } from './helpers';

test.describe('CopyLine — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, COPY_LINE_STORIES.visualMatrix));
    await waitForFonts(page);

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
  });

  test('hover', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ copyButtonHideStrategy: 'hover' }));
    await waitForFonts(page);

    await getByTestId(COPY_LINE_TEST_ID).hover();

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('hover.png', SCREENSHOT_DEFAULT_OPTS);
  });

  test('focus', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ copyButtonHideStrategy: 'never' }));
    await waitForFonts(page);

    await page.keyboard.press('Tab');
    const copyBtn = getByTestId(COPY_LINE_TEST_ID).locator('button[aria-label="Copy"]');
    await expect(copyBtn).toBeFocused();

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('focus.png', SCREENSHOT_DEFAULT_OPTS);
  });
});
