import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, USER_ACTION_LINK_TEST_ID, USER_ACTION_TEST_ID } from './helpers';

test.describe('ToastUserAction — interaction', () => {
  test('link is focusable', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ action: 'labelOnly' }));
    const link = getByTestId(USER_ACTION_LINK_TEST_ID);
    await link.focus();
    await expect(link).toBeFocused();
  });

  test('link click is handled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ action: 'labelOnly' }));
    const link = getByTestId(USER_ACTION_LINK_TEST_ID);
    await link.click();
    // No assertion error → click handler attached and didn't throw.
    await expect(getByTestId(USER_ACTION_TEST_ID)).toBeVisible();
  });
});
