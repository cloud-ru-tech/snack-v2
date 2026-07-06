import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

// Behavioral assertions (mask formatting on input) live in
// stories/FieldMask/tests/FieldMask.InteractionTest.stories.tsx::play.
// All-axis visual coverage lives in the FieldMask.VisualMatrix story snapshot.

const KEY_SIZES = ['s', 'm', 'l'] as const;
const KEY_MASKS = ['uuid', 'code', 'snils'] as const;

test.describe('FieldMask — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldMask)).toBeVisible();
  });

  for (const size of KEY_SIZES) {
    test(`size propagates to data-size: ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ size }));
      await expect(getByTestId(TEST_IDS.fieldMask)).toHaveAttribute('data-size', size);
    });
  }

  for (const mask of KEY_MASKS) {
    test(`renders for mask=${mask}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ mask }));
      await expect(getByTestId(TEST_IDS.fieldMask)).toBeVisible();
    });
  }

  test('disabled propagates to data-disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.fieldMask)).toHaveAttribute('data-disabled', 'true');
  });
});
