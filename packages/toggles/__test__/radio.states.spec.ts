import { expect, test } from '../../../playwright/fixtures';
import { buildRadioStory, NATIVE_INPUT_SUFFIX, RADIO_TEST_ID } from './helpers';

test.describe('Radio — states', () => {
  test('disabled: data-disabled + native disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory({ disabled: true }));

    await expect(getByTestId(RADIO_TEST_ID)).toHaveAttribute('data-disabled', 'true');
    await expect(getByTestId(`${RADIO_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeDisabled();
  });

  test('loading: hides native input and sets data-loading', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory({ loading: true }));

    await expect(getByTestId(RADIO_TEST_ID)).toHaveAttribute('data-loading', 'true');
    await expect(getByTestId(`${RADIO_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toHaveCount(0);
  });

  test('checked: root gets data-checked', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildRadioStory({ checked: true }));

    await expect(getByTestId(RADIO_TEST_ID)).toHaveAttribute('data-checked', 'true');
    await expect(getByTestId(`${RADIO_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeChecked();
  });
});
