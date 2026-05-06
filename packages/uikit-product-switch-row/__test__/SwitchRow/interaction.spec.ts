import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, SWITCH_ROW_TEST_ID } from './helpers';

test.describe('SwitchRow — interaction', () => {
  test('click toggles aria-checked from false to true (uncontrolled)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ defaultChecked: false }));

    const row = getByTestId(SWITCH_ROW_TEST_ID);
    await expect(row).toHaveAttribute('aria-checked', 'false');

    await row.click();

    await expect(row).toHaveAttribute('aria-checked', 'true');
  });

  test('click toggles aria-checked from true to false (uncontrolled)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ defaultChecked: true }));

    const row = getByTestId(SWITCH_ROW_TEST_ID);
    await expect(row).toHaveAttribute('aria-checked', 'true');

    await row.click();

    await expect(row).toHaveAttribute('aria-checked', 'false');
  });

  test('disabled row does not toggle on click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true, defaultChecked: false }));

    const row = getByTestId(SWITCH_ROW_TEST_ID);
    await row.click({ force: true });

    await expect(row).toHaveAttribute('aria-checked', 'false');
  });

  test('controlled checked is not toggled by click without onChange handler', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ checked: false }));

    const row = getByTestId(SWITCH_ROW_TEST_ID);
    await row.click();

    await expect(row).toHaveAttribute('aria-checked', 'false');
  });
});
