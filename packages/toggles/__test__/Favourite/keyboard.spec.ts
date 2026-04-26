import { expect, test } from '../../../../playwright/fixtures';
import { buildFavouriteStory, FAVOURITE_TEST_ID, NATIVE_INPUT_SUFFIX } from '../_shared/helpers';

test.describe('Favourite — keyboard', () => {
  test('Tab focuses native input', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory());
    await page.keyboard.press('Tab');
    await expect(getByTestId(`${FAVOURITE_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeFocused();
  });

  test('Space toggles', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory());
    const input = getByTestId(`${FAVOURITE_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await input.focus();
    await page.keyboard.press('Space');
    await expect(input).toBeChecked();
  });
});
