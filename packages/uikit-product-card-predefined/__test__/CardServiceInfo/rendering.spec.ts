import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('CardServiceInfo — rendering', () => {
  test('renders root with title and description', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.cardServiceInfo)).toBeVisible();
    await expect(getByTestId(TEST_IDS.cardServiceInfoTitle)).toBeVisible();
    await expect(getByTestId(TEST_IDS.cardServiceInfoDescription)).toBeVisible();
  });

  test('disabled=true → data-disabled="true"', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.cardServiceInfo)).toHaveAttribute('data-disabled', 'true');
  });

  test('actionsVisibility="always" → favorite renders as pressed control', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ actionsVisibility: 'always', favorite: { enabled: true, checked: true } }));
    const favorite = getByTestId(TEST_IDS.cardServiceInfoFavorite);
    await expect(favorite).toBeVisible();
    await expect(favorite).toHaveAttribute('aria-pressed', 'true');
  });
});
