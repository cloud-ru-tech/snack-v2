import { VISUAL_BASELINE_PROJECT } from '../../../playwright/constants/projects';
import { expect, test } from '../../../playwright/fixtures';
import { waitForFonts } from '../../../playwright/utils/waitForFonts';
import {
  buildCheckboxStory,
  CHECKBOX_TEST_ID,
  NATIVE_INPUT_SUFFIX,
  RESPONSIVE_VIEWPORTS,
  ROOT_SELECTOR,
  SCREENSHOT_OPTS,
} from './helpers';

test.describe('Checkbox — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('static — visual matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildCheckboxStory(undefined, 'visual-matrix'));
    await waitForFonts(page);

    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('checkbox-visual-matrix.png', SCREENSHOT_OPTS);
  });

  test('state — checked', async ({ page, gotoStory }) => {
    await gotoStory(buildCheckboxStory({ checked: true }));
    await waitForFonts(page);

    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('checkbox-checked.png', SCREENSHOT_OPTS);
  });

  test('state — indeterminate', async ({ page, gotoStory }) => {
    await gotoStory(buildCheckboxStory({ indeterminate: true }));
    await waitForFonts(page);

    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('checkbox-indeterminate.png', SCREENSHOT_OPTS);
  });

  test('state — disabled', async ({ page, gotoStory }) => {
    await gotoStory(buildCheckboxStory({ disabled: true }));
    await waitForFonts(page);

    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('checkbox-disabled.png', SCREENSHOT_OPTS);
  });

  test('state — loading', async ({ page, gotoStory }) => {
    await gotoStory(buildCheckboxStory({ loading: true }));
    await waitForFonts(page);

    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('checkbox-loading.png', SCREENSHOT_OPTS);
  });

  test('interaction — hover', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory());
    await waitForFonts(page);

    await getByTestId(CHECKBOX_TEST_ID).hover();

    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('checkbox-hover.png', SCREENSHOT_OPTS);
  });

  test('interaction — focus', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory());
    await waitForFonts(page);

    await page.keyboard.press('Tab');
    await expect(getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeFocused();

    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('checkbox-focus.png', SCREENSHOT_OPTS);
  });

  test.describe('responsive', () => {
    for (const { width, height, name } of RESPONSIVE_VIEWPORTS) {
      test(`visual-matrix at ${name}px`, async ({ page, gotoStory }) => {
        await page.setViewportSize({ width, height });
        await gotoStory(buildCheckboxStory(undefined, 'visual-matrix'));
        await waitForFonts(page);

        await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot(
          `checkbox-visual-matrix-${name}.png`,
          SCREENSHOT_OPTS,
        );
      });
    }
  });
});
