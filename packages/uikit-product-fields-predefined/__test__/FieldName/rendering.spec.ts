import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, FIELD_NAME_STORIES, TEST_IDS } from './helpers';

// Behavioral assertions (blur validation, error clearing) live in
// stories/FieldName/tests/FieldName.InteractionTest.stories.tsx::play.
// All-axis visual coverage lives in the FieldName.VisualMatrix story snapshot.

const KEY_SIZES = ['s', 'm', 'l'] as const;

test.describe('FieldName — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldName)).toBeVisible();
  });

  for (const size of KEY_SIZES) {
    test(`size propagates to data-size: ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ size }));
      await expect(getByTestId(TEST_IDS.fieldName)).toHaveAttribute('data-size', size);
    });
  }

  test('disabled propagates to data-disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.fieldName)).toHaveAttribute('data-disabled', 'true');
  });

  test('RHF variant renders inside a form', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_NAME_STORIES.rhf));
    await expect(getByTestId(TEST_IDS.fieldName)).toBeVisible();
  });
});
