import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, FIELD_DESCRIPTION_STORIES, TEST_IDS } from './helpers';

// Behavioral assertions (validation on input) live in
// stories/FieldDescription/tests/FieldDescription.InteractionTest.stories.tsx::play.
// All-axis visual coverage lives in the FieldDescription.VisualMatrix story snapshot.

const KEY_SIZES = ['s', 'm', 'l'] as const;

test.describe('FieldDescription — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldDescription)).toBeVisible();
  });

  for (const size of KEY_SIZES) {
    test(`size propagates to data-size: ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ size }));
      await expect(getByTestId(TEST_IDS.fieldDescription)).toHaveAttribute('data-size', size);
    });
  }

  test('disabled propagates to data-disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.fieldDescription)).toHaveAttribute('data-disabled', 'true');
  });

  // Стори по умолчанию показывает свёрнутое состояние — кнопку «Добавить описание».
  // Поведение collapse→reveal покрыто step'ом в tests/FieldDescription.InteractionTest (test-runner).
  test('add-button example renders the collapsed add button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_DESCRIPTION_STORIES.withAddButton));
    await expect(getByTestId(TEST_IDS.fieldDescriptionAddButton)).toBeVisible();
  });

  test('RHF variant renders inside a form', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_DESCRIPTION_STORIES.rhf));
    await expect(getByTestId(TEST_IDS.fieldDescription)).toBeVisible();
  });
});
