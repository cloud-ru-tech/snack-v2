import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiToolBadge — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('badgeType propagates to data-badge-type', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ badgeType: 'other' }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-badge-type', 'other');
  });
});
