import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, DRAWER_TRIGGER_TEST_ID, TEST_IDS } from './helpers';

test.describe('NotificationPanelPopover — rendering', () => {
  test('renders trigger by default; panel mounts after click', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const trigger = getByTestId(DRAWER_TRIGGER_TEST_ID);
    await expect(trigger).toBeVisible();
    await trigger.click();
    await expect(page.getByTestId(TEST_IDS.panel.title)).toBeVisible();
  });
});
