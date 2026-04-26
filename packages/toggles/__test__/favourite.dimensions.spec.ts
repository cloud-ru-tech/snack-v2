import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/constants';
import { buildFavouriteStory, FAVOURITE_SIZE_PX, FAVOURITE_TEST_ID } from './helpers';

test.describe('Favourite — dimensions (Figma parity)', () => {
  for (const size of Object.values(SIZE)) {
    test(`size=${size} icon matches Figma`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildFavouriteStory({ size }));

      const box = await getByTestId(FAVOURITE_TEST_ID).boundingBox();
      expect(box).not.toBeNull();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(Math.round(box!.height)).toBeCloseTo(FAVOURITE_SIZE_PX[size], 0);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(Math.round(box!.width)).toBeCloseTo(FAVOURITE_SIZE_PX[size], 0);
    });
  }
});
