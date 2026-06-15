import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('FieldStepper — rendering', () => {
  test('renders root and native input', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldStepper)).toBeVisible();
    await expect(getByTestId(TEST_IDS.fieldStepperInput)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const size of ['s', 'l'] as const) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        await expect(getByTestId(TEST_IDS.fieldStepper)).toHaveAttribute('data-size', size);
      });
    }

    // Корень (FieldDecorator) проксирует data-validation-state с учётом форс-`error`.
    for (const state of ['error', 'warning', 'success'] as const) {
      test(`validationState=${state}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ validationState: state }));
        await expect(getByTestId(TEST_IDS.fieldStepper)).toHaveAttribute('data-validation-state', state);
      });
    }
  });

  test('disabled propagates to the native input', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.fieldStepperInput)).toBeDisabled();
  });

  test('readonly propagates to the native input', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ readonly: true }));
    await expect(getByTestId(TEST_IDS.fieldStepperInput)).toHaveAttribute('readonly', '');
  });
});
