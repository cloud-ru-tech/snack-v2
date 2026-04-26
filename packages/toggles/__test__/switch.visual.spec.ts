import { VISUAL_BASELINE_PROJECT } from '../../../playwright/constants/projects';
import { expect, test } from '../../../playwright/fixtures';
import { waitForFonts } from '../../../playwright/utils/waitForFonts';
import {
  buildSwitchStory,
  NATIVE_INPUT_SUFFIX,
  RESPONSIVE_VIEWPORTS,
  ROOT_SELECTOR,
  SCREENSHOT_OPTS,
  SWITCH_TEST_ID,
} from './helpers';

test.describe('Switch — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('static — visual matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildSwitchStory(undefined, 'visual-matrix'));
    await waitForFonts(page);
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('switch-visual-matrix.png', SCREENSHOT_OPTS);
  });

  test('state — checked', async ({ page, gotoStory }) => {
    await gotoStory(buildSwitchStory({ defaultChecked: true }));
    await waitForFonts(page);
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('switch-checked.png', SCREENSHOT_OPTS);
  });

  test('state — disabled', async ({ page, gotoStory }) => {
    await gotoStory(buildSwitchStory({ disabled: true }));
    await waitForFonts(page);
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('switch-disabled.png', SCREENSHOT_OPTS);
  });

  test('state — loading', async ({ page, gotoStory }) => {
    await gotoStory(buildSwitchStory({ loading: true }));
    await waitForFonts(page);
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('switch-loading.png', SCREENSHOT_OPTS);
  });

  test('interaction — hover', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory());
    await waitForFonts(page);
    await getByTestId(SWITCH_TEST_ID).hover();
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('switch-hover.png', SCREENSHOT_OPTS);
  });

  test('interaction — focus', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory());
    await waitForFonts(page);
    await page.keyboard.press('Tab');
    await expect(getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeFocused();
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('switch-focus.png', SCREENSHOT_OPTS);
  });

  test.describe('responsive', () => {
    for (const { width, height, name } of RESPONSIVE_VIEWPORTS) {
      test(`visual-matrix at ${name}px`, async ({ page, gotoStory }) => {
        await page.setViewportSize({ width, height });
        await gotoStory(buildSwitchStory(undefined, 'visual-matrix'));
        await waitForFonts(page);
        await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot(`switch-visual-matrix-${name}.png`, SCREENSHOT_OPTS);
      });
    }
  });
});
