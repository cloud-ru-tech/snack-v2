import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

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

    for (const state of ['error', 'warning'] as const) {
      test(`validationState=${state}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ validationState: state }));
        await expect(getByTestId(TEST_IDS.fieldText)).toHaveAttribute('data-validation-state', state);
      });
    }
  });

  // Слоты у простого поля отсутствуют по контракту (для них есть FieldCombo): оболочка
  // рендерится без сегментов, поэтому разделителя и кнопок-сегментов в DOM быть не должно.
  test('renders no element-button slots', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldComboElementButton)).toHaveCount(0);
  });

  test('disabled state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.fieldTextInput)).toBeDisabled();
  });
});
