import { Page } from '@playwright/test';

import { expect, test } from '#playwright-tooling/fixtures';
import { waitForStableBbox } from '#playwright-tooling/utils';

import { buildStoryOptions, itemTestId, LIST_INTERNAL_TEST_IDS, LIST_STORIES } from './helpers';

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
  // Reorderable example (REORDERABLE_ITEMS): верхний уровень — `catalog` + группы `group-1`
  // (profile, settings-2) и `group-2` (orders, favorites, settings[disabled], trash).
  test('drag&drop: top-level item repositions among top-level siblings across groups', async ({
    page,
    gotoStory,
    getByTestId,
    dragTo,
  }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.reorderable));

    const catalog = getByTestId(itemTestId('catalog'));
    const lastGroupRow = getByTestId(itemTestId('trash')); // последняя строка group-2
    await expect(catalog).toBeVisible();
    await waitForStableBbox(catalog);

    const handle = catalog.getByTestId(LIST_INTERNAL_TEST_IDS.dragHandle);
    const orderBefore = await rowOrder(page);
    expect(orderBefore.indexOf(itemTestId('catalog'))).toBeLessThan(orderBefore.indexOf(itemTestId('trash')));

    // Курсор над блоком group-2 → `catalog` встаёт после всей группы (коллизия по `pointerWithin`,
    // а не по центру высокого блока группы — иначе цель «перепрыгивала» под group-2).
    await dragTo(handle, { target: lastGroupRow, steps: 12 });

    await expect(async () => {
      const orderAfter = await rowOrder(page);
      expect(orderAfter.indexOf(itemTestId('catalog'))).toBeGreaterThan(orderAfter.indexOf(itemTestId('trash')));
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
      // …а верхний уровень (catalog) и порядок group-1 не тронуты.
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
    const overlayHeight = await page
      .locator('[data-overlay="true"] li')
      .first()
      .evaluate(li => li.getBoundingClientRect().height);

    await page.mouse.up();

    expect(Math.abs(overlayHeight - sourceHeight)).toBeLessThanOrEqual(4);
  });

  test('drag&drop: group boundary indicator shows only while reordering within a group', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.reorderable));

    const boundary = page.locator('[data-reorder-boundary]');

    const pressHandle = async (row: ReturnType<typeof getByTestId>) => {
      const handleBox = await row.getByTestId(LIST_INTERNAL_TEST_IDS.dragHandle).boundingBox();
      const x = (handleBox?.x ?? 0) + (handleBox?.width ?? 0) / 2;
      const y = (handleBox?.y ?? 0) + (handleBox?.height ?? 0) / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x, y + 10, { steps: 3 });
      await page.mouse.move(x + 5, y + 50, { steps: 6 });
    };

    // Строка внутри группы (`orders` в group-2): границы контейнера группы подсвечиваются.
    const orders = getByTestId(itemTestId('orders'));
    await expect(orders).toBeVisible();
    await waitForStableBbox(orders);
    await pressHandle(orders);
    await expect(boundary).toHaveCount(1);
    await page.mouse.up();
    // После отпускания индикатор снимается.
    await expect(boundary).toHaveCount(0);

    // Верхнеуровневая строка (`catalog`) не принадлежит группе → индикатора нет.
    await pressHandle(getByTestId(itemTestId('catalog')));
    await expect(boundary).toHaveCount(0);
    await page.mouse.up();
  });
});
