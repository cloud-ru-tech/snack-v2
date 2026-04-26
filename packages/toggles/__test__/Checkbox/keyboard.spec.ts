import { expect, test } from '../../../../playwright/fixtures';
import { buildCheckboxStory, CHECKBOX_TEST_ID, NATIVE_INPUT_SUFFIX } from '../_shared/helpers';

test.describe('Checkbox — keyboard', () => {
  test('native input receives focus on Tab', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory());

    await page.keyboard.press('Tab');

    await expect(getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeFocused();
  });

  test('Space toggles when focused', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory());

    const input = getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await input.focus();
    await page.keyboard.press('Space');

    await expect(input).toBeChecked();
  });

  test('Space does nothing on disabled', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildCheckboxStory({ disabled: true }));

    const input = getByTestId(`${CHECKBOX_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await input.focus().catch(() => {});
    await page.keyboard.press('Space');

    await expect(input).not.toBeChecked();
  });
});
