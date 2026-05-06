import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, COPY_BUTTON_TEST_ID } from './helpers';

test.describe('CopyButton — interaction', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('click copies value to clipboard', async ({ page, gotoStory, getByTestId }) => {
    const value = 'hello-clipboard';
    await gotoStory(buildStoryOptions({ valueToCopy: value }));

    await getByTestId(COPY_BUTTON_TEST_ID).click();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(value);
  });

  test('click is a no-op for visible state when valueToCopy empty', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ valueToCopy: '' }));

    const button = getByTestId(COPY_BUTTON_TEST_ID);
    await button.click();

    await expect(button).toBeVisible();
  });

  test('numeric valueToCopy is coerced to string in clipboard', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ valueToCopy: 12345 }));

    await getByTestId(COPY_BUTTON_TEST_ID).click();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe('12345');
  });
});
