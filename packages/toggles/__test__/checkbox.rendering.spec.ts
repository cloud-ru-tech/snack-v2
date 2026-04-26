import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/constants';
import { buildCheckboxStory, CHECKBOX_TEST_ID, NATIVE_INPUT_SUFFIX } from './helpers';

test.describe('Checkbox — rendering', () => {
  test('renders root with role=checkbox', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory());

    const root = getByTestId(CHECKBOX_TEST_ID);
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute('role', 'checkbox');
  });

  test('renders native input with type=checkbox', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory());

    const input = getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await expect(input).toHaveAttribute('type', 'checkbox');
  });

  test('forwards id and name to native input', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory({ id: 'cb-id', name: 'cb-name' }));

    const input = getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await expect(input).toHaveAttribute('id', 'cb-id');
    await expect(input).toHaveAttribute('name', 'cb-name');
  });

  test('applies custom className on the root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory({ className: 'cb-custom' }));

    await expect(getByTestId(CHECKBOX_TEST_ID)).toHaveClass(/cb-custom/);
  });

  test.describe('sizes', () => {
    for (const size of Object.values(SIZE)) {
      test(`data-size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildCheckboxStory({ size }));

        await expect(getByTestId(CHECKBOX_TEST_ID)).toHaveAttribute('data-size', size);
      });
    }
  });
});
