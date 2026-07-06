import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, itemTestId, LIST_INTERNAL_TEST_IDS, LIST_STORIES, TEST_IDS } from './helpers';

test.describe('List — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.list.root)).toBeVisible();
  });

  test('renders base items from items[]', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions());
    // Item ids: `${baseItem}_<id>` — селектор по prefix через CSS.
    const items = page.locator(`[data-test-id^="${LIST_INTERNAL_TEST_IDS.baseItem}"]`);
    expect(await items.count()).toBeGreaterThanOrEqual(5);
  });

  // Корневой <ul> не несёт data-size — размер идёт через контекст на сами item'ы (<li data-size>).
  test.describe('size prop propagation', () => {
    for (const size of ['s', 'l']) {
      test(`size=${size} propagates to items`, async ({ gotoStory, page }) => {
        await gotoStory(buildStoryOptions({ size }));
        const firstItem = page.locator(`[data-test-id^="${LIST_INTERNAL_TEST_IDS.baseItem}"]`).first();
        await expect(firstItem).toHaveAttribute('data-size', size);
      });
    }
  });

  test('selection scenario renders both modes', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.selection));
    await expect(page.getByTestId(`${TEST_IDS.list.selectionScenario}-single`)).toBeVisible();
    await expect(page.getByTestId(`${TEST_IDS.list.selectionScenario}-multiple`)).toBeVisible();
  });

  test('collapse scenario renders nested items', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.collapse));
    await expect(getByTestId(TEST_IDS.list.collapseScenario)).toBeVisible();
  });

  test('virtualized renders without crashing', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.virtualized));
    await expect(getByTestId(TEST_IDS.list.virtualizedScenario)).toBeVisible();
  });

  test.describe('reorderable (onItemsReorder)', () => {
    test('renders a drag handle per row', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, LIST_STORIES.reorderable));
      const firstRow = getByTestId(itemTestId('catalog'));
      await expect(firstRow.getByTestId(LIST_INTERNAL_TEST_IDS.dragHandle)).toBeVisible();
    });

    test('disabled item keeps an enabled drag handle', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, LIST_STORIES.reorderable));
      // Reorderable example: 'settings' — единственная строка с `disabled: true`.
      // `disabled` отключает `Switch` и клик, но не переупорядочивание — ручка остаётся активной.
      const disabledRow = getByTestId(itemTestId('settings'));
      await expect(disabledRow.getByTestId(LIST_INTERNAL_TEST_IDS.dragHandle)).toBeEnabled();
    });

    test('group rows render alongside their group headers', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, LIST_STORIES.reorderable));
      // Reorderable example: строки внутри `group-2`.
      await expect(getByTestId(itemTestId('orders'))).toBeVisible();
      await expect(getByTestId(itemTestId('favorites'))).toBeVisible();
      await expect(getByTestId(itemTestId('trash'))).toBeVisible();
    });

    test('all drag handles (rows + group headers) align in a single left column', async ({
      gotoStory,
      getByTestId,
      page,
    }) => {
      await gotoStory(buildStoryOptions(undefined, LIST_STORIES.reorderable));
      await expect(getByTestId(itemTestId('catalog'))).toBeVisible();
      // Ручка заголовка группы должна стоять ровно над ручками строк (см. `.groupHeader` в
      // SimpleItem/styles.module.scss). Левые края всех ручек — одна колонка.
      const lefts = await page
        .locator(`[data-test-id="${LIST_INTERNAL_TEST_IDS.dragHandle}"]`)
        .evaluateAll(handles => handles.map(handle => Math.round(handle.getBoundingClientRect().left)));
      expect(lefts.length).toBeGreaterThan(1);
      expect(new Set(lefts).size).toBe(1);
    });
  });

  // Empty states управляются через `[Stories]: emptyState` story-only arg Playground'а.
  test.describe('empty states', () => {
    test('error state renders errorDataState (dataError)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ emptyState: 'error' }));
      await expect(getByTestId(LIST_INTERNAL_TEST_IDS.error)).toBeVisible();
    });

    test('no-data state renders when items are empty', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ emptyState: 'no-data' }));
      await expect(getByTestId(LIST_INTERNAL_TEST_IDS.noData)).toBeVisible();
    });
  });
});
