import { Page } from '@playwright/test';

import { waitForPendingRequests } from './pendingRequests';

/**
 * Block until the page is visually stable enough for a screenshot.
 *
 * `document.fonts.ready` сам по себе не гарантирует стабильности кадра:
 *
 * 1. После `fonts.ready` браузер делает ещё один layout-pass с custom-метриками
 *    шрифтов. Снимок до этого pass'а — другая раскладка (ширина строк,
 *    перенос флекс-айтемов).
 * 2. Dev-Storybook догружает HMR/lazy-чанки после `fonts.ready` — в кадр
 *    попадает промежуточное состояние.
 * 3. StoryTable c многими ячейками монтируется не атомарно: `count()` в
 *    snapshot-утилитах ловит разное число tables на разных запусках, что
 *    меняет ветку и формат итогового PNG (RGB vs RGBA composite).
 *
 * 4. CSS transitions/animations не отключены глобально. Опция screenshot'а
 *    `animations: 'disabled'` действует только на момент самого снимка, но
 *    между cell'ами composite (click-loop по placements/widths/states) и при
 *    первом снимке после fonts.ready хвост анимации остаётся в кадре.
 *
 * Раньше пробовал `transition-duration:0 !important` через инжект style tag —
 * это ломает portal-компоненты (Modal, Drawer, Popover): они используют
 * `transitionend`/animation-finished для маркировки «open complete», и при
 * принудительной 0-duration событие либо не приходит, либо приходит до
 * монтирования контента → снимок captures пустой backdrop. Modal/open-*
 * становились байт-идентичны (одинаковый MD5 для разных state'ов).
 *
 * Подход: дождаться завершения всех уже стартовавших WebAnimations через
 * `Animation.finished`, а не отключать их. После этого все transitions
 * доиграли естественным путём, layout стабилен. Опция screenshot'а
 * `animations: 'disabled'` подстраховывает на момент самого снимка.
 *
 * Ждём: fonts → отсутствие незавершённых запросов → finish всех animations → два rAF.
 */
export async function waitForFonts(page: Page): Promise<void> {
  /* eslint-disable @cloud-ru/ssr-safe-react/domApi -- evaluated in browser context via page.evaluate */
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  // Не `waitForLoadState('networkidle')`: он ждёт 500ms тишины в сети и не возвращается
  // быстрее полусекунды, даже когда грузить нечего. Счётчик in-flight запросов даёт ту же
  // гарантию и отдаёт управление сразу. Лимит 5s: dev-Storybook держит HMR-WebSocket
  // открытым, ждать его бесконечно нельзя.
  await waitForPendingRequests(page, 5000);
  await page.evaluate(async () => {
    // getAnimations() возвращает все running CSS-transitions/animations + WAAPI.
    // Infinite-анимации (spinner'ы, indeterminate progress) исключаем — их
    // `finished` никогда не зарезолвится. Опция screenshot'а `animations:
    // 'disabled'` сама фризит spinner на момент снимка.
    const animations = (document.getAnimations?.() ?? []).filter(a => {
      const timing = a.effect?.getComputedTiming();
      return timing != null && timing.iterations !== Infinity;
    });
    // Таймаут на случай патологии (зависшее transition), чтобы не повесить тест.
    const TIMEOUT_MS = 500;
    await Promise.all(
      animations.map(a =>
        Promise.race([
          a.finished.catch(() => undefined),
          new Promise<void>(resolve => {
            setTimeout(resolve, TIMEOUT_MS);
          }),
        ]),
      ),
    );
    await new Promise<void>(resolve => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
  });
  /* eslint-enable @cloud-ru/ssr-safe-react/domApi */
}
