import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
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

  // Play не умеет mobile-раскладку (viewport + layoutType global) — listRef на BottomSheet
  // проверяется здесь: tap по айтему не должен фиксировать набранный текст как кастомную опцию.
  test('mobile allowCustomOption: choosing an existing item does not commit the typed query', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(
      buildStoryOptions({ allowCustomOption: true, selection: 'multiple' }, undefined, { layoutType: 'mobile' }),
    );

    const root = getByTestId(TEST_IDS.fieldSelect);
    const input = root.getByTestId(TEST_IDS.fieldSelectInput);
    await input.click();
    await input.pressSequentially('sm');

    const small = page.getByTestId(`${LIST_BASE_ITEM_TEST_ID}_s`);
    await expect(small).toBeVisible();
    await small.click();

    const chips = root.getByTestId(TEST_IDS.fieldSelectChips);
    await expect(chips.getByText('Small (1 vCPU, 2 GB)')).toBeVisible();
    await expect(chips.getByText('sm', { exact: true })).toHaveCount(0);
  });
});
