import { expect, test } from '../../../../playwright/fixtures';
import { buildRadioStory, NATIVE_INPUT_SUFFIX, RADIO_TEST_ID } from '../_shared/helpers';

test.describe('Radio — interaction', () => {
  test('click becomes checked', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory());

    const input = getByTestId(`${RADIO_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await expect(input).not.toBeChecked();
    await input.click();
    await expect(input).toBeChecked();
  });

  test('click on disabled does nothing', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory({ disabled: true }));

    const input = getByTestId(`${RADIO_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await input.click({ force: true });
    await expect(input).not.toBeChecked();
  });
});
