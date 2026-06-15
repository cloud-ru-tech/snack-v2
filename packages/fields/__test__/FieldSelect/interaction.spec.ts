import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, LIST_BASE_ITEM_TEST_ID, TEST_IDS } from './helpers';

test.describe('FieldSelect — interaction', () => {
  test('clicking the trigger opens the Droplist and mounts items in a portal', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.fieldSelect);
    await expect(root).toBeVisible();

    await root.getByTestId(TEST_IDS.fieldSelectInput).click();

    await expect(root).toHaveAttribute('data-focusvisible', 'true');
    const items = page.getByTestId(new RegExp(`^${LIST_BASE_ITEM_TEST_ID}`));
    await expect(items.first()).toBeVisible();
  });

  test('clicking outside closes the open Droplist', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.fieldSelect);

    await root.getByTestId(TEST_IDS.fieldSelectInput).click();
    const items = page.getByTestId(new RegExp(`^${LIST_BASE_ITEM_TEST_ID}`));
    await expect(items.first()).toBeVisible();

    await page.mouse.click(2, 2);
    await expect(items.first()).toBeHidden();
    await expect(root).not.toHaveAttribute('data-focusvisible', 'true');
  });
});
