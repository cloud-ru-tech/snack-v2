import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TITLE_CLICKABLE_TEST_ID } from './helpers';

test.describe('TitleClickable — keyboard', () => {
  test('receives focus on Tab', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await page.keyboard.press('Tab');

    await expect(getByTestId(TITLE_CLICKABLE_TEST_ID)).toBeFocused();
  });

  test('activates on Enter when focused', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await page.keyboard.press('Tab');
    const root = getByTestId(TITLE_CLICKABLE_TEST_ID);
    await expect(root).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(root).toBeVisible();
  });
});
