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

  test('shows copy button only for a non-empty copyValue', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ copyValue: '' }));
    await expect(getByTestId(TEST_IDS.copy)).toHaveCount(0);

    await gotoStory(buildStoryOptions({ copyValue: 'TextBlock Text' }));
    await expect(getByTestId(TEST_IDS.copy)).toBeVisible();

    await gotoStory(buildStoryOptions({ copyValue: 'TextBlock Text', showCopyButton: false }));
    await expect(getByTestId(TEST_IDS.copy)).toHaveCount(0);
  });
});
