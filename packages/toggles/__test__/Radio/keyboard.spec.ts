import { expect, test } from '../../../../playwright/fixtures';
import { buildRadioStory, NATIVE_INPUT_SUFFIX, RADIO_TEST_ID } from '../_shared/helpers';

test.describe('Radio — keyboard', () => {
  test('Tab focuses native input', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory());

    await page.keyboard.press('Tab');

    await expect(getByTestId(`${RADIO_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeFocused();
  });

  test('Space selects when focused', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory());

    const input = getByTestId(`${RADIO_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await input.focus();
    await page.keyboard.press('Space');

    await expect(input).toBeChecked();
  });
});
