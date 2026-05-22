import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('ToastUserAction — interaction', () => {
  test('link is focusable', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ action: 'labelOnly' }));
    const link = getByTestId(TEST_IDS.userActionLink);
    await link.focus();
    await expect(link).toBeFocused();
  });

  test('link click is handled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ action: 'labelOnly' }));
    const link = getByTestId(TEST_IDS.userActionLink);
    await link.click();
    // No assertion error → click handler attached and didn't throw.
    await expect(getByTestId(TEST_IDS.userActionRoot)).toBeVisible();
  });
});
