import { VISUAL_BASELINE_PROJECT } from '../../../../playwright/constants/projects';
import { expect, test } from '../../../../playwright/fixtures';
import { waitForFonts } from '../../../../playwright/utils/waitForFonts';
import {
  buildFavouriteStory,
  FAVOURITE_TEST_ID,
  NATIVE_INPUT_SUFFIX,
  ROOT_SELECTOR,
  SCREENSHOT_OPTS,
} from '../_shared/helpers';

test.describe('Favourite — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('static — visual matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildFavouriteStory(undefined, 'visual-matrix'));
    await waitForFonts(page);
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_OPTS);
  });

  test('interaction — hover', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory());
    await waitForFonts(page);
    await getByTestId(FAVOURITE_TEST_ID).hover();
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('hover.png', SCREENSHOT_OPTS);
  });

  test('interaction — focus', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory());
    await waitForFonts(page);
    await page.keyboard.press('Tab');
    await expect(getByTestId(`${FAVOURITE_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeFocused();
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('focus.png', SCREENSHOT_OPTS);
  });
});
