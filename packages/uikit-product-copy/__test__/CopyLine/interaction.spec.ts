import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, COPY_LINE_TEST_ID } from './helpers';

test.describe('CopyLine — interaction', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('click on root copies content to clipboard', async ({ page, gotoStory, getByTestId }) => {
    const value = 'line-copy-value';
    await gotoStory(buildStoryOptions({ content: value, valueToCopy: undefined, copyButtonHideStrategy: 'never' }));

    await getByTestId(COPY_LINE_TEST_ID).click();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(value);
  });

  test('click on inner button copies value to clipboard', async ({ page, gotoStory, getByTestId }) => {
    const value = 'inner-button-value';
    await gotoStory(buildStoryOptions({ content: value, valueToCopy: undefined, copyButtonHideStrategy: 'never' }));

    await getByTestId(COPY_LINE_TEST_ID).locator('button[aria-label="Copy"]').click();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(value);
  });

  test('valueToCopy overrides displayed content', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        content: 'displayed text',
        valueToCopy: 'overridden-value',
        copyButtonHideStrategy: 'never',
      }),
    );

    await getByTestId(COPY_LINE_TEST_ID).click();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe('overridden-value');
  });
});
