import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiToolKeyValue — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('variant propagates to data-variant', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ variant: 'column' }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-variant', 'column');
  });
});
