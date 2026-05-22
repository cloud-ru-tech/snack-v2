import { expect, test } from '#playwright-tooling/fixtures';

import { buildRadioStory, TEST_IDS } from '../_shared/helpers';

test.describe('Radio — keyboard', () => {
  test('Tab focuses native input', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory());

    await page.keyboard.press('Tab');

    await expect(getByTestId(TEST_IDS.radio.nativeInput)).toBeFocused();
  });

  test('Space selects when focused', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory());

    const input = getByTestId(TEST_IDS.radio.nativeInput);
    await input.focus();
    await page.keyboard.press('Space');

    await expect(input).toBeChecked();
  });
});
