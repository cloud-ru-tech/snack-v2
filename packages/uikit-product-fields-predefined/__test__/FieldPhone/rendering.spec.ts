import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

// Behavioral assertions (mask formatting, onChange) live in
// stories/FieldPhone/tests/FieldPhone.InteractionTest.stories.tsx::play.
// Droplist open/close lives in interaction.spec.ts.
// All-axis visual coverage lives in the FieldPhone.VisualMatrix story snapshot.

const KEY_SIZES = ['s', 'm', 'l'] as const;

test.describe('FieldPhone — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldPhone)).toBeVisible();
  });

  test('renders the country select trigger', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldPhoneCountrySelect)).toBeVisible();
  });

  for (const size of KEY_SIZES) {
    test(`size propagates to data-size: ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ size }));
      await expect(getByTestId(TEST_IDS.fieldPhone)).toHaveAttribute('data-size', size);
    });
  }

  test('disabled propagates to data-disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.fieldPhone)).toHaveAttribute('data-disabled', 'true');
  });
});
