import { expect, test } from '../../../playwright/fixtures';
import { FAVOURITE_ICON, SIZE } from '../src/constants';
import { buildFavouriteStory, FAVOURITE_TEST_ID, NATIVE_INPUT_SUFFIX } from './helpers';

test.describe('Favourite — rendering', () => {
  test('renders visible root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory());
    await expect(getByTestId(FAVOURITE_TEST_ID)).toBeVisible();
    await expect(getByTestId(FAVOURITE_TEST_ID)).toHaveAttribute('role', 'checkbox');
  });

  test('renders native input with type=checkbox', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory());
    await expect(getByTestId(`${FAVOURITE_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toHaveAttribute('type', 'checkbox');
  });

  test.describe('sizes', () => {
    for (const size of Object.values(SIZE)) {
      test(`data-size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildFavouriteStory({ size }));
        await expect(getByTestId(FAVOURITE_TEST_ID)).toHaveAttribute('data-size', size);
      });
    }
  });

  test.describe('icons', () => {
    for (const icon of Object.values(FAVOURITE_ICON)) {
      test(`data-icon=${icon}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildFavouriteStory({ icon }));
        await expect(getByTestId(FAVOURITE_TEST_ID)).toHaveAttribute('data-icon', icon);
      });
    }
  });
});
