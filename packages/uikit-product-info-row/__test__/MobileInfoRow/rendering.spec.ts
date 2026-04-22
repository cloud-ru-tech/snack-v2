import { expect, test } from '../../../../playwright/fixtures';
import { buildMobileInfoRowStoryOptions, MOBILE_INFO_ROW_TEST_ID } from './helpers';

test.describe('MobileInfoRow — rendering', () => {
  test('playground renders', async ({ page, gotoStory }) => {
    await gotoStory(buildMobileInfoRowStoryOptions());
    await expect(page.getByTestId(MOBILE_INFO_ROW_TEST_ID)).toBeVisible();
  });
});
