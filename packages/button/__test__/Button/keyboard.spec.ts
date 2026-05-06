import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, BUTTON_TEST_ID } from './helpers';

test.describe('Button — keyboard', () => {
  test('receives focus on Tab', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await page.keyboard.press('Tab');

    await expect(getByTestId(BUTTON_TEST_ID)).toBeFocused();
  });

  test('activates on Enter when focused', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await page.keyboard.press('Tab');
    await expect(getByTestId(BUTTON_TEST_ID)).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();
  });

  test('activates on Space when focused', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await page.keyboard.press('Tab');
    await expect(getByTestId(BUTTON_TEST_ID)).toBeFocused();

    await page.keyboard.press('Space');
    await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();
  });

  test('disabled button does not receive focus on Tab', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));

    await page.keyboard.press('Tab');

    await expect(getByTestId(BUTTON_TEST_ID)).not.toBeFocused();
  });
});
