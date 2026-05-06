import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, SWITCH_ROW_TEST_ID } from './helpers';

test.describe('SwitchRow — keyboard', () => {
  test('receives focus on Tab', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await page.keyboard.press('Tab');

    await expect(getByTestId(SWITCH_ROW_TEST_ID)).toBeFocused();
  });

  test('Enter toggles aria-checked when focused', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ defaultChecked: false }));

    await page.keyboard.press('Tab');
    const row = getByTestId(SWITCH_ROW_TEST_ID);
    await expect(row).toBeFocused();

    await page.keyboard.press('Enter');

    await expect(row).toHaveAttribute('aria-checked', 'true');
  });

  test('Space toggles aria-checked when focused', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ defaultChecked: false }));

    await page.keyboard.press('Tab');
    const row = getByTestId(SWITCH_ROW_TEST_ID);
    await expect(row).toBeFocused();

    await page.keyboard.press('Space');

    await expect(row).toHaveAttribute('aria-checked', 'true');
  });

  test('disabled row does not receive focus on Tab', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));

    await page.keyboard.press('Tab');

    await expect(getByTestId(SWITCH_ROW_TEST_ID)).not.toBeFocused();
  });
});
