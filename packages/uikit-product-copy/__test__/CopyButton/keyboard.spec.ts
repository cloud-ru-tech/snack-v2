import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, COPY_BUTTON_TEST_ID } from './helpers';

test.describe('CopyButton — keyboard', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('receives focus on Tab', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await page.keyboard.press('Tab');

    await expect(getByTestId(COPY_BUTTON_TEST_ID)).toBeFocused();
  });

  test('Enter activates and copies value', async ({ page, gotoStory, getByTestId }) => {
    const value = 'enter-payload';
    await gotoStory(buildStoryOptions({ valueToCopy: value }));

    await page.keyboard.press('Tab');
    await expect(getByTestId(COPY_BUTTON_TEST_ID)).toBeFocused();
    await page.keyboard.press('Enter');

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(value);
  });

  test('Space activates and copies value', async ({ page, gotoStory, getByTestId }) => {
    const value = 'space-payload';
    await gotoStory(buildStoryOptions({ valueToCopy: value }));

    await page.keyboard.press('Tab');
    await expect(getByTestId(COPY_BUTTON_TEST_ID)).toBeFocused();
    await page.keyboard.press('Space');

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(value);
  });
});
