import { expect, test } from '#playwright-tooling/fixtures';

import { buildCheckboxStory, TEST_IDS } from '../_shared/helpers';

test.describe('Checkbox — interaction', () => {
  test('click toggles checked', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory());

    const input = getByTestId(TEST_IDS.checkbox.nativeInput);
    await expect(input).not.toBeChecked();
    await getByTestId(TEST_IDS.checkbox.root).click();
    await expect(input).toBeChecked();
  });

  test('click on disabled does not toggle', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory({ disabled: true }));

    const input = getByTestId(TEST_IDS.checkbox.nativeInput);
    await getByTestId(TEST_IDS.checkbox.root).click({ force: true });
    await expect(input).not.toBeChecked();
  });

  test('indeterminate → checked → unchecked on successive clicks', async ({ gotoStory, getByTestId }) => {
    // `indeterminateDefault` (uncontrolled), а не `indeterminate` (controlled, не переключается).
    await gotoStory(buildCheckboxStory({ indeterminateDefault: true }));

    const root = getByTestId(TEST_IDS.checkbox.root);
    const input = getByTestId(TEST_IDS.checkbox.nativeInput);
    await expect(root).toHaveAttribute('data-indeterminate', 'true');
    await root.click();
    await expect(input).toBeChecked();
    await expect(root).not.toHaveAttribute('data-indeterminate', 'true');
    await root.click();
    await expect(input).not.toBeChecked();
  });

  test('checked toggles off on click', async ({ gotoStory, getByTestId }) => {
    // `defaultChecked` (uncontrolled), а не `checked` (controlled, не переключается).
    await gotoStory(buildCheckboxStory({ defaultChecked: true }));

    const input = getByTestId(TEST_IDS.checkbox.nativeInput);
    await expect(input).toBeChecked();
    await getByTestId(TEST_IDS.checkbox.root).click();
    await expect(input).not.toBeChecked();
  });
});
