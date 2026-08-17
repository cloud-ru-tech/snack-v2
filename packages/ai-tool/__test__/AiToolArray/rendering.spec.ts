import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiToolArray — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('open propagates to data-open', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ open: true }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-open', 'true');
  });
});
