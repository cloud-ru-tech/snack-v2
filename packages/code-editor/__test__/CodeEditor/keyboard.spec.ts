import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, CODE_EDITOR_COPY_BUTTON_TEST_ID } from './helpers';

test.describe('CodeEditor — keyboard', () => {
  test('Enter on focused copy button triggers copy', async ({ browserName, context, gotoStory, getByTestId, page }) => {
    test.skip(browserName !== 'chromium', 'clipboard permission API is chromium-only');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const value = 'enter-keyboard';
    await gotoStory(buildStoryOptions({ hasHeader: true, language: 'json', value }));
    const copyButton = getByTestId(CODE_EDITOR_COPY_BUTTON_TEST_ID);
    await copyButton.focus();
    await page.keyboard.press('Enter');
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe(value);
  });
});
