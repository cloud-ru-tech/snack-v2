import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildButtonGroupStoryOptions,
  BUTTON_GROUP_PRIMARY_TEST_ID,
  BUTTON_GROUP_SECONDARY_TEST_ID,
  BUTTON_GROUP_STORIES,
} from './helpers';

test.describe('ButtonGroup — interaction', () => {
  test('primary action is clickable', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildButtonGroupStoryOptions());

    const primary = getByTestId(BUTTON_GROUP_PRIMARY_TEST_ID);
    await primary.click();
    // Кнопка должна остаться видимой и интерактивной после клика
    await expect(primary).toBeVisible();
    await expect(primary).toBeEnabled();
  });

  test('disabled primary does not fire click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildButtonGroupStoryOptions(undefined, BUTTON_GROUP_STORIES.playgroundPrimaryDisabled));

    const primary = getByTestId(BUTTON_GROUP_PRIMARY_TEST_ID);
    await expect(primary).toBeDisabled();
    await expect(primary).toHaveAttribute('data-disabled', 'true');
  });

  test('Tab order follows DOM: secondary → primary (tertiary → secondary → primary)', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildButtonGroupStoryOptions());

    await page.keyboard.press('Tab');
    await expect(getByTestId(BUTTON_GROUP_SECONDARY_TEST_ID)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(getByTestId(BUTTON_GROUP_PRIMARY_TEST_ID)).toBeFocused();
  });
});
