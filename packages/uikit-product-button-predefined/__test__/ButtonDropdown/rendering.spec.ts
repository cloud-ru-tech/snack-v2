import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, BUTTON_DROPDOWN_STORIES, TEST_IDS } from './helpers';

test.describe('ButtonDropdown — rendering', () => {
  test('renders trigger button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.buttonDropdown)).toBeVisible();
  });

  test('desktop layoutType opens droplist', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BUTTON_DROPDOWN_STORIES.playground, { layoutType: 'desktop' }));

    await getByTestId(TEST_IDS.buttonDropdown).click();
    await expect(getByTestId(TEST_IDS.droplist)).toBeVisible();
  });

  test('mobile layoutType opens droplist in bottom sheet', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BUTTON_DROPDOWN_STORIES.playground, { layoutType: 'mobile' }));

    await getByTestId(TEST_IDS.buttonDropdown).click();
    await expect(getByTestId(TEST_IDS.droplist)).toBeVisible();
  });
});
