import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions, QUOTA_WIDGET_STORIES } from './helpers';

test.describe('QuotaWidget — rendering', () => {
  test('renders trigger button', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions());
    await expect(page.getByTestId(TEST_IDS.quotaWidget.trigger)).toBeVisible();
  });

  test('loading state renders without error', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions({ loading: true }, QUOTA_WIDGET_STORIES.playground));
    await expect(page.getByTestId(TEST_IDS.quotaWidget.trigger)).toBeVisible();
  });

  test('error state renders without crash', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions({ error: true }, QUOTA_WIDGET_STORIES.playground));
    await expect(page.getByTestId(TEST_IDS.quotaWidget.trigger)).toBeVisible();
  });
});
