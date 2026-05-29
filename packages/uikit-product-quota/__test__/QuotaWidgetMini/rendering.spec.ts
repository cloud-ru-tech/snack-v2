import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/constants';
import { buildStoryOptions } from './helpers';

test.describe('QuotaWidgetMini — rendering', () => {
  test('renders accordion header', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions());
    await expect(page.getByTestId(TEST_IDS.quotaWidgetMini.trigger)).toBeVisible();
  });
});
