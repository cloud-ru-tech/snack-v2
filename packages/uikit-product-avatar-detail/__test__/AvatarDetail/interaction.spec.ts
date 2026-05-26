import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AvatarDetail — interaction (browser clipboard)', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Clipboard permissions are only supported in Chromium');

  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('click on contactData copies value into the real clipboard', async ({ page, gotoStory, getByTestId }) => {
    const contactValue = 'jdoe@example.com';
    await gotoStory(buildStoryOptions({ contactData: contactValue }));

    await getByTestId(TEST_IDS.contactData).click();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(contactValue);
  });
});
