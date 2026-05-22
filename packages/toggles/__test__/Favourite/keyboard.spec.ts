import { expect, test } from '#playwright-tooling/fixtures';

import { buildFavouriteStory, TEST_IDS } from '../_shared/helpers';

test.describe('Favourite — keyboard', () => {
  test('Tab focuses native input', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory());
    await page.keyboard.press('Tab');
    await expect(getByTestId(TEST_IDS.favourite.nativeInput)).toBeFocused();
  });

  test('Space toggles', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory());
    const input = getByTestId(TEST_IDS.favourite.nativeInput);
    await input.focus();
    await page.keyboard.press('Space');
    await expect(input).toBeChecked();
  });
});
