import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('FieldTime — rendering', () => {
  test('renders root, input and clock icon', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldTime)).toBeVisible();
    await expect(getByTestId(TEST_IDS.fieldTimeInput)).toBeVisible();
    await expect(getByTestId(TEST_IDS.fieldTimeIcon)).toBeVisible();
  });

  // Ключевая выборка по осям size × validation вместо axis-per-test циклов: по одному представителю
  // на каждое значение каждой оси (size s/l, validation error/success) + disabled, всё одним тестом.
  const KEY_COMBOS = [
    { size: 's', validationState: 'error' },
    { size: 'l', validationState: 'success' },
  ] as const;

  test.describe('props propagation', () => {
    for (const { size, validationState } of KEY_COMBOS) {
      test(`size=${size} + validationState=${validationState} → data-*`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, validationState }));
        const root = getByTestId(TEST_IDS.fieldTime);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-validation-state', validationState);
      });
    }
  });

  test('disabled state disables the input', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.fieldTimeInput)).toBeDisabled();
  });
});
