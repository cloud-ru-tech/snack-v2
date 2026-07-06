import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, FIELD_CHAT_STORIES, TEST_IDS } from './helpers';

// Behavioral assertions (Enter submits, Shift+Enter newline) live in
// stories/FieldChat/tests/FieldChat.InteractionTest.stories.tsx::play.
// All-axis visual coverage lives in the FieldChat.VisualMatrix story snapshot.

test.describe('FieldChat — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldChat)).toBeVisible();
  });

  test('renders the submit button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldChatSubmit)).toBeVisible();
  });

  test('renders the upload button when attachment is configured', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldChatUpload)).toBeVisible();
  });

  test('disabled propagates to data-disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.fieldChat)).toHaveAttribute('data-disabled', 'true');
  });

  test('with-attachments example renders attached files', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_CHAT_STORIES.withAttachments));
    await expect(getByTestId(TEST_IDS.fieldChat)).toBeVisible();
  });
});
