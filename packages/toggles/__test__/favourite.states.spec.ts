import { expect, test } from '../../../playwright/fixtures';
import { buildFavouriteStory, FAVOURITE_TEST_ID, NATIVE_INPUT_SUFFIX } from './helpers';

test.describe('Favourite — states', () => {
  test('disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory({ disabled: true }));
    await expect(getByTestId(FAVOURITE_TEST_ID)).toHaveAttribute('data-disabled', 'true');
    await expect(getByTestId(`${FAVOURITE_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeDisabled();
  });

  test('loading hides native input', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory({ loading: true }));
    await expect(getByTestId(FAVOURITE_TEST_ID)).toHaveAttribute('data-loading', 'true');
    await expect(getByTestId(`${FAVOURITE_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toHaveCount(0);
  });

  test('defaultChecked', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory({ checked: true }));
    await expect(getByTestId(FAVOURITE_TEST_ID)).toHaveAttribute('data-checked', 'true');
    await expect(getByTestId(`${FAVOURITE_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeChecked();
  });
});
