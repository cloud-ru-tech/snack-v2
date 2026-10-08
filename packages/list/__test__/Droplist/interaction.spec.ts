import { Page } from '@playwright/test';

import { expect, test } from '#playwright-tooling/fixtures';
import { waitForStableBbox } from '#playwright-tooling/utils';

import { buildStoryOptions, DROPLIST_STORIES, itemTestId, LIST_INTERNAL_TEST_IDS, TEST_IDS } from './helpers';

async function rowOrder(page: Page): Promise<string[]> {
  return page
    .locator(`[data-test-id^="${LIST_INTERNAL_TEST_IDS.baseItem}_"]`)
    .evaluateAll(elements => elements.map(el => el.getAttribute('data-test-id') ?? ''));
}

/** scrollTop ближайшего прокручиваемого предка item'а (у scroll-контейнера списка нет test-id). */
async function listScrollTop(page: Page, itemId: string, scrollTo?: number): Promise<number> {
  return page.getByTestId(itemTestId(itemId)).evaluate((item, top) => {
    let container = item.parentElement;
    while (container && container.scrollHeight <= container.clientHeight) {
      container = container.parentElement;
    }
    if (container && top !== undefined) {
      container.scrollTo(0, top);
    }
    return container?.scrollTop ?? 0;
  }, scrollTo);
}

test.describe('Droplist — interaction (real browser)', () => {
  test('drag&drop: reorder inside open popover completes on mouse release', async ({
    page,
    gotoStory,
    getByTestId,
    dragTo,
  }) => {
    await gotoStory(buildStoryOptions(undefined, DROPLIST_STORIES.reorderable));

    await getByTestId(TEST_IDS.reorderableDroplist.triggerOpen).click();

    // Перестановка идёт среди «братьев» одной группы: `catalog` и `settings-2` — строки group-1.
    const firstRow = getByTestId(itemTestId('catalog'));
    const thirdRow = getByTestId(itemTestId('settings-2'));
    await expect(firstRow).toBeVisible();
    await waitForStableBbox(firstRow);

    const handle = firstRow.getByTestId(LIST_INTERNAL_TEST_IDS.dragHandle);
    const orderBefore = await rowOrder(page);
    expect(orderBefore.indexOf(itemTestId('catalog'))).toBeLessThan(orderBefore.indexOf(itemTestId('settings-2')));

    await dragTo(handle, { target: thirdRow, steps: 12 });

    await expect(async () => {
      const orderAfter = await rowOrder(page);
      expect(orderAfter.indexOf(itemTestId('catalog'))).toBeGreaterThan(orderAfter.indexOf(itemTestId('settings-2')));
    }).toPass({ timeout: 3000 });

    // Перетаскивание не должно «залипать» — после отпускания кнопки ручка снова интерактивна.
    await expect(firstRow.getByTestId(LIST_INTERNAL_TEST_IDS.dragHandle)).toBeEnabled();
    await expect(page.locator('[data-dragging="true"]')).toHaveCount(0);
  });

  test('drag&drop: overlay copy stays themed inside the transformed popover', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, DROPLIST_STORIES.reorderable));
    await getByTestId(TEST_IDS.reorderableDroplist.triggerOpen).click();

    const firstRow = getByTestId(itemTestId('catalog'));
    await expect(firstRow).toBeVisible();
    await waitForStableBbox(firstRow);

    const sourceHeight = (await firstRow.boundingBox())?.height ?? 0;
    const handleBox = await firstRow.getByTestId(LIST_INTERNAL_TEST_IDS.dragHandle).boundingBox();
    const startX = (handleBox?.x ?? 0) + (handleBox?.width ?? 0) / 2;
    const startY = (handleBox?.y ?? 0) + (handleBox?.height ?? 0) / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX, startY + 10, { steps: 3 });
    await page.mouse.move(startX + 5, startY + 40, { steps: 6 });

    // Popover позиционируется через `transform`; копия `DragOverlay` рендерится в портале
    // themed-корня портал-контекста (не в `document.body`) — токены темы сохраняются, строка
    // не раздувается до fallback-паддингов, и `position: fixed` остаётся относительно вьюпорта.
    // Строка копии несёт тот же id, что и исходная, поэтому её ищем внутри самой копии.
    const overlayHeight = await getByTestId(LIST_INTERNAL_TEST_IDS.dragOverlay)
      .getByTestId(itemTestId('catalog'))
      .evaluate(row => row.getBoundingClientRect().height);

    await page.mouse.up();

    expect(Math.abs(overlayHeight - sourceHeight)).toBeLessThanOrEqual(4);
  });

  test('scrollToSelectedItem: parent rerender keeps the scroll position', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, DROPLIST_STORIES.scrollOnRerender));

    await getByTestId(TEST_IDS.droplist.scrollOnRerenderTrigger).click();
    await expect(getByTestId(itemTestId('item-1'))).toBeVisible();

    const scrolledTo = await listScrollTop(page, 'item-1', 600);
    expect(scrolledTo).toBeGreaterThan(0);

    const rerenderCount = getByTestId(TEST_IDS.droplist.rerenderCount);
    const countBefore = await rerenderCount.textContent();
    await expect(rerenderCount).not.toHaveText(countBefore ?? '');

    expect(await listScrollTop(page, 'item-1')).toBe(scrolledTo);
  });
});
