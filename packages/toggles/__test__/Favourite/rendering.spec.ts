import { expect, test } from '#playwright-tooling/fixtures';

import { FAVOURITE_ICON, SIZE } from '../../src/constants';
import { buildFavouriteStory, FAVOURITE_SIZE_PX, TEST_IDS } from '../_shared/helpers';

test.describe('Favourite — rendering', () => {
  test('renders visible root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory());
    await expect(getByTestId(TEST_IDS.favourite.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.favourite.root)).toHaveAttribute('role', 'checkbox');
  });

  test('renders native input with type=checkbox', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildFavouriteStory());
    await expect(getByTestId(TEST_IDS.favourite.nativeInput)).toHaveAttribute('type', 'checkbox');
  });

  test.describe('props propagation', () => {
    for (const size of Object.values(SIZE)) {
      test(`data-size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildFavouriteStory({ size }));
        await expect(getByTestId(TEST_IDS.favourite.root)).toHaveAttribute('data-size', size);
      });
    }

    for (const icon of Object.values(FAVOURITE_ICON)) {
      test(`data-icon=${icon}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildFavouriteStory({ icon }));
        await expect(getByTestId(TEST_IDS.favourite.root)).toHaveAttribute('data-icon', icon);
      });
    }
  });

  test.describe('states', () => {
    test('disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildFavouriteStory({ disabled: true }));
      await expect(getByTestId(TEST_IDS.favourite.root)).toHaveAttribute('data-disabled', 'true');
      await expect(getByTestId(TEST_IDS.favourite.nativeInput)).toBeDisabled();
    });

    test('loading hides native input', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildFavouriteStory({ loading: true }));
      await expect(getByTestId(TEST_IDS.favourite.root)).toHaveAttribute('data-loading', 'true');
      await expect(getByTestId(TEST_IDS.favourite.nativeInput)).toHaveCount(0);
    });

    test('checked', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildFavouriteStory({ checked: true }));
      await expect(getByTestId(TEST_IDS.favourite.root)).toHaveAttribute('data-checked', 'true');
      await expect(getByTestId(TEST_IDS.favourite.nativeInput)).toBeChecked();
    });
  });

  test.describe('dimensions (Figma parity)', () => {
    for (const size of Object.values(SIZE)) {
      test(`size=${size} matches Figma`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildFavouriteStory({ size }));

        const box = await getByTestId(TEST_IDS.favourite.root).boundingBox();
        expect(box).not.toBeNull();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(Math.round(box!.height)).toBeCloseTo(FAVOURITE_SIZE_PX[size], 0);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(Math.round(box!.width)).toBeCloseTo(FAVOURITE_SIZE_PX[size], 0);
      });
    }
  });
});
