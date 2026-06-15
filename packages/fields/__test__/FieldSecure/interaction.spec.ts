import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, FIELD_SECURE_STORIES, STORY_TEST_IDS, TEST_IDS } from './helpers';

// Browser-specific: реальная запись в буфер через navigator.clipboard. Видимость/кликабельность
// copy-кнопки покрыта в tests/FieldSecure.InteractionTest.stories.tsx::play — здесь только
// read-back из реального буфера (в storybook-test недоступен).
test.describe('FieldSecure — interaction (browser clipboard)', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Clipboard permissions are only supported in Chromium');

  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  });

  test('readonly copy button writes the value to the real clipboard', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_SECURE_STORIES.interactionTest));
    const readonly = getByTestId(STORY_TEST_IDS.fieldSecure.readonlyRoot);
    await readonly.getByTestId(TEST_IDS.fieldTextCopyButton).click();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe('sk-XXXX-TOKEN');
  });
});

// maxLength / allowMoreThanMaxLength: нативный clamp ввода через `maxLength` атрибут input'а
// надёжен только в реальном браузере (synthetic storybook-test не эмулирует native clamp).
test.describe('FieldSecure — maxLength clamp', () => {
  test('maxLength clamps typed value to its limit', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ maxLength: 4 }));
    const input = getByTestId(TEST_IDS.fieldSecureInput);
    await input.click();
    await input.pressSequentially('123456');
    await expect(input).toHaveValue('1234');
  });

  test('allowMoreThanMaxLength drops the native cap and accepts overflow', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ maxLength: 4, allowMoreThanMaxLength: true }));
    const input = getByTestId(TEST_IDS.fieldSecureInput);
    await input.click();
    await input.pressSequentially('123456');
    await expect(input).toHaveValue('123456');
  });
});
