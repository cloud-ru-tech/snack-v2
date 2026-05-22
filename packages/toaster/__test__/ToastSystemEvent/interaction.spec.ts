import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('ToastSystemEvent — interaction', () => {
  test('close button is focusable', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ closable: true }));
    const close = getByTestId(TEST_IDS.systemEventButtonClose);
    await close.focus();
    await expect(close).toBeFocused();
  });

  test('close button :focus-visible draws outline (not 0)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ closable: true }));
    const close = getByTestId(TEST_IDS.systemEventButtonClose);
    await close.focus();
    // Token outline applied — outline-width must be non-zero.
    await expect(close).not.toHaveCSS('outline-width', '0px');
  });

  test('close button click is handled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ closable: true }));
    const close = getByTestId(TEST_IDS.systemEventButtonClose);
    await close.click();
    // After click, the button still exists (component-level Playground renders statically,
    // closeToast is a no-op fn). Just ensure no error / still visible.
    await expect(getByTestId(TEST_IDS.systemEventRoot)).toBeVisible();
  });
});
