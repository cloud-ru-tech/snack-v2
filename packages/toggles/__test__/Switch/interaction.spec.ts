import { expect, test } from '../../../../playwright/fixtures';
import { buildSwitchStory, NATIVE_INPUT_SUFFIX, SWITCH_TEST_ID } from '../_shared/helpers';

test.describe('Switch — interaction', () => {
  test('click toggles', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory());
    const input = getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await expect(input).not.toBeChecked();
    await getByTestId(SWITCH_TEST_ID).click();
    await expect(input).toBeChecked();
  });

  test('click on disabled does nothing', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory({ disabled: true }));
    const input = getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await getByTestId(SWITCH_TEST_ID).click({ force: true });
    await expect(input).not.toBeChecked();
  });

  test('defaultChecked → click → unchecked', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory({ checked: true }));
    const input = getByTestId(`${SWITCH_TEST_ID}${NATIVE_INPUT_SUFFIX}`);
    await expect(input).toBeChecked();
    await getByTestId(SWITCH_TEST_ID).click();
    await expect(input).not.toBeChecked();
  });
});
