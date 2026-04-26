import { expect, test } from '../../../playwright/fixtures';
import { buildCheckboxStory, CHECKBOX_TEST_ID, NATIVE_INPUT_SUFFIX } from './helpers';

test.describe('Checkbox — states', () => {
  test('disabled: has data-disabled and native disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory({ disabled: true }));

    const root = getByTestId(CHECKBOX_TEST_ID);
    const input = getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await expect(root).toHaveAttribute('data-disabled', 'true');
    await expect(input).toBeDisabled();
  });

  test('loading: hides native input and sets data-loading', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory({ loading: true }));

    await expect(getByTestId(CHECKBOX_TEST_ID)).toHaveAttribute('data-loading', 'true');
    await expect(getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toHaveCount(0);
  });

  test('checked: root gets data-checked=true', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory({ checked: true }));

    await expect(getByTestId(CHECKBOX_TEST_ID)).toHaveAttribute('data-checked', 'true');
    await expect(getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeChecked();
  });

  test('indeterminate: root gets data-indeterminate=true', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory({ indeterminate: true }));

    await expect(getByTestId(CHECKBOX_TEST_ID)).toHaveAttribute('data-indeterminate', 'true');
  });
});
