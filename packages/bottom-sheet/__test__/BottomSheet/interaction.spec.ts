import { expect, test } from '#playwright-tooling/fixtures';
import { waitForStableBbox } from '#playwright-tooling/utils';

import { BOTTOM_SHEET_STORIES, buildStoryOptions, skipOnDesktop, STORY_TEST_IDS, TEST_IDS } from './helpers';

test.describe('BottomSheet — interaction (browser-specific)', () => {
  test.beforeEach(skipOnDesktop);

  // —————————————————————————— Body scroll-lock (react-remove-scroll) ——————————

  test('locks body scroll while open and releases after close', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    expect(await page.evaluate(() => document.body.hasAttribute('data-scroll-locked'))).toBe(false);

    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    // react-remove-scroll вешает data-scroll-locked на body (overflow:hidden + iOS touchmove guard) —
    // это и гасит скролл фона и pull-to-refresh.
    expect(await page.evaluate(() => document.body.hasAttribute('data-scroll-locked'))).toBe(true);

    await getByTestId(TEST_IDS.backdrop).click();
    await expect(getByTestId(TEST_IDS.root)).not.toBeVisible();
    // Лок снимается после размонтирования (leave-анимация). Ждём poll'ом.
    await expect
      .poll(() => page.evaluate(() => document.body.hasAttribute('data-scroll-locked')), { timeout: 1500 })
      .toBe(false);
  });

  test('does not lock body scroll when lockScroll=false (non-modal)', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions({ lockScroll: false, showBackdrop: false }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    // RemoveScroll disabled → body не получает data-scroll-locked, фон остаётся прокручиваемым.
    expect(await page.evaluate(() => document.body.hasAttribute('data-scroll-locked'))).toBe(false);
  });

  test('inner body scrolls natively while the page stays locked', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.scrollable));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.body)).toBeVisible();

    // touch-action: none стоит на drag-зонах (handle/header/footer), а body остаётся pan-y и без
    // `none`-предка — поэтому нативный вертикальный скролл контента не заблокирован, а фон залочен.
    const probe = await page.evaluate(
      ([bodyId, rootId]) => {
        const body = document.querySelector(`[data-test-id="${bodyId}"]`);
        const root = document.querySelector(`[data-test-id="${rootId}"]`);
        if (!(body instanceof HTMLElement)) return null;
        const chain: string[] = [];
        let n: HTMLElement | null = body;
        while (n) {
          chain.push(getComputedStyle(n).touchAction);
          if (n === root) break;
          n = n.parentElement;
        }
        return {
          bodyTouchAction: getComputedStyle(body).touchAction,
          bodyScrollable: body.scrollHeight > body.clientHeight,
          anyAncestorBlocksPan: chain.some(ta => ta === 'none'),
          pageLocked: document.body.hasAttribute('data-scroll-locked'),
        };
      },
      [TEST_IDS.body, TEST_IDS.root],
    );

    expect(probe).not.toBeNull();
    expect(probe?.bodyTouchAction).toBe('pan-y');
    expect(probe?.bodyScrollable).toBe(true);
    expect(probe?.anyAncestorBlocksPan).toBe(false);
    expect(probe?.pageLocked).toBe(true);
  });

  // —————————————————————————— Dismiss surfaces ——————————————————————

  test('closes on backdrop click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();

    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    await getByTestId(TEST_IDS.backdrop).click();
    await expect(root).not.toBeVisible();
  });

  test('closes on history popstate (mobile back navigation)', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();

    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    // Кладём фиктивную history-запись, чтобы back() вызвал ТОЛЬКО popstate (URL не меняется, стори не
    // выгружается) — иначе тест прошёл бы и просто от навигации, не проверив closeOnPopstate-обработчик.
    await page.evaluate(() => window.history.pushState(null, '', window.location.href));
    await page.evaluate(() => window.history.back());
    await expect(root).not.toBeVisible();
  });

  test('stays open on popstate when closeOnPopstate=false', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions({ closeOnPopstate: false }));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();

    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    // Кладём фиктивную history-запись и снимаем её через back() — popstate срабатывает, но URL не меняется.
    // С closeOnPopstate=false компонент не подписан на popstate → sheet остаётся открытым.
    await page.evaluate(() => window.history.pushState(null, '', window.location.href));
    await page.evaluate(() => window.history.back());
    await page.waitForTimeout(300);
    await expect(root).toBeVisible();
  });

  // —————————————————————————— Nested sheets (layered portals) ——————————

  test('opens a nested action-sheet on top of the parent', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.nested));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();

    const outer = getByTestId(TEST_IDS.root);
    await expect(outer).toBeVisible();

    await getByTestId(STORY_TEST_IDS.nestedOpen).click();
    const inner = getByTestId(STORY_TEST_IDS.nestedRoot);
    await expect(inner).toBeVisible();
    // Дожидаемся завершения slide-up вложенного sheet'а — иначе elementFromPoint снимается по
    // промежуточной (ещё не доехавшей) геометрии и тест флакает.
    await waitForStableBbox(inner);

    // Оба залочили body (refcount react-remove-scroll = 2). Применяется эффектом — поэтому poll.
    await expect.poll(() => page.evaluate(() => document.body.getAttribute('data-scroll-locked'))).toBe('2');

    // Вложенный sheet нарисован поверх — точка в его центре принадлежит ему, а не нижнему.
    const innerOnTop = await page.evaluate(testId => {
      const el = document.querySelector(`[data-test-id="${testId}"]`);
      if (!(el instanceof HTMLElement)) return false;
      const r = el.getBoundingClientRect();
      const top = document.elementFromPoint(Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2));
      return el === top || el.contains(top as Node);
    }, STORY_TEST_IDS.nestedRoot);
    expect(innerOnTop).toBe(true);
  });

  test('closing the nested sheet returns to the parent (parent stays open)', async ({
    gotoStory,
    page,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, BOTTOM_SHEET_STORIES.nested));
    await getByTestId(STORY_TEST_IDS.triggerOpen).click();

    const outer = getByTestId(TEST_IDS.root);
    // Дожидаемся внешнего sheet'а перед открытием вложенного — кнопка nestedOpen живёт внутри него.
    await expect(outer).toBeVisible();

    await getByTestId(STORY_TEST_IDS.nestedOpen).click();
    const inner = getByTestId(STORY_TEST_IDS.nestedRoot);
    await expect(inner).toBeVisible();
    await waitForStableBbox(inner);

    await getByTestId(TEST_IDS.footerCancel).click();

    await expect(inner).not.toBeVisible();
    await expect(outer).toBeVisible();
    // refcount упал до 1 — фон всё ещё залочен внешним sheet'ом.
    await expect.poll(() => page.evaluate(() => document.body.getAttribute('data-scroll-locked'))).toBe('1');
  });
});
