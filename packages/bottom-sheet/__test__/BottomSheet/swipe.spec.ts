/**
 * Drag-механика bottom-sheet'а (движок на Pointer Events, `useDragEngine`). Жесты эмулируем через
 * `page.mouse` — это даёт доверенные pointer-события (`pointerType=mouse`, валидный `pointerId` для
 * `setPointerCapture`) на mobile-проектах (mobile-android / mobile-ios), потому что движок
 * не делит touch и mouse.
 *
 * Модель drag'а — изменение высоты, привязанной к низу: sheet растёт вверх при раскрытии и
 * сжимается при сворачивании, не отрываясь от нижней кромки и не уезжая за экран.
 *
 * Пороги закрытия single-snap sheet'а (см. useDragEngine.ts / constants.ts):
 *   - velocity > 0.5 px/ms (быстрый флик) ИЛИ
 *   - delta > startHeight * 0.3 (медленный drag > 30% высоты).
 */
import { expect, Locator, Page, test } from '#playwright-tooling/fixtures';
import { waitForStableBbox } from '#playwright-tooling/utils';

import { BOTTOM_SHEET_STORIES, buildStoryOptions, skipOnDesktop, STORY_TEST_IDS, TEST_IDS } from './helpers';

type DragOptions = {
  /** Горизонтальный сдвиг жеста (по умолчанию 0 — строго вертикальный свайп). */
  dx?: number;
  /** Вертикальный сдвиг жеста: вниз > 0, вверх < 0. */
  dy: number;
  /** Число pointermove-шагов жеста (по умолчанию 10). */
  steps?: number;
  /** Задержка между шагами в мс — задаёт velocity; без неё move идёт одним вызовом со `steps`. */
  stepDelayMs?: number;
  /** Сдвиг точки старта от верха sheet'а; по умолчанию 12px — зона handle (всегда draggable). */
  startOffsetY?: number;
};

async function dragSheet(page: Page, locator: Locator, opts: DragOptions): Promise<void> {
  await waitForStableBbox(locator);
  const box = await locator.boundingBox();
  if (!box) throw new Error('locator has no bbox');

  const startX = box.x + box.width / 2;
  const startY = box.y + (opts.startOffsetY ?? 12);
  const endX = startX + (opts.dx ?? 0);
  const endY = startY + opts.dy;
  const steps = opts.steps ?? 10;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  if (opts.stepDelayMs) {
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      await page.mouse.move(startX + (endX - startX) * t, startY + (endY - startY) * t);
      await page.waitForTimeout(opts.stepDelayMs);
    }
  } else {
    await page.mouse.move(endX, endY, { steps });
  }
  await page.mouse.up();
}

/** Drag вниз/вверх с замером геометрии sheet'а ПОСЕРЕДИНЕ жеста (между move и up). */
async function dragAndMeasureMid(
  page: Page,
  locator: Locator,
  dy: number,
): Promise<{ startHeight: number; midHeight: number; midBottom: number; viewportH: number }> {
  await waitForStableBbox(locator);
  const box = await locator.boundingBox();
  if (!box) throw new Error('locator has no bbox');
  const startX = box.x + box.width / 2;
  const startY = box.y + 12;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX, startY + dy, { steps: 8 });
  const mid = await locator.evaluate(el => {
    const r = el.getBoundingClientRect();
    return { height: Math.round(r.height), bottom: Math.round(r.bottom) };
  });
  await page.mouse.up();

  return {
    startHeight: Math.round(box.height),
    midHeight: mid.height,
    midBottom: mid.bottom,
    viewportH: page.viewportSize()?.height ?? 0,
  };
}

test.describe('BottomSheet — swipe / drag', () => {
  test.beforeEach(skipOnDesktop);

  // —————————————————————————— Close on swipe-down ——————————————————————

  test('swipe-down closes single-snap sheet', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    await dragSheet(page, root, { dy: 220, steps: 8 });
    await expect(root).not.toBeVisible({ timeout: 2000 });
  });

  test('swipe-down closes expandable sheet (drag below smallest snap)', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.expandable));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    await dragSheet(page, root, { dy: Math.min(600, page.viewportSize()?.height ?? 800), steps: 10 });
    await expect(root).not.toBeVisible({ timeout: 2000 });
  });

  // —————————————————————————— Direction tolerance ——————————————————————

  test('diagonal swipe-down (down-right) closes', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    await dragSheet(page, root, { dx: 180, dy: 240 });
    await expect(root).not.toBeVisible({ timeout: 2000 });
  });

  test('diagonal swipe-down (down-left) closes', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    await dragSheet(page, root, { dx: -160, dy: 260 });
    await expect(root).not.toBeVisible({ timeout: 2000 });
  });

  test('strictly horizontal swipe does NOT close', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    // Вертикальное смещение 4px < DRAG_START_THRESHOLD_PX → drag не стартует.
    await dragSheet(page, root, { dx: 300, dy: 4 });
    await page.waitForTimeout(400);
    await expect(root).toBeVisible();
  });

  // —————————————————————————— Velocity / distance thresholds ————————————

  test('slow short drag below both thresholds keeps sheet open', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    const box = await root.boundingBox();
    await dragSheet(page, root, { dy: Math.round((box?.height ?? 300) * 0.1), steps: 10, stepDelayMs: 40 });
    await page.waitForTimeout(400);
    await expect(root).toBeVisible();
  });

  test('fast flick above velocity threshold closes', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    await dragSheet(page, root, { dy: 140, steps: 4 });
    await expect(root).not.toBeVisible({ timeout: 2000 });
  });

  test('long slow drag above distance threshold closes', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    const box = await root.boundingBox();
    await dragSheet(page, root, { dy: Math.round((box?.height ?? 300) * 0.5), steps: 15, stepDelayMs: 60 });
    await expect(root).not.toBeVisible({ timeout: 2000 });
  });

  test('partial drag-and-back keeps sheet open and clears drag state', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();
    await waitForStableBbox(root);

    const box = await root.boundingBox();
    if (!box) throw new Error('no bbox');
    const startX = box.x + box.width / 2;
    const startY = box.y + 12;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    for (let i = 1; i <= 6; i++) await page.mouse.move(startX, startY + (80 * i) / 6);
    for (let i = 6; i >= 0; i--) await page.mouse.move(startX, startY + (80 * i) / 6);
    await page.mouse.up();

    await page.waitForTimeout(300);
    await expect(root).toBeVisible();
    await expect(root).not.toHaveAttribute('data-dragging', 'true');
  });

  // —————————————————————————— Bottom-anchored height-resize ————————————

  test('drag-up grows the sheet upward without detaching from the bottom', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.expandable));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    const { startHeight, midHeight, midBottom, viewportH } = await dragAndMeasureMid(page, root, -200);
    expect(midHeight).toBeGreaterThan(startHeight); // выросла в высоту
    expect(viewportH - midBottom).toBeLessThanOrEqual(1); // низ остался у кромки экрана (gap ≈ 0)
  });

  test('drag-down shrinks the sheet without sliding off-screen', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions({ snapPointsPreset: 'half-full', defaultSnapIndex: 1 }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    const { startHeight, midHeight, midBottom, viewportH } = await dragAndMeasureMid(page, root, 240);
    expect(midHeight).toBeLessThan(startHeight); // сжалась
    expect(viewportH - midBottom).toBeLessThanOrEqual(1); // низ по-прежнему у кромки, не уехал за экран
  });

  // —————————————————————————— Multi-snap navigation ——————————————————

  test('swipe-up moves to the next snap (0 → 1)', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.expandable));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toHaveAttribute('data-snap-index', '0');

    await dragSheet(page, root, { dy: -220, steps: 6 });
    await expect(root).toHaveAttribute('data-snap-index', '1', { timeout: 1500 });
    await expect(root).toBeVisible();
  });

  test('swipe-down moves to the previous snap (1 → 0)', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions({ snapPointsPreset: 'half-full', defaultSnapIndex: 1 }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toHaveAttribute('data-snap-index', '1');

    // Медленный drag вниз примерно на четверть экрана: velocity заведомо < 0.5 (→ nearest-snap),
    // а высота уезжает ближе к нижнему snap'у — детерминированный переход 1 → 0 (не закрытие).
    const quarter = Math.round((page.viewportSize()?.height ?? 800) * 0.3);
    await dragSheet(page, root, { dy: quarter, steps: 15, stepDelayMs: 50 });
    await expect(root).toHaveAttribute('data-snap-index', '0', { timeout: 1500 });
    await expect(root).toBeVisible();
  });

  // —————————————————————————— Controlled snapIndex ——————————————————————

  test('controlled: swipe-up fires onSnapIndexChange and consumer echo moves the sheet', async ({
    gotoStory,
    page,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.controlledSnap));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toHaveAttribute('data-snap-index', '0');
    await expect(getByTestId(STORY_TEST_IDS.controlledSnap.reported)).toContainText('—');

    await dragSheet(page, root, { dy: -220, steps: 6 });

    // onSnapIndexChange сработал с индексом 1, и потребитель прокинул его обратно в snapIndex.
    await expect(getByTestId(STORY_TEST_IDS.controlledSnap.reported)).toContainText('1', { timeout: 1500 });
    await expect(root).toHaveAttribute('data-snap-index', '1', { timeout: 1500 });

    // Программный controlled-переход: кнопка двигает sheet на нужный snap напрямую через prop.
    await getByTestId(STORY_TEST_IDS.controlledSnap.toPeek).click();
    await expect(root).toHaveAttribute('data-snap-index', '0', { timeout: 1500 });
  });

  test('controlled snapIndex veto: swipe-up keeps the controlled snap and height does not stick', async ({
    gotoStory,
    page,
    getByTestId,
  }) => {
    // snapIndex задан URL-арг'ом → controlled и «заморожен» (Playground не возвращает новое значение
    // через onSnapIndexChange). Свайп вверх обязан НЕ сдвинуть индекс и вернуть высоту к snap'у 0,
    // а не «залипнуть» на release-позиции драга.
    await gotoStory(buildStoryOptions({ snapPointsPreset: 'half-full', snapIndex: 0 }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toHaveAttribute('data-snap-index', '0');
    await waitForStableBbox(root);
    const before = (await root.boundingBox())?.height ?? 0;

    await dragSheet(page, root, { dy: -220, steps: 6 });

    await expect(root).toHaveAttribute('data-snap-index', '0');
    await waitForStableBbox(root);
    const after = (await root.boundingBox())?.height ?? 0;
    // Высота вернулась к контролируемому snap'у (с допуском на subpixel), а не осталась раскрытой.
    expect(Math.abs(after - before)).toBeLessThanOrEqual(4);
  });

  // —————————————————————————— Scroll-vs-drag gate ——————————————————————

  test('drag started inside a scrolled body yields to scroll (does not close)', async ({
    gotoStory,
    page,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.scrollable));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();
    await waitForStableBbox(root);

    // Скроллим body от верха — теперь жест вниз должен достаться скроллу, а не drag'у sheet'а.
    const body = getByTestId(TEST_IDS.body);
    await body.evaluate(el => {
      el.scrollTop = 150;
    });

    const bbox = await body.boundingBox();
    if (!bbox) throw new Error('no body bbox');
    const x = bbox.x + bbox.width / 2;
    const y = bbox.y + bbox.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y + 200, { steps: 8 });
    await page.mouse.up();

    await page.waitForTimeout(400);
    await expect(root).toBeVisible(); // sheet не закрылся — drag отдан скроллу
  });

  // —————————————————————————— swipeEnabled=false ————————————————————

  test('does not drag/close when swipeEnabled=false', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions({ swipeEnabled: false }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    await dragSheet(page, root, { dy: 300, steps: 8 });
    await page.waitForTimeout(400);
    await expect(root).toBeVisible();
  });
});
