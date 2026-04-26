import { VISUAL_BASELINE_PROJECT } from '../../../playwright/constants/projects';
import { expect, test } from '../../../playwright/fixtures';
import { waitForFonts } from '../../../playwright/utils/waitForFonts';
import {
  buildRadioStory,
  NATIVE_INPUT_SUFFIX,
  RADIO_TEST_ID,
  RESPONSIVE_VIEWPORTS,
  ROOT_SELECTOR,
  SCREENSHOT_OPTS,
} from './helpers';

test.describe('Radio — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('static — visual matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildRadioStory(undefined, 'visual-matrix'));
    await waitForFonts(page);
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('radio-visual-matrix.png', SCREENSHOT_OPTS);
  });

  test('state — checked', async ({ page, gotoStory }) => {
    await gotoStory(buildRadioStory({ defaultChecked: true }));
    await waitForFonts(page);
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('radio-checked.png', SCREENSHOT_OPTS);
  });

  test('state — disabled', async ({ page, gotoStory }) => {
    await gotoStory(buildRadioStory({ disabled: true }));
    await waitForFonts(page);
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('radio-disabled.png', SCREENSHOT_OPTS);
  });

  test('state — loading', async ({ page, gotoStory }) => {
    await gotoStory(buildRadioStory({ loading: true }));
    await waitForFonts(page);
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('radio-loading.png', SCREENSHOT_OPTS);
  });

  test('interaction — hover', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory());
    await waitForFonts(page);
    await getByTestId(RADIO_TEST_ID).hover();
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('radio-hover.png', SCREENSHOT_OPTS);
  });

  test('interaction — focus', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory());
    await waitForFonts(page);
    await page.keyboard.press('Tab');
    await expect(getByTestId(`${RADIO_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeFocused();
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('radio-focus.png', SCREENSHOT_OPTS);
  });

  test.describe('responsive', () => {
    for (const { width, height, name } of RESPONSIVE_VIEWPORTS) {
      test(`visual-matrix at ${name}px`, async ({ page, gotoStory }) => {
        await page.setViewportSize({ width, height });
        await gotoStory(buildRadioStory(undefined, 'visual-matrix'));
        await waitForFonts(page);
        await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot(`radio-visual-matrix-${name}.png`, SCREENSHOT_OPTS);
      });
    }
  });
});
