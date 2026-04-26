import { expect, test } from '../../../../playwright/fixtures';
import { buildFavouriteStory, FAVOURITE_TEST_ID, NATIVE_INPUT_SUFFIX } from '../_shared/helpers';

test.describe('Favourite — interaction', () => {
  test('click toggles', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory());
    const input = getByTestId(`${FAVOURITE_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await expect(input).not.toBeChecked();
    await input.click();
    await expect(input).toBeChecked();
  });

  test('click on disabled does nothing', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory({ disabled: true }));
    const input = getByTestId(`${FAVOURITE_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await input.click({ force: true });
    await expect(input).not.toBeChecked();
  });
});
