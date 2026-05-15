import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, CODE_EDITOR_COPY_BUTTON_TEST_ID, CODE_EDITOR_TEST_ID } from './helpers';

test.describe('CodeEditor — interaction', () => {
  test('copy button copies value to clipboard', async ({ browserName, context, gotoStory, getByTestId, page }) => {
    test.skip(browserName !== 'chromium', 'clipboard permission API is chromium-only');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const value = 'copied-payload';
    await gotoStory(buildStoryOptions({ hasHeader: true, language: 'json', value }));
    await expect(getByTestId(CODE_EDITOR_TEST_ID)).toBeVisible();
    await getByTestId(CODE_EDITOR_COPY_BUTTON_TEST_ID).click();
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe(value);
  });
});
