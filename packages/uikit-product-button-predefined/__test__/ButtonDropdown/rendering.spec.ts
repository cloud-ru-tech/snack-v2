import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('ButtonDropdown — rendering', () => {
  test('renders trigger button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.buttonDropdown)).toBeVisible();
  });

  test('desktop layoutType opens droplist', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ layoutType: 'desktop' }));

    await getByTestId(TEST_IDS.buttonDropdown).click();
    await expect(getByTestId(TEST_IDS.droplist)).toBeVisible();
  });

  test('mobile layoutType opens droplist in modal', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ layoutType: 'mobile' }));

    await getByTestId(TEST_IDS.buttonDropdown).click();
    await expect(getByTestId(TEST_IDS.droplist)).toBeVisible();
  });
});
