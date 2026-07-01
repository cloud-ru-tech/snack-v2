import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PRICE_SUMMARY_STORIES, TEST_IDS } from './helpers';

const MOBILE_GLOBALS = { layoutType: 'mobile' };

test.describe('PriceSummary — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.priceSummary)).toBeVisible();
  });

  test('renders loading state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ loading: true }));

    await expect(getByTestId(TEST_IDS.loadingBlock)).toBeVisible();
  });

  test('renders dataError with retry button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ dataError: true, onRetry: () => undefined }));

    await expect(getByTestId(TEST_IDS.contentBlockRetry)).toBeVisible();
  });

  test('layoutType mobile', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, PRICE_SUMMARY_STORIES.playground, MOBILE_GLOBALS));

    await expect(getByTestId(TEST_IDS.priceSummary)).toBeVisible();
  });

  test('period dropdown visible when multiple options', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, PRICE_SUMMARY_STORIES.withPeriodOptions));

    await expect(getByTestId(TEST_IDS.priceSummary)).toBeVisible();
    await expect(getByTestId(TEST_IDS.periodDropdown)).toBeVisible({ timeout: 10000 });
  });
});
