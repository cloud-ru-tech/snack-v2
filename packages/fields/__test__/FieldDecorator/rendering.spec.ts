import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, FIELD_DECORATOR_STORIES, TEST_IDS } from './helpers';

test.describe('FieldDecorator — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldDecorator)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const size of ['s', 'l'] as const) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        await expect(getByTestId(TEST_IDS.fieldDecorator)).toHaveAttribute('data-size', size);
      });
    }

    // `valid` — нейтральный baseline без иконки и цвета валидации (в отличие от `success`).
    for (const validationState of ['warning', 'success', 'valid'] as const) {
      test(`validationState=${validationState}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ validationState }));
        await expect(getByTestId(TEST_IDS.fieldDecorator)).toHaveAttribute('data-validation-state', validationState);
      });
    }

    test('error prop forces validation-state=error', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ error: 'Required', validationState: 'default' }));
      await expect(getByTestId(TEST_IDS.fieldDecorator)).toHaveAttribute('data-validation-state', 'error');
    });

    test('disabled propagates to data-disabled and hides length counter', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));
      const root = getByTestId(TEST_IDS.fieldDecorator);
      await expect(root).toHaveAttribute('data-disabled', 'true');
      await expect(getByTestId(TEST_IDS.fieldDecoratorCounter)).toHaveCount(0);
    });

    test('readonly propagates to data-readonly and hides length counter', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ readonly: true }));
      const root = getByTestId(TEST_IDS.fieldDecorator);
      await expect(root).toHaveAttribute('data-readonly', 'true');
      await expect(getByTestId(TEST_IDS.fieldDecoratorCounter)).toHaveCount(0);
    });

    // Nested-object args (`length.current`) не переопределяют дефолтный `length`-объект
    // через URL-args этого Storybook (нет deepControls). Кейс limit-exceeded зашит ячейкой
    // VisualMatrix `field-decorator-limit-exceeded` (current=120, max=100) — её и проверяем.
    test('limit exceeded marks counter and renders current/max', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, FIELD_DECORATOR_STORIES.visualMatrix));
      const counter = getByTestId('field-decorator-limit-exceeded').getByTestId(TEST_IDS.fieldDecoratorCounter);
      await expect(counter).toHaveAttribute('data-limit-exceeded', 'true');
      await expect(counter).toHaveText('120/100');
    });

    test('error text overrides hint in the hint slot', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ hint: 'Hint text', error: 'Field is required' }));
      await expect(getByTestId(TEST_IDS.fieldDecoratorHint)).toHaveText('Field is required');
    });
  });
});
