import { expect, test } from '#playwright-tooling/fixtures';

import { buildFavouriteStory, TEST_IDS } from '../_shared/helpers';

test.describe('Favourite — interaction', () => {
  test('click toggles', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory());
    const input = getByTestId(TEST_IDS.favourite.nativeInput);
    await expect(input).not.toBeChecked();
    await input.click();
    await expect(input).toBeChecked();
  });

  test('click on disabled does nothing', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory({ disabled: true }));
    const input = getByTestId(TEST_IDS.favourite.nativeInput);
    await input.click({ force: true });
    await expect(input).not.toBeChecked();
  });
});
