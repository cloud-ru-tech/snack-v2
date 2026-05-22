import { expect, test } from '#playwright-tooling/fixtures';

import { buildSwitchStory, TEST_IDS } from '../_shared/helpers';

test.describe('Switch — keyboard', () => {
  test('Tab focuses native input', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory());
    await page.keyboard.press('Tab');
    await expect(getByTestId(TEST_IDS.switch.nativeInput)).toBeFocused();
  });

  test('Space toggles', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory());
    const input = getByTestId(TEST_IDS.switch.nativeInput);
    await input.focus();
    await page.keyboard.press('Space');
    await expect(input).toBeChecked();
  });
});
