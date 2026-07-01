import { expect, test } from '#playwright-tooling/fixtures';

import { buildInfoRowStoryOptions, INFO_ROW_TEST_ID } from './helpers';

test.describe('InfoRow — rendering', () => {
  test('renders desktop layout by default (delegates to InfoRow)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildInfoRowStoryOptions(undefined, undefined, { layoutType: 'desktop' }));

    await expect(getByTestId(INFO_ROW_TEST_ID)).toBeVisible();
  });

  test('renders mobile layout when layoutType=mobile (delegates to MobileInfoRow)', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildInfoRowStoryOptions(undefined, undefined, { layoutType: 'mobile' }));

    await expect(getByTestId(INFO_ROW_TEST_ID)).toBeVisible();
  });

  test('renders label text', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildInfoRowStoryOptions({ label: 'Custom adaptive label' }));

    await expect(getByTestId(INFO_ROW_TEST_ID)).toContainText('Custom adaptive label');
  });
});
