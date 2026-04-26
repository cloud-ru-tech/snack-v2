import { VISUAL_BASELINE_PROJECT } from '../../../playwright/constants/projects';
import { expect, test } from '../../../playwright/fixtures';
import { waitForFonts } from '../../../playwright/utils/waitForFonts';
import { FAVOURITE_ICON } from '../src/constants';
import {
  buildFavouriteStory,
  FAVOURITE_TEST_ID,
  NATIVE_INPUT_SUFFIX,
  RESPONSIVE_VIEWPORTS,
  ROOT_SELECTOR,
  SCREENSHOT_OPTS,
} from './helpers';

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
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('favourite-visual-matrix.png', SCREENSHOT_OPTS);
  });

  for (const icon of Object.values(FAVOURITE_ICON)) {
    test(`state — checked/${icon}`, async ({ page, gotoStory }) => {
      await gotoStory(buildFavouriteStory({ icon, defaultChecked: true }));
      await waitForFonts(page);
      await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot(`favourite-checked-${icon}.png`, SCREENSHOT_OPTS);
    });
  }

  test('state — disabled', async ({ page, gotoStory }) => {
    await gotoStory(buildFavouriteStory({ disabled: true }));
    await waitForFonts(page);
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('favourite-disabled.png', SCREENSHOT_OPTS);
  });

  test('state — loading', async ({ page, gotoStory }) => {
    await gotoStory(buildFavouriteStory({ loading: true }));
    await waitForFonts(page);
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('favourite-loading.png', SCREENSHOT_OPTS);
  });

  test('interaction — hover', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory());
    await waitForFonts(page);
    await getByTestId(FAVOURITE_TEST_ID).hover();
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('favourite-hover.png', SCREENSHOT_OPTS);
  });

  test('interaction — focus', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory());
    await waitForFonts(page);
    await page.keyboard.press('Tab');
    await expect(getByTestId(`${FAVOURITE_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeFocused();
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('favourite-focus.png', SCREENSHOT_OPTS);
  });

  test.describe('responsive', () => {
    for (const { width, height, name } of RESPONSIVE_VIEWPORTS) {
      test(`visual-matrix at ${name}px`, async ({ page, gotoStory }) => {
        await page.setViewportSize({ width, height });
        await gotoStory(buildFavouriteStory(undefined, 'visual-matrix'));
        await waitForFonts(page);
        await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot(
          `favourite-visual-matrix-${name}.png`,
          SCREENSHOT_OPTS,
        );
      });
    }
  });
});
