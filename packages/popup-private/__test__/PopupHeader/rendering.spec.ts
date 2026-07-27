import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('PopupHeader — rendering', () => {
  test('renders header root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.header)).toBeVisible();
    await expect(getByTestId(TEST_IDS.title)).toBeVisible();
  });
});
