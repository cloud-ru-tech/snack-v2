import { expect, test } from '#playwright-tooling/fixtures';

import { ADAPTIVE_INFO_ROW_TEST_ID, buildAdaptiveInfoRowStoryOptions } from './helpers';

test.describe('AdaptiveInfoRow — rendering', () => {
  test('renders desktop layout by default (delegates to InfoRow)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildAdaptiveInfoRowStoryOptions({ layoutType: 'desktop' }));

    await expect(getByTestId(ADAPTIVE_INFO_ROW_TEST_ID)).toBeVisible();
  });

  test('renders mobile layout when layoutType=mobile (delegates to MobileInfoRow)', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildAdaptiveInfoRowStoryOptions({ layoutType: 'mobile' }));

    await expect(getByTestId(ADAPTIVE_INFO_ROW_TEST_ID)).toBeVisible();
  });

  test('renders label text', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildAdaptiveInfoRowStoryOptions({ label: 'Custom adaptive label' }));

    await expect(getByTestId(ADAPTIVE_INFO_ROW_TEST_ID)).toContainText('Custom adaptive label');
  });
});
