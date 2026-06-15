import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, FIELD_TEXT_STORIES, STORY_TEST_IDS, TEST_IDS } from './helpers';

test.describe('FieldText — rendering', () => {
  test('renders root and native input', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldText)).toBeVisible();
    await expect(getByTestId(TEST_IDS.fieldTextInput)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const size of ['s', 'l'] as const) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        await expect(getByTestId(TEST_IDS.fieldText)).toHaveAttribute('data-size', size);
      });
    }

    // Корень (FieldDecorator) проксирует RAW data-validation-state из пропса.
    for (const state of ['error', 'warning'] as const) {
      test(`validationState=${state}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ validationState: state }));
        await expect(getByTestId(TEST_IDS.fieldText)).toHaveAttribute('data-validation-state', state);
      });
    }
  });

  // error форсит effectiveValidationState='error' на внутренней оболочке (fieldTextShell),
  // перекрывая не-error validationState — это field-acrylic тонировка, живущая на shell,
  // а не на FieldDecorator-корне (у которого свои chrome-атрибуты).
  test('error forces the shell validation tone to error over a non-error validationState', async ({
    gotoStory,
    getByTestId,
  }) => {
    // error-строка ASCII: Storybook отбрасывает URL-arg с non-ASCII (кириллица) значением,
    // и `error` откатывается к пустому дефолту — тогда shell остался бы 'warning' (см. FieldSecure).
    await gotoStory(buildStoryOptions({ validationState: 'warning', error: 'Invalid value' }));
    await expect(getByTestId(TEST_IDS.fieldTextShell)).toHaveAttribute('data-validation-state', 'error');
  });

  test('disabled state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.fieldTextInput)).toBeDisabled();
  });

  test('background=false drops data-withbackground on the shell', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ background: false }));
    await expect(getByTestId(TEST_IDS.fieldTextShell)).not.toHaveAttribute('data-withbackground');
  });

  test('value over maxLength marks the counter as limit-exceeded', async ({ gotoStory, getByTestId }) => {
    // allowMoreThanMaxLength=true разрешает значение длиннее maxLength → счётчик current>max.
    await gotoStory(buildStoryOptions({ maxLength: 5, allowMoreThanMaxLength: true, defaultValue: 'abcdefghij' }));
    await expect(getByTestId(TEST_IDS.fieldDecoratorCounter)).toHaveAttribute('data-limit-exceeded', 'true');
  });

  test('readonly field renders the copy button', async ({ gotoStory, getByTestId }) => {
    // Сцена InteractionTest держит readonly-поле с непустым значением → видна copy-кнопка.
    await gotoStory(buildStoryOptions(undefined, FIELD_TEXT_STORIES.interactionTest));
    const readonlyRoot = getByTestId(STORY_TEST_IDS.fieldText.readonlyRoot);
    await expect(readonlyRoot.getByTestId(TEST_IDS.fieldTextCopyButton)).toBeVisible();
  });

  test('element slots render in elementBefore and elementAfter', async ({ gotoStory, getByTestId }) => {
    // Сцена WithDroplist держит поля со слот-кнопкой слева и справа.
    await gotoStory(buildStoryOptions(undefined, FIELD_TEXT_STORIES.withDroplist));
    await expect(getByTestId(STORY_TEST_IDS.fieldText.droplistBeforeButton)).toBeVisible();
    await expect(getByTestId(STORY_TEST_IDS.fieldText.droplistAfterButton)).toBeVisible();
  });
});
