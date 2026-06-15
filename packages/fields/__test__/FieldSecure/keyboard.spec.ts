import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, FIELD_SECURE_STORIES, STORY_TEST_IDS, TEST_IDS } from './helpers';

test.describe('FieldSecure — keyboard navigation', () => {
  test('arrow nav: input ↔ «глаз» (editable field)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const input = getByTestId(TEST_IDS.fieldSecureInput);
    const eye = getByTestId(TEST_IDS.fieldSecureHideButton);

    // «Глаз» — часть roving-композита (легаси-паритет): Tab уходит из поля целиком,
    // кнопка достижима только стрелками.
    await expect(eye).toHaveAttribute('tabindex', '-1');

    await input.click();
    await input.fill('s3cret');
    await input.press('End');

    await input.press('ArrowRight');
    await expect(eye).toBeFocused();

    await eye.press('ArrowLeft');
    await expect(input).toBeFocused();
  });

  // Space на «глазе» переключает type — это native-button-активация, недоступная в
  // storybook-test (Space-пробел не доходит до native click), потому проверяем в реальном браузере.
  test('Space on «глаз» toggles the input type', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ defaultValue: 's3cret' }));
    const input = getByTestId(TEST_IDS.fieldSecureInput);
    const eye = getByTestId(TEST_IDS.fieldSecureHideButton);

    await expect(input).toHaveAttribute('type', 'password');
    await eye.focus();
    await eye.press('Space');
    await expect(input).toHaveAttribute('type', 'text');
  });

  test('arrow nav: input → copy → «глаз» (readonly field)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_SECURE_STORIES.interactionTest));
    const readonly = getByTestId(STORY_TEST_IDS.fieldSecure.readonlyRoot);
    const input = readonly.getByTestId(TEST_IDS.fieldSecureInput);
    const copy = readonly.getByTestId(TEST_IDS.fieldTextCopyButton);
    const eye = readonly.getByTestId(TEST_IDS.fieldSecureHideButton);

    // readonly: ArrowRight на input (короткое замыкание по cursor-проверке) уводит на copy.
    await input.focus();
    await input.press('ArrowRight');
    await expect(copy).toBeFocused();

    await copy.press('ArrowRight');
    await expect(eye).toBeFocused();

    await eye.press('ArrowLeft');
    await expect(copy).toBeFocused();
  });
});
