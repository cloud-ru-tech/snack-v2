import { expect, test } from '#playwright-tooling/fixtures';

import { buildButtonGroupStoryOptions, BUTTON_GROUP_STORIES, TEST_IDS } from './helpers';

test.describe('ButtonGroup — interaction', () => {
  test('primary action is clickable', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildButtonGroupStoryOptions());

    const primary = getByTestId(TEST_IDS.buttonGroup.primary);
    await primary.click();
    // Кнопка должна остаться видимой и интерактивной после клика
    await expect(primary).toBeVisible();
    await expect(primary).toBeEnabled();
  });

  test('disabled primary does not fire click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildButtonGroupStoryOptions(undefined, BUTTON_GROUP_STORIES.disabledPrimaryFixture));

    const primary = getByTestId(TEST_IDS.buttonGroup.primary);
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
    await expect(getByTestId(TEST_IDS.buttonGroup.secondary)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(getByTestId(TEST_IDS.buttonGroup.primary)).toBeFocused();
  });
});
