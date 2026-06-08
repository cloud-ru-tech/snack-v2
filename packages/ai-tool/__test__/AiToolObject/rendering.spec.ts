import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiToolObject — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('opened propagates to data-opened', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ opened: true }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-opened', 'true');
  });
});
