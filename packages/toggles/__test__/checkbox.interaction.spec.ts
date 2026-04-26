import { expect, test } from '../../../playwright/fixtures';
import { buildCheckboxStory, CHECKBOX_TEST_ID, NATIVE_INPUT_SUFFIX } from './helpers';

test.describe('Checkbox — interaction', () => {
  test('click toggles checked', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory());

    const input = getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await expect(input).not.toBeChecked();
    await getByTestId(CHECKBOX_TEST_ID).click();
    await expect(input).toBeChecked();
  });

  test('click on disabled does not toggle', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory({ disabled: true }));

    const input = getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await getByTestId(CHECKBOX_TEST_ID).click({ force: true });
    await expect(input).not.toBeChecked();
  });

  test('indeterminate → checked → unchecked on successive clicks', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory({ indeterminate: true }));

    const root = getByTestId(CHECKBOX_TEST_ID);
    const input = getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await expect(root).toHaveAttribute('data-indeterminate', 'true');
    await root.click();
    await expect(input).toBeChecked();
    await expect(root).not.toHaveAttribute('data-indeterminate', 'true');
    await root.click();
    await expect(input).not.toBeChecked();
  });

  test('checked toggles off on click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory({ checked: true }));

    const input = getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await expect(input).toBeChecked();
    await getByTestId(CHECKBOX_TEST_ID).click();
    await expect(input).not.toBeChecked();
  });
});
