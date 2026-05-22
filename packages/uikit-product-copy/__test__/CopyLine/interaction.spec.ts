import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

// Browser-specific: real clipboard read via navigator.clipboard. Behavioral click/keyboard
// (focus, Enter, Space, onClick fires) is covered in tests/CopyLine.InteractionTest.stories.tsx::play.
test.describe('CopyLine — interaction (browser clipboard)', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('click on root copies content via real clipboard', async ({ page, gotoStory, getByTestId }) => {
    const value = 'line-copy-value';
    await gotoStory(buildStoryOptions({ content: value, valueToCopy: undefined, copyButtonHideStrategy: 'never' }));

    await getByTestId(TEST_IDS.copyLine.root).click();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(value);
  });

  test('valueToCopy overrides displayed content in clipboard', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        content: 'displayed text',
        valueToCopy: 'overridden-value',
        copyButtonHideStrategy: 'never',
      }),
    );

    await getByTestId(TEST_IDS.copyLine.root).click();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe('overridden-value');
  });
});
