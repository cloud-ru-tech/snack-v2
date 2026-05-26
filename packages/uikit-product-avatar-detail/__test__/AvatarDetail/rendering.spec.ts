import { expect, test } from '#playwright-tooling/fixtures';

import { AVATAR_DETAIL_TEST_ID, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AvatarDetail — rendering', () => {
  test('renders root with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(AVATAR_DETAIL_TEST_ID)).toBeVisible();
  });

  test('renders name text', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ name: 'John Doe' }));

    await expect(getByTestId(TEST_IDS.name)).toContainText('John Doe');
  });

  test('renders contactData button when provided', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ contactData: 'jdoe@example.com' }));

    await expect(getByTestId(TEST_IDS.contactData)).toBeVisible();
    await expect(getByTestId(TEST_IDS.contactData)).toContainText('jdoe@example.com');
  });

  test('hides contactData when not provided', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ contactData: undefined }));

    await expect(getByTestId(TEST_IDS.contactData)).toBeHidden();
  });

  test('renders description when provided', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ description: 'Frontend developer' }));

    await expect(getByTestId(TEST_IDS.description)).toBeVisible();
    await expect(getByTestId(TEST_IDS.description)).toContainText('Frontend developer');
  });

  test('hides description when not provided', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ description: undefined }));

    await expect(getByTestId(TEST_IDS.description)).toBeHidden();
  });
});
