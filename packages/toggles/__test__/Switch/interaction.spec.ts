import { expect, test } from '#playwright-tooling/fixtures';

import { buildSwitchStory, TEST_IDS } from '../_shared/helpers';

test.describe('Switch — interaction', () => {
  test('click toggles', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory());
    const input = getByTestId(TEST_IDS.switch.nativeInput);
    await expect(input).not.toBeChecked();
    await getByTestId(TEST_IDS.switch.root).click();
    await expect(input).toBeChecked();
  });

  test('click on disabled does nothing', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory({ disabled: true }));
    const input = getByTestId(TEST_IDS.switch.nativeInput);
    await getByTestId(TEST_IDS.switch.root).click({ force: true });
    await expect(input).not.toBeChecked();
  });

  test('defaultChecked → click → unchecked', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildSwitchStory({ checked: true }));
    const input = getByTestId(TEST_IDS.switch.nativeInput);
    await expect(input).toBeChecked();
    await getByTestId(TEST_IDS.switch.root).click();
    await expect(input).not.toBeChecked();
  });
});
