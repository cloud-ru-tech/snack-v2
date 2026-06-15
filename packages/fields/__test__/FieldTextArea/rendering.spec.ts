import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('FieldTextArea — rendering', () => {
  test('renders root and textarea', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldTextArea)).toBeVisible();
    await expect(getByTestId(TEST_IDS.fieldTextAreaInput)).toBeVisible();
  });

  test.describe('size prop propagation', () => {
    for (const size of ['s', 'l'] as const) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        await expect(getByTestId(TEST_IDS.fieldTextArea)).toHaveAttribute('data-size', size);
      });
    }
  });

  test.describe('validationState prop propagation', () => {
    for (const state of ['error', 'warning'] as const) {
      test(`validationState=${state}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ validationState: state }));
        await expect(getByTestId(TEST_IDS.fieldTextArea)).toHaveAttribute('data-validation-state', state);
      });
    }
  });

  test('error prop forces error tone on the inner shell over validationState=success', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions({ validationState: 'success', error: 'Server rejected the comment' }));
    // Внутренняя оболочка несёт effectiveValidationState (error форсит 'error').
    await expect(getByTestId(TEST_IDS.fieldTextAreaShell)).toHaveAttribute('data-validation-state', 'error');
  });

  test('resizable enables CSS resize on the scroll container (not the textarea)', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions({ resizable: true }));
    await expect(getByTestId(TEST_IDS.fieldTextAreaScrollArea)).toHaveCSS('resize', 'vertical');
    await expect(getByTestId(TEST_IDS.fieldTextAreaInput)).toHaveCSS('resize', 'none');
  });

  test('resizable is ignored when the field is disabled (same code path as readonly)', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions({ resizable: true, disabled: true }));
    await expect(getByTestId(TEST_IDS.fieldTextAreaScrollArea)).toHaveCSS('resize', 'none');
  });

  test('disabled disables the textarea and hides the counter', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions({ disabled: true, maxLength: 120 }));
    await expect(getByTestId(TEST_IDS.fieldTextAreaInput)).toBeDisabled();
    await expect(page.getByTestId(TEST_IDS.fieldDecoratorCounter)).toHaveCount(0);
  });

  test('soft cap (default) leaves the native maxlength attribute absent', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ maxLength: 120, allowMoreThanMaxLength: true }));
    await expect(getByTestId(TEST_IDS.fieldTextAreaInput)).not.toHaveAttribute('maxlength');
  });

  test('hard cap (allowMoreThanMaxLength=false) sets the native maxlength attribute', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions({ maxLength: 120, allowMoreThanMaxLength: false }));
    await expect(getByTestId(TEST_IDS.fieldTextAreaInput)).toHaveAttribute('maxlength', '120');
  });

  test('maxLength renders the length counter', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ maxLength: 120 }));
    await expect(getByTestId(TEST_IDS.fieldDecoratorCounter)).toBeVisible();
  });

  test('explicit length prop wins over the maxLength-derived counter and flags limit exceeded', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions({ maxLength: 200, length: { current: 120, max: 100 } }));
    const counter = getByTestId(TEST_IDS.fieldDecoratorCounter);
    await expect(counter).toHaveText('120/100');
    await expect(counter).toHaveAttribute('data-limit-exceeded', 'true');
  });

  test('background=false drops data-withbackground from the inner shell', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ background: false }));
    await expect(getByTestId(TEST_IDS.fieldTextAreaShell)).not.toHaveAttribute('data-withbackground');
  });

  test('readonly hides the counter and disables the textarea editing', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions({ readonly: true, maxLength: 120 }));
    await expect(getByTestId(TEST_IDS.fieldTextAreaInput)).toHaveAttribute('readonly', '');
    // На неактивном (readonly) поле счётчик скрыт — isFieldActive = false в FieldDecorator.
    await expect(page.getByTestId(TEST_IDS.fieldDecoratorCounter)).toHaveCount(0);
  });
});
