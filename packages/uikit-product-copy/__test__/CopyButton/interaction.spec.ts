import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

// Browser-specific: real clipboard read via navigator.clipboard. Behavioral click/keyboard
// (focus, Enter, Space, onClick fires) is covered in tests/CopyButton.InteractionTest.stories.tsx::play.
test.describe('CopyButton — interaction (browser clipboard)', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('click copies valueToCopy into the real clipboard', async ({ page, gotoStory, getByTestId }) => {
    const value = 'hello-clipboard';
    await gotoStory(buildStoryOptions({ valueToCopy: value }));

    await getByTestId(TEST_IDS.copyButton.root).click();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(value);
  });
});
