import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('CodeEditor — interaction', () => {
  test('copy button copies value to clipboard', async ({ browserName, context, gotoStory, getByTestId, page }) => {
    test.skip(browserName !== 'chromium', 'clipboard permission API is chromium-only');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const value = 'copied-payload';
    await gotoStory(buildStoryOptions({ hasHeader: true, language: 'json', value }));
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await getByTestId(TEST_IDS.copyButton).click();
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe(value);
  });
});
