import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/constants';
import { buildSwitchStory, SWITCH_HEIGHT_PX, SWITCH_TEST_ID, SWITCH_WIDTH_PX } from './helpers';

test.describe('Switch — dimensions (Figma parity)', () => {
  for (const size of Object.values(SIZE)) {
    test(`size=${size} matches Figma rectangle`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildSwitchStory({ size }));

      const box = await getByTestId(SWITCH_TEST_ID).boundingBox();
      expect(box).not.toBeNull();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(Math.round(box!.height)).toBeCloseTo(SWITCH_HEIGHT_PX[size], 0);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(Math.round(box!.width)).toBeCloseTo(SWITCH_WIDTH_PX[size], 0);
    });
  }
});
