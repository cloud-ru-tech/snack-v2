import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, FIELD_COMBO_STORIES, STORY_TEST_IDS, TEST_IDS } from './helpers';

// Browser-specific: реальная запись в буфер через navigator.clipboard. Видимость/кликабельность
// copy-кнопки покрыта в tests/FieldCombo.InteractionTest.stories.tsx::play — здесь read-back из
// реального буфера (в storybook-test недоступен) + проверка композиции textToCopy с prefix/postfix.
test.describe('FieldCombo — interaction (browser clipboard)', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Clipboard permissions are only supported in Chromium');

  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('readonly copy button writes the value to the real clipboard', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_COMBO_STORIES.interactionTest));
    const readonly = getByTestId(STORY_TEST_IDS.fieldCombo.readonlyRoot);
    await readonly.getByTestId(TEST_IDS.fieldTextCopyButton).click();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe('copy me');
  });

  test('readonly copy button composes prefix + value + postfix into the clipboard', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_COMBO_STORIES.interactionTest));
    const prefixed = getByTestId(STORY_TEST_IDS.fieldCombo.prefixedReadonlyRoot);
    await prefixed.getByTestId(TEST_IDS.fieldTextCopyButton).click();

    // textToCopy = `${prefix}${value}${postfix}` = '$' + '100' + 'USD'.
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe('$100USD');
  });
});
