import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, DRAWER_TRIGGER_TEST_ID, TEST_IDS } from './helpers';

test.describe('NotificationPanel — keyboard', () => {
  // Escape closes layered portal: доходит до rc-drawer только в реальном браузере,
  // в storybook-test play не доставляется (см. test-environment-pitfalls.md).
  test('Escape closes the open drawer', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(DRAWER_TRIGGER_TEST_ID).click();
    await expect(page.getByTestId(TEST_IDS.panel.title)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByTestId(TEST_IDS.panel.title)).toBeHidden();
  });
});
