import { expect, test } from '#playwright-tooling/fixtures';

import { buildEmptyBlockStoryOptions, EMPTY_BLOCK_TEST_ID } from './helpers';

test.describe('EmptyBlock — rendering', () => {
  test('renders root', async ({ page, gotoStory }) => {
    await gotoStory(buildEmptyBlockStoryOptions());
    await expect(page.getByTestId(EMPTY_BLOCK_TEST_ID)).toBeVisible();
  });
});
