import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiToolText — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('error + mono propagate to data-*', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ error: true, mono: true }));
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toHaveAttribute('data-error', 'true');
    await expect(root).toHaveAttribute('data-mono', 'true');
  });
});
