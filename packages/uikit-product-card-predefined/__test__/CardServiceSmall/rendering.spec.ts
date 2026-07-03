import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('CardServiceSmall — rendering', () => {
  test('checked=true → data-checked="true"', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ checked: true }));
    await expect(getByTestId(TEST_IDS.cardServiceSmall)).toHaveAttribute('data-checked', 'true');
  });

  test('outline=true → data-view="outline"', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ outline: true }));
    await expect(getByTestId(TEST_IDS.cardServiceSmall)).toHaveAttribute('data-view', 'outline');
  });
});
