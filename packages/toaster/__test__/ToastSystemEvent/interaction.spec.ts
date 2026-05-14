import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, SYSTEM_EVENT_BUTTON_CLOSE_TEST_ID, SYSTEM_EVENT_TEST_ID } from './helpers';

test.describe('ToastSystemEvent — interaction', () => {
  test('close button is focusable', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ closable: true }));
    const close = getByTestId(SYSTEM_EVENT_BUTTON_CLOSE_TEST_ID);
    await close.focus();
    await expect(close).toBeFocused();
  });

  test('close button :focus-visible draws outline (not 0)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ closable: true }));
    const close = getByTestId(SYSTEM_EVENT_BUTTON_CLOSE_TEST_ID);
    await close.focus();
    // Token outline applied — outline-width must be non-zero.
    await expect(close).not.toHaveCSS('outline-width', '0px');
  });

  test('close button click is handled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ closable: true }));
    const close = getByTestId(SYSTEM_EVENT_BUTTON_CLOSE_TEST_ID);
    await close.click();
    // After click, the button still exists (component-level Playground renders statically,
    // closeToast is a no-op fn). Just ensure no error / still visible.
    await expect(getByTestId(SYSTEM_EVENT_TEST_ID)).toBeVisible();
  });
});
