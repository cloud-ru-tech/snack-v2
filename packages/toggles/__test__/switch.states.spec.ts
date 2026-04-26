import { expect, test } from '../../../playwright/fixtures';
import { buildSwitchStory, NATIVE_INPUT_SUFFIX, SWITCH_TEST_ID } from './helpers';

test.describe('Switch — states', () => {
  test('disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory({ disabled: true }));
    await expect(getByTestId(SWITCH_TEST_ID)).toHaveAttribute('data-disabled', 'true');
    await expect(getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeDisabled();
  });

  test('loading hides native input', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory({ loading: true }));
    await expect(getByTestId(SWITCH_TEST_ID)).toHaveAttribute('data-loading', 'true');
    await expect(getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toHaveCount(0);
  });

  test('defaultChecked sets data-checked', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory({ checked: true }));
    await expect(getByTestId(SWITCH_TEST_ID)).toHaveAttribute('data-checked', 'true');
    await expect(getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`)).toBeChecked();
  });
});
