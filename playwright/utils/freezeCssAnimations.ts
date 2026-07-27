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
 * оставляет её живой, и каждый снимок ловит случайный кадр. Отрицательный `animation-delay`
 * плюс `paused` дают видимую анимацию и детерминированный кадр одновременно; снимок после этого
 * делается с `animations: 'allow'`, иначе Playwright отменит уже поставленную паузу.
 *
 * Правило действует и на узлы, смонтированные позже вызова, — в отличие от разовой правки
 * `Animation.currentTime` через `document.getAnimations()`.
 */
export async function freezeCssAnimations(page: Page, atMs: number = DEFAULT_FREEZE_TIME_MS): Promise<void> {
  await page.addStyleTag({
    content: `*, *::before, *::after {
      animation-delay: -${atMs}ms !important;
      animation-play-state: paused !important;
    }`,
  });
}
