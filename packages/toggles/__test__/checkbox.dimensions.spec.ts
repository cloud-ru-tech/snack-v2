import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/constants';
import { buildCheckboxStory, CHECKBOX_SIZE_PX, CHECKBOX_TEST_ID } from './helpers';

test.describe('Checkbox — dimensions (Figma parity)', () => {
  for (const size of Object.values(SIZE)) {
    test(`size=${size} matches Figma square`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildCheckboxStory({ size }));

      const box = await getByTestId(CHECKBOX_TEST_ID).boundingBox();
      expect(box).not.toBeNull();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(Math.round(box!.height)).toBeCloseTo(CHECKBOX_SIZE_PX[size], 0);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(Math.round(box!.width)).toBeCloseTo(CHECKBOX_SIZE_PX[size], 0);
    });
  }
});
