import { Locator, Page } from '@playwright/test';

import { expect, test } from '#playwright-tooling/fixtures';
import { dataTestIdSelector, waitForStableBbox } from '#playwright-tooling/utils';

import { SAVED_STATE_ID } from '../../stories/testIds';
import { buildStoryOptions, headerCellById, TABLE_STORIES, TEST_IDS } from './helpers';

// Только browser-specific сценарии из закрытого списка e2e-testing-standard,
// не покрываемые Storybook play:
// 1. column resize — непрерывный mouse-drag (down → move → up) по resize-handle,
//    tanstack columnResizeMode='onEnd' применяет ширину на mouseup;
// 2. column reorder — real drag&drop через dnd-kit MouseSensor
//    (activationConstraint.distance=5, серия mousemove);
// 3. savedState — персистентность ширины в localStorage через перезагрузку story;
// 4. infinite scroll — реальный скролл контейнера + IntersectionObserver.
// Клик/клавиатура/колбэки — в stories/Table/tests/Table.Interaction::play.

const COMPONENT = TEST_IDS.component;

// Синхронизируй с PAGE_LENGTH в stories/Table/examples/Table.InfiniteScroll.stories.tsx
const INFINITE_PAGE_LENGTH = 15;

// ResizeHandle — 8px-зона по правой границе header-cell (z-index выше
// drag-wrapper'а dnd-kit); собственного test-id у неё нет, moving-part
// (TEST_IDS.headerResizeHandleMovingPart) появляется только в процессе resize.
async function dragResizeHandle(page: Page, header: Locator, deltaX: number): Promise<void> {
  const box = await header.boundingBox();
  if (!box) throw new Error('dragResizeHandle: header has no boundingBox');
  const y = box.y + box.height / 2;
  const handleX = box.x + box.width - 2;

  await page.mouse.move(handleX, y);
  await page.mouse.down();
  await page.mouse.move(handleX + deltaX, y, { steps: 8 });
  // во время drag отрисовывается moving-part индикатора resize
  await expect(page.locator(dataTestIdSelector(COMPONENT.headerResizeHandleMovingPart))).toBeVisible();
  await page.mouse.up();
}

test.describe('Table — interaction (real browser)', () => {
  test('column resize: mouse drag on the resize handle widens the column', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions());
    const nameHeader = headerCellById(page, 'name');
    await expect(nameHeader).toBeVisible();
    await waitForStableBbox(nameHeader);

    const before = await nameHeader.boundingBox();
    if (!before) throw new Error('name header has no boundingBox');

    const RESIZE_DELTA = 60;
    await dragResizeHandle(page, nameHeader, RESIZE_DELTA);

    await waitForStableBbox(nameHeader);
    const after = await nameHeader.boundingBox();
    if (!after) throw new Error('name header has no boundingBox after resize');
    // columnResizeMode='onEnd' — ширина применяется после mouseup; допуск на
    // субпиксельное округление и границы ячейки
    expect(after.width).toBeGreaterThan(before.width + RESIZE_DELTA - 15);
  });

  test('column reorder: dnd-kit header drag moves the column', async ({ page, gotoStory, getByTestId }) => {
    // columnsSettings.enableDrag включён в args Playground'а
    await gotoStory(buildStoryOptions());
    const headerCells = getByTestId(COMPONENT.headerCell);
    await expect(headerCells.first()).toBeVisible();

    const orderBefore = await headerCells.evaluateAll(elements =>
      elements.map(el => el.getAttribute('data-header-id')),
    );
    expect(orderBefore.indexOf('name')).toBeLessThan(orderBefore.indexOf('email'));

    const nameHeader = headerCellById(page, 'name');
    const emailHeader = headerCellById(page, 'email');
    await waitForStableBbox(nameHeader);
    const nameBox = await nameHeader.boundingBox();
    const emailBox = await emailHeader.boundingBox();
    if (!nameBox || !emailBox) throw new Error('header cells have no boundingBox');

    // mousedown в центре name-заголовка (listeners dnd-kit висят на drag-wrapper
    // внутри ячейки), движение со steps > activationConstraint.distance(5px),
    // drop в центре email-заголовка → arrayMove в onDragEnd
    await page.mouse.move(nameBox.x + nameBox.width / 2, nameBox.y + nameBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(emailBox.x + emailBox.width / 2, emailBox.y + emailBox.height / 2, { steps: 12 });
    await page.mouse.up();

    await expect(async () => {
      const orderAfter = await headerCells.evaluateAll(elements =>
        elements.map(el => el.getAttribute('data-header-id')),
      );
      expect(orderAfter.indexOf('email')).toBeLessThan(orderAfter.indexOf('name'));
    }).toPass({ timeout: 3000 });
  });

  test('savedState: resized column width persists in localStorage across reload', async ({ page, gotoStory }) => {
    // чистый прогон: первый заход уже пишет initial-ширины в localStorage —
    // удаляем ключ и перезагружаем story
    await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.savedState));
    await page.evaluate(id => localStorage.removeItem(id), SAVED_STATE_ID);
    await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.savedState));

    const nameHeader = headerCellById(page, 'name');
    await expect(nameHeader).toBeVisible();
    await waitForStableBbox(nameHeader);
    const before = await nameHeader.boundingBox();
    if (!before) throw new Error('name header has no boundingBox');

    const RESIZE_DELTA = 80;
    await dragResizeHandle(page, nameHeader, RESIZE_DELTA);
    await waitForStableBbox(nameHeader);
    const resized = await nameHeader.boundingBox();
    if (!resized) throw new Error('name header has no boundingBox after resize');
    expect(resized.width).toBeGreaterThan(before.width + RESIZE_DELTA - 20);

    // ширина записана в localStorage под savedState.id
    const savedRaw = await page.evaluate(id => localStorage.getItem(id), SAVED_STATE_ID);
    expect(savedRaw).toContain('resizeState');

    // полная перезагрузка story → init-ширина читается из localStorage
    await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.savedState));
    await expect(nameHeader).toBeVisible();
    await waitForStableBbox(nameHeader);
    const after = await nameHeader.boundingBox();
    if (!after) throw new Error('name header has no boundingBox after reload');
    expect(Math.abs(after.width - resized.width)).toBeLessThanOrEqual(2);

    await page.evaluate(id => localStorage.removeItem(id), SAVED_STATE_ID);
  });

  test('infinite scroll: scrolling to the end loads the next batch of rows', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.infiniteScroll));
    const rows = getByTestId(COMPONENT.bodyRow);
    await expect(rows).toHaveCount(INFINITE_PAGE_LENGTH);

    // скролл последней строки в видимую область приводит scroll-стаб (scrollRef)
    // во viewport — IntersectionObserver story дозагружает следующую порцию
    await rows.last().scrollIntoViewIfNeeded();

    // story добирает одну порцию (loading 400ms); skeleton-строки в процессе
    // транзиентны — toHaveCount ретраится до финальных 2×PAGE_LENGTH
    await expect(rows).toHaveCount(INFINITE_PAGE_LENGTH * 2, { timeout: 10_000 });
  });
});
