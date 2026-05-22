import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Popover — keyboard', () => {
  test('Escape closes popover (closeOnEscapeKey=true)', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions({ trigger: 'click', closeOnEscapeKey: true }));
    await getByTestId(TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.content)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.content)).toBeHidden();
  });

  test('Tab moves focus to trigger', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions());
    await page.keyboard.press('Tab');
    await expect(getByTestId(TEST_IDS.triggerOpen)).toBeFocused();
  });
});
