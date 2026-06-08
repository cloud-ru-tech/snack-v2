import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiToolDetailsLabel — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('state propagates to data-state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ state: 'error' }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-state', 'error');
  });
});
