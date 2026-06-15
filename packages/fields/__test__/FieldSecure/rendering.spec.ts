import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('FieldSecure — rendering', () => {
  test('renders root and native input', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldSecure)).toBeVisible();
    await expect(getByTestId(TEST_IDS.fieldSecureInput)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const size of ['s', 'l'] as const) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        // Дожидаемся монтирования story перед проверкой атрибута: при холодной Vite-компиляции
        // повторная навигация (после size=s) может не успеть отрисовать корень за дефолтный
        // таймаут toHaveAttribute, что давало "element(s) not found". `data-size` лежит на корне
        // FieldDecorator — том же узле, что несёт публичный data-test-id `field-secure`.
        const root = getByTestId(TEST_IDS.fieldSecure);
        await expect(root).toBeVisible();
        await expect(root).toHaveAttribute('data-size', size);
      });
    }

    // Корень (FieldDecorator) проксирует validationState из пропса (когда error не задан).
    for (const validationState of ['error', 'warning'] as const) {
      test(`validationState=${validationState}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ validationState }));
        await expect(getByTestId(TEST_IDS.fieldSecure)).toHaveAttribute('data-validation-state', validationState);
      });
    }
  });

  // Проп `error` форсит effectiveValidationState='error' на внутренней оболочке (fieldSecureShell).
  // FieldDecorator аналогично пересчитывает validationState = error ? 'error' : validationState, поэтому
  // при заданном error и корень (FieldDecorator), и shell несут data-validation-state='error' — error
  // перекрывает не-error validationState на обоих узлах.
  test('error forces the validation tone to error on both the shell and the root', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions({ validationState: 'warning', error: 'Wrong password' }));
    await expect(getByTestId(TEST_IDS.fieldSecureShell)).toHaveAttribute('data-validation-state', 'error');
    await expect(getByTestId(TEST_IDS.fieldSecure)).toHaveAttribute('data-validation-state', 'error');
  });

  test('input masks value by default (type=password)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ defaultValue: 's3cret' }));
    await expect(getByTestId(TEST_IDS.fieldSecureInput)).toHaveAttribute('type', 'password');
  });
});
