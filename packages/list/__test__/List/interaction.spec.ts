import { Page } from '@playwright/test';

import { expect, test } from '#playwright-tooling/fixtures';
import { waitForStableBbox } from '#playwright-tooling/utils';

import { buildStoryOptions, itemTestId, LIST_INTERNAL_TEST_IDS, LIST_STORIES, TEST_IDS } from './helpers';

// Только browser-specific сценарий из закрытого списка e2e-testing-standard:
// real drag&drop через dnd-kit MouseSensor (activationConstraint.distance=5, серия
// mousemove) — тот же класс сценария, что у `@ds/table` column reorder (см.
// packages/table/__test__/Table/interaction.spec.ts). Не покрывается Storybook play.

async function rowOrder(page: Page): Promise<string[]> {
  return page
    .locator(`[data-test-id^="${LIST_INTERNAL_TEST_IDS.baseItem}_"]`)
    .evaluateAll(elements => elements.map(el => el.getAttribute('data-test-id') ?? ''));
}

test.describe('List — interaction (real browser)', () => {
  // Reorderable example (REORDERABLE_ITEMS): верхний уровень — только группы `group-1`
  // (catalog, profile, settings-2) и `group-2` (orders, favorites, settings[disabled], trash).
  // Смешивать группы и строки в одном уровне нельзя (см. docs/reorder.mdx).
  test('drag&drop: group repositions among top-level siblings', async ({ page, gotoStory, getByTestId, dragTo }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.reorderable));

    const firstGroupRow = getByTestId(itemTestId('catalog')); // первая строка group-1
    const lastGroupRow = getByTestId(itemTestId('trash')); // последняя строка group-2
    await expect(firstGroupRow).toBeVisible();
    await waitForStableBbox(firstGroupRow);

    // Ручка заголовка group-1 — первая в списке: она идёт перед ручками строк своей группы.
    const handle = getByTestId(LIST_INTERNAL_TEST_IDS.dragHandle).first();
    const orderBefore = await rowOrder(page);
    expect(orderBefore.indexOf(itemTestId('catalog'))).toBeLessThan(orderBefore.indexOf(itemTestId('trash')));

    // Курсор над блоком group-2 → group-1 встаёт после неё целиком (коллизия по `pointerWithin`,
    // а не по центру высокого блока группы — иначе цель «перепрыгивала» под group-2).
    await dragTo(handle, { target: lastGroupRow, steps: 12 });

    await expect(async () => {
      const orderAfter = await rowOrder(page);
      // Группа переехала вместе со своими строками.
      expect(orderAfter.indexOf(itemTestId('catalog'))).toBeGreaterThan(orderAfter.indexOf(itemTestId('trash')));
      expect(orderAfter.indexOf(itemTestId('catalog'))).toBeLessThan(orderAfter.indexOf(itemTestId('profile')));
    }).toPass({ timeout: 3000 });
  });

  test('drag&drop: reordering a group row affects only that group', async ({
    page,
    gotoStory,
    getByTestId,
    dragTo,
  }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.reorderable));

    const firstGroupRow = getByTestId(itemTestId('orders')); // первая строка group-2
    const lastGroupRow = getByTestId(itemTestId('trash')); // последняя строка group-2
    await waitForStableBbox(firstGroupRow);

    const handle = firstGroupRow.getByTestId(LIST_INTERNAL_TEST_IDS.dragHandle);
    const orderBefore = await rowOrder(page);
    expect(orderBefore.indexOf(itemTestId('orders'))).toBeLessThan(orderBefore.indexOf(itemTestId('trash')));
    const catalogIndexBefore = orderBefore.indexOf(itemTestId('catalog'));

    await dragTo(handle, { target: lastGroupRow, steps: 12 });

    await expect(async () => {
      const orderAfter = await rowOrder(page);
      // Строка переставилась внутри group-2…
      expect(orderAfter.indexOf(itemTestId('orders'))).toBeGreaterThan(orderAfter.indexOf(itemTestId('trash')));
      // …а порядок group-1 не тронут.
      expect(orderAfter.indexOf(itemTestId('catalog'))).toBe(catalogIndexBefore);
      expect(orderAfter.indexOf(itemTestId('profile'))).toBeLessThan(orderAfter.indexOf(itemTestId('settings-2')));
    }).toPass({ timeout: 3000 });
  });

  test('drag&drop: a row cannot be dropped into another group', async ({ page, gotoStory, getByTestId, dragTo }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.reorderable));

    const groupOneRow = getByTestId(itemTestId('profile')); // строка group-1
    const groupTwoRow = getByTestId(itemTestId('orders')); // строка group-2
    await waitForStableBbox(groupOneRow);

    const handle = groupOneRow.getByTestId(LIST_INTERNAL_TEST_IDS.dragHandle);
    const orderBefore = await rowOrder(page);
    expect(orderBefore.indexOf(itemTestId('profile'))).toBeLessThan(orderBefore.indexOf(itemTestId('orders')));

    await dragTo(handle, { target: groupTwoRow, steps: 12 });
    await page.waitForTimeout(400);

    const orderAfter = await rowOrder(page);
    // Переупорядочивание строго внутри контейнера: `profile` остаётся в group-1 (выше всех строк group-2),
    // а порядок строк group-2 не меняется — межгрупповой перенос не поддержан.
    expect(orderAfter.indexOf(itemTestId('profile'))).toBeLessThan(orderAfter.indexOf(itemTestId('orders')));
    expect(orderAfter.indexOf(itemTestId('orders'))).toBeLessThan(orderAfter.indexOf(itemTestId('favorites')));
  });

  test('drag&drop: disabled row can still be reordered', async ({ page, gotoStory, getByTestId, dragTo }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.reorderable));

    // group-2: orders → favorites → settings[disabled] → trash. `disabled` отключает `Switch` и клик,
    // но ручка reorder остаётся активной — строку можно перетащить среди братьев группы.
    const disabledRow = getByTestId(itemTestId('settings'));
    const siblingRow = getByTestId(itemTestId('orders'));
    await waitForStableBbox(disabledRow);

    const disabledHandle = disabledRow.getByTestId(LIST_INTERNAL_TEST_IDS.dragHandle);
    const orderBefore = await rowOrder(page);
    expect(orderBefore.indexOf(itemTestId('orders'))).toBeLessThan(orderBefore.indexOf(itemTestId('settings')));

    await dragTo(disabledHandle, { target: siblingRow, steps: 12 });

    await expect(async () => {
      const orderAfter = await rowOrder(page);
      expect(orderAfter.indexOf(itemTestId('settings'))).toBeLessThan(orderAfter.indexOf(itemTestId('orders')));
    }).toPass({ timeout: 3000 });
  });

  test('drag&drop: the drag-overlay copy matches the source row size', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.reorderable));

    const catalog = getByTestId(itemTestId('catalog'));
    await expect(catalog).toBeVisible();
    await waitForStableBbox(catalog);

    const sourceHeight = (await catalog.boundingBox())?.height ?? 0;
    const handleBox = await catalog.getByTestId(LIST_INTERNAL_TEST_IDS.dragHandle).boundingBox();
    const startX = (handleBox?.x ?? 0) + (handleBox?.width ?? 0) / 2;
    const startY = (handleBox?.y ?? 0) + (handleBox?.height ?? 0) / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX, startY + 10, { steps: 3 });
    await page.mouse.move(startX + 5, startY + 40, { steps: 6 });

    // Копия рендерится в портале themed-корня (`@ds/portal-context`), а не в `document.body`:
    // иначе `--sn-*` токены теряются и строка раздувается до fallback-паддингов («гигантский призрак»).
    // Строка копии несёт тот же id, что и исходная, поэтому её ищем внутри самой копии.
    const overlayHeight = await getByTestId(LIST_INTERNAL_TEST_IDS.dragOverlay)
      .getByTestId(itemTestId('catalog'))
      .evaluate(row => row.getBoundingClientRect().height);

    await page.mouse.up();

    expect(Math.abs(overlayHeight - sourceHeight)).toBeLessThanOrEqual(4);
  });

  test('drag&drop: neighbours shift and the dragged row leaves an empty slot', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.reorderable));

    // Расступание соседей и пустой слот существуют только во время живого drag'а.
    const list = getByTestId(TEST_IDS.list.root);
    const orders = list.getByTestId(itemTestId('orders')); // первая строка group-2
    const neighbour = list.getByTestId(itemTestId('favorites')); // следующая за ней
    await expect(orders).toBeVisible();
    await waitForStableBbox(orders);

    const neighbourTopBefore = (await neighbour.boundingBox())?.y ?? 0;

    const handleBox = await orders.getByTestId(LIST_INTERNAL_TEST_IDS.dragHandle).boundingBox();
    const x = (handleBox?.x ?? 0) + (handleBox?.width ?? 0) / 2;
    const y = (handleBox?.y ?? 0) + (handleBox?.height ?? 0) / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y + 10, { steps: 3 });
    await page.mouse.move(x + 5, y + 50, { steps: 10 });

    // Слот строки пуст: место в раскладке сохранено, содержимое погашено `opacity`.
    const ghost = list.locator('[data-dragging]');
    await expect(ghost).toHaveCount(1);
    await expect(ghost).toHaveCSS('opacity', '0');

    await expect(async () => {
      const neighbourTopDuring = (await neighbour.boundingBox())?.y ?? 0;
      expect(neighbourTopDuring).toBeLessThan(neighbourTopBefore);
    }).toPass({ timeout: 3000 });

    await page.mouse.up();

    // После отпускания пустого слота не остаётся — строка снова видна на новом месте.
    await expect(ghost).toHaveCount(0);
    await expect(orders).toBeVisible();
  });
});
