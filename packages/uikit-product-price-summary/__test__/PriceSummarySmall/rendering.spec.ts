import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PRICE_SUMMARY_SMALL_STORIES, TEST_IDS } from './helpers';

test.describe('PriceSummarySmall — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.priceSummarySmall)).toBeVisible();
  });

  test('renders loading state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ loading: true }));

    await expect(getByTestId(TEST_IDS.priceSummarySmall)).toBeVisible();
  });

  test('interaction-test story renders', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, PRICE_SUMMARY_SMALL_STORIES.interactionTest));

    await expect(getByTestId(TEST_IDS.priceSummarySmall)).toBeVisible();
  });
});
