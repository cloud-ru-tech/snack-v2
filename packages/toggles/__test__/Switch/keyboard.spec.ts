import { expect, test } from '../../../../playwright/fixtures';
import { buildSwitchStory, NATIVE_INPUT_SUFFIX, SWITCH_TEST_ID } from '../_shared/helpers';

test.describe('Switch — keyboard', () => {
  test('Tab focuses native input', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory());
    await page.keyboard.press('Tab');
    await expect(getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeFocused();
  });

  test('Space toggles', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory());
    const input = getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await input.focus();
    await page.keyboard.press('Space');
    await expect(input).toBeChecked();
  });
});
