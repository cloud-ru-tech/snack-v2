import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/Button/constants';
import { buildStoryOptions, BUTTON_HEIGHT_BY_SIZE, BUTTON_TEST_ID } from './helpers';

test.describe('Button — dimensions (Figma parity)', () => {
  for (const size of Object.values(SIZE)) {
    test(`height matches Figma for size=${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ size }));

      const button = getByTestId(BUTTON_TEST_ID);
      const box = await button.boundingBox();

      expect(box).not.toBeNull();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(Math.round(box!.height)).toBeCloseTo(BUTTON_HEIGHT_BY_SIZE[size], 0);
    });
  }
});
