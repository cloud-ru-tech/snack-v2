import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import {
  buildStoryOptions,
  COLLAPSE_BLOCK_TEST_ID,
  ROOT_SELECTOR,
  SCREENSHOT_OPTS,
  STORIES,
  TITLE_TEST_ID,
} from './helpers';

test.describe('CollapseBlockPrimary — visual regression', () => {
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

  test('hover', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts(page);

    await getByTestId(TITLE_TEST_ID).hover();

    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('hover.png', SCREENSHOT_OPTS);
  });

  test('focus', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts(page);

    await page.keyboard.press('Tab');

    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('focus.png', SCREENSHOT_OPTS);
  });

  test('expanded', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ children: 'Visible content' }));
    await waitForFonts(page);

    await getByTestId(TITLE_TEST_ID).click();
    await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-expanded', 'true');
    // Wait for open animation to settle: containerCompletelyOpen signal.
    await expect(page.locator('[data-completely-close]')).toHaveCount(0);

    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('expanded.png', SCREENSHOT_OPTS);
  });
});
