import { VISUAL_BASELINE_PROJECT } from '../../../playwright/constants/projects';
import { expect, test } from '../../../playwright/fixtures';
import { waitForFonts } from '../../../playwright/utils/waitForFonts';
import { buildToggleGroupStory, ROOT_SELECTOR, SCREENSHOT_OPTS } from './helpers';

test.describe('ToggleGroup — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('static — default playground', async ({ page, gotoStory }) => {
    await gotoStory(buildToggleGroupStory());
    await waitForFonts(page);
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('toggle-group-default.png', SCREENSHOT_OPTS);
  });

  test('state — single with selection', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildToggleGroupStory({ selectionMode: 'single' }));
    await getByTestId('item-2').click();
    await waitForFonts(page);
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('toggle-group-single.png', SCREENSHOT_OPTS);
  });

  test('state — multiple with selection', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildToggleGroupStory({ selectionMode: 'multiple' }));
    await getByTestId('item-1').click();
    await getByTestId('item-3').click();
    await waitForFonts(page);
    await expect(page.locator(ROOT_SELECTOR)).toHaveScreenshot('toggle-group-multiple.png', SCREENSHOT_OPTS);
  });
});
