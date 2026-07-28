import { Page } from '@playwright/test';

/**
 * Фаза, на которой останавливаем анимацию. Годится любое фиксированное значение, но у бегущих
 * бликов (shimmer) в начале цикла блик ещё в кадре, а к концу уже уехал — поэтому берём раннюю фазу.
 */
const DEFAULT_FREEZE_TIME_MS = 500;

/**
 * Останавливает все CSS-анимации страницы на одной и той же фазе.
 *
 * Опция снимка `animations: 'disabled'` бесконечную анимацию отменяет — элемент рендерится так,
 * будто анимации нет (у shimmer'а это уводит блик за пределы кадра). `animations: 'allow'`
 * оставляет её живой, и каждый снимок ловит случайный кадр. Поэтому фазу фиксируем сами, а
 * снимок делается с `animations: 'allow'` — иначе Playwright отменит уже поставленную паузу.
 *
 * Фаза задаётся явным `currentTime`, а не отрицательным `animation-delay`: при паузе Blink
 * запоминает hold time — фазу на момент, когда стиль долетел до страницы, — и последующая
 * правка delay её не пересчитывает. Кадр получался разным от прогона к прогону.
 *
 * `animation-play-state` при этом остаётся правилом со `!important`: оно действует и на узлы,
 * смонтированные позже вызова, тогда как `currentTime` выставляется только уже существующим
 * анимациям.
 */
export async function freezeCssAnimations(page: Page, atMs: number = DEFAULT_FREEZE_TIME_MS): Promise<void> {
  await page.addStyleTag({
    content: `*, *::before, *::after {
      animation-play-state: paused !important;
    }`,
  });

  await page.evaluate(freezeAtMs => {
    // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi -- evaluated in browser context
    for (const animation of document.getAnimations()) {
      animation.pause();
      animation.currentTime = freezeAtMs;
    }
  }, atMs);
}
