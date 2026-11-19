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
    await page.getByTestId('list__search-item').getByTestId('search__field-input').fill('sm');

    const small = page.getByTestId(`${LIST_BASE_ITEM_TEST_ID}_s`);
    await expect(small).toBeVisible();
    await small.click();

    const chips = root.getByTestId(TEST_IDS.fieldSelectChips);
    await expect(chips.getByText('Small (1 vCPU, 2 GB)')).toBeVisible();
    await expect(chips.getByText('sm', { exact: true })).toHaveCount(0);
  });

  test('mobile trigger does not select text and search remains available in the sheet', async ({
    page,
    gotoStory,
    getByTestId,
    setStoryArgs,
  }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions({ defaultValue: 'm' }, undefined, { layoutType: 'mobile' }));

    const input = getByTestId(TEST_IDS.fieldSelect).getByTestId(TEST_IDS.fieldSelectInput);
    await expect(input).toHaveAttribute('readonly', '');
    await input.click();
    expect(await input.evaluate((element: HTMLInputElement) => element.selectionStart === element.selectionEnd)).toBe(
      true,
    );

    const search = page.getByTestId('list__search-item').getByTestId('search__field-input');
    await expect(page.getByTestId(`${LIST_BASE_ITEM_TEST_ID}_m`)).toBeVisible();
    await expect(search).toHaveCount(0);
    const items = Array.from({ length: 9 }, (_, index) => ({
      id: String(index),
      content: { label: 'Option ' + index },
    }));
    await setStoryArgs({ items: [...items, { id: 'm', content: { label: 'Medium' } }] });
    await expect(search).toBeEditable();
    await search.fill('zzzzz');
    await expect(page.getByTestId(`${LIST_BASE_ITEM_TEST_ID}_m`)).toBeHidden();
    await expect(search).toBeFocused();
    await search.fill('Medium');
    const medium = page.getByTestId(`${LIST_BASE_ITEM_TEST_ID}_m`);
    await expect(medium).toBeVisible();
    await expect(page.getByTestId(`${LIST_BASE_ITEM_TEST_ID}_0`)).toBeHidden();
    await expect(search).toBeFocused();
    await medium.click();
    await expect(input).toHaveValue(/Medium/);
  });

  test('mobile autocomplete keeps search available with no server results', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions({ autocomplete: true, items: [] }, undefined, { layoutType: 'mobile' }));
    await getByTestId(TEST_IDS.fieldSelectInput).click();
    const search = getByTestId('list__search-item').getByTestId('search__field-input');
    await search.fill('query');
    await expect(search).toHaveValue('query');
  });
});
