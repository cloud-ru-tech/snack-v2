import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, COPY_LINE_TEST_ID } from './helpers';

test.describe('CopyLine — keyboard', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('Tab focuses inner copy button', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ copyButtonHideStrategy: 'never' }));

    await page.keyboard.press('Tab');

    const copyBtn = getByTestId(COPY_LINE_TEST_ID).locator('button[aria-label="Copy"]');
    await expect(copyBtn).toBeFocused();
  });

  test('Enter on focused inner button copies value', async ({ page, gotoStory, getByTestId }) => {
    const value = 'kbd-enter-value';
    await gotoStory(buildStoryOptions({ content: value, valueToCopy: undefined, copyButtonHideStrategy: 'never' }));

    await page.keyboard.press('Tab');
    const copyBtn = getByTestId(COPY_LINE_TEST_ID).locator('button[aria-label="Copy"]');
    await expect(copyBtn).toBeFocused();
    await page.keyboard.press('Enter');

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(value);
  });

  test('Space on focused inner button copies value', async ({ page, gotoStory, getByTestId }) => {
    const value = 'kbd-space-value';
    await gotoStory(buildStoryOptions({ content: value, valueToCopy: undefined, copyButtonHideStrategy: 'never' }));

    await page.keyboard.press('Tab');
    const copyBtn = getByTestId(COPY_LINE_TEST_ID).locator('button[aria-label="Copy"]');
    await expect(copyBtn).toBeFocused();
    await page.keyboard.press('Space');

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(value);
  });
});
