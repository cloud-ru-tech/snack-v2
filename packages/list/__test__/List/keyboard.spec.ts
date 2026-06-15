import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, itemTestId, LIST_INTERNAL_TEST_IDS, LIST_STORIES, TEST_IDS } from './helpers';

// Roving tabindex: Tab → корневой <ul> (tabIndex=0),
// первый ArrowDown → первый item; ArrowUp/Down без wrap и пропуская disabled; Enter/Space выбор;
// ArrowRight открывает next-list, ArrowLeft закрывает.

test.describe('List — keyboard navigation', () => {
  test('Tab focuses the list root container', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.list.root)).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(getByTestId(TEST_IDS.list.root)).toBeFocused();
  });

  test('ArrowDown / ArrowUp move focus between items', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(TEST_IDS.list.root).focus();

    await page.keyboard.press('ArrowDown');
    await expect(getByTestId(itemTestId('item-0'))).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(getByTestId(itemTestId('item-1'))).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(getByTestId(itemTestId('item-2'))).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(getByTestId(itemTestId('item-1'))).toBeFocused();
  });

  test('no wrap-around and disabled item is skipped', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(TEST_IDS.list.root).focus();

    // Playground-список: item-0…item-99, item-4 disabled (пропускается при навигации):
    // 6 нажатий вниз проходят 0,1,2,3,5,6 — фокус на item-6, item-4 не фокусировался.
    for (let i = 0; i < 6; i += 1) {
      await page.keyboard.press('ArrowDown');
    }
    await expect(getByTestId(itemTestId('item-6'))).toBeFocused();
    await expect(getByTestId(itemTestId('item-4'))).not.toBeFocused();

    // Нет wrap-around: ArrowUp с первого элемента не переносит фокус в конец списка.
    for (let i = 0; i < 7; i += 1) {
      await page.keyboard.press('ArrowUp');
    }
    await expect(getByTestId(itemTestId('item-99'))).not.toBeFocused();
  });

  test('Enter selects the focused item (single mode)', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.selection));
    const single = getByTestId(`${TEST_IDS.list.selectionScenario}-single`);
    await expect(single).toBeVisible();

    await single.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    const analytics = single.getByTestId(itemTestId('analytics'));
    await expect(analytics).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(analytics).toHaveAttribute('data-checked', 'true');
  });

  test('ArrowRight opens nested list, ArrowLeft closes it', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.submenu));
    const root = getByTestId(TEST_IDS.list.submenuScenario);
    await expect(root).toBeVisible();

    await root.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(root.getByTestId(itemTestId('workspace'))).toBeFocused();

    // Ждём фокуса первого item next-list: синхронизирует setTimeout-перенос фокуса перед ArrowLeft (иначе race).
    await page.keyboard.press('ArrowRight');
    await expect(getByTestId(itemTestId('w-overview'))).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(getByTestId(itemTestId('w-overview'))).toBeHidden();
  });

  test('ArrowRight toggles a collapse (accordion) group', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.collapse));
    const root = getByTestId(TEST_IDS.list.collapseScenario);
    await expect(root).toBeVisible();

    // Старт стори: `general` раскрыт, `billing` свёрнут; навигация ведёт до `billing`.
    await root.focus();
    for (let i = 0; i < 4; i += 1) {
      await page.keyboard.press('ArrowDown');
    }
    await expect(root.getByTestId(itemTestId('billing'))).toBeFocused();
    await expect(getByTestId(itemTestId('billing-invoices'))).toBeHidden();

    // collapse-группа тогглится тем же ArrowRight, что открывает next-list.
    await page.keyboard.press('ArrowRight');
    await expect(getByTestId(itemTestId('billing-invoices'))).toBeVisible();

    await page.keyboard.press('ArrowRight');
    await expect(getByTestId(itemTestId('billing-invoices'))).toBeHidden();
  });

  test('bulk-select button toggles the whole group via keyboard (Enter)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.bulkSelect));

    const group = getByTestId(TEST_IDS.list.bulkSelectScenario);
    const p1 = group.getByTestId(itemTestId('p1'));
    const p4 = group.getByTestId(itemTestId('p4'));
    const bulkButton = group.getByTestId(LIST_INTERNAL_TEST_IDS.bulkSelectButton);

    // Старт: partial (выбран только p1). Enter на bulk-кнопке → выбрать всю группу.
    await bulkButton.press('Enter');
    await expect(p1).toHaveAttribute('data-checked', 'true');
    await expect(p4).toHaveAttribute('data-checked', 'true');

    // Повторный Enter из состояния «все» → снять всю группу.
    await bulkButton.press('Enter');
    await expect(p1).not.toHaveAttribute('data-checked', 'true');
    await expect(p4).not.toHaveAttribute('data-checked', 'true');
  });
});
