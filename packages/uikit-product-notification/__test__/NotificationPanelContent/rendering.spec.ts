import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('NotificationPanelContent — rendering', () => {
  test('renders title and content', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.panel.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.panel.title)).toBeVisible();
  });

  test('readAll button is rendered when readAllButton is passed', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.panel.readAll)).toBeVisible();
  });
});
