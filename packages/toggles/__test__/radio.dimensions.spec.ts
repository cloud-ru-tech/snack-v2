import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/constants';
import { buildRadioStory, RADIO_SIZE_PX, RADIO_TEST_ID } from './helpers';

test.describe('Radio — dimensions (Figma parity)', () => {
  for (const size of Object.values(SIZE)) {
    test(`size=${size} matches Figma`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildRadioStory({ size }));

      const box = await getByTestId(RADIO_TEST_ID).boundingBox();
      expect(box).not.toBeNull();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(Math.round(box!.height)).toBeCloseTo(RADIO_SIZE_PX[size], 0);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(Math.round(box!.width)).toBeCloseTo(RADIO_SIZE_PX[size], 0);
    });
  }
});
