/**
 * Ищет ближайшего вертикально-прокручиваемого предка `start`, поднимаясь по DOM до `boundary`
 * включительно. Прокручиваемым считается элемент с `overflow-y: auto | scroll` и реальным
 * переполнением (`scrollHeight > clientHeight`).
 *
 * Используется drag-движком для решения «скроллить контент или тянуть sheet»: если жест начат
 * внутри прокручиваемой области, которая ещё не упёрлась в нужный край, отдаём жест нативному
 * скроллу, а не drag'у (vaul-подобное поведение «drag только от верха скролла»).
 *
 * @param start — узел-цель события (`event.target`).
 * @param boundary — корневой узел sheet'а (`.content`); выше него не поднимаемся.
 */
export function findScrollableAncestor(start: EventTarget | null, boundary: HTMLElement | null): HTMLElement | null {
  let node = start instanceof HTMLElement ? start : null;

  while (node) {
    const overflowY = window.getComputedStyle(node).overflowY;
    const isScrollable = overflowY === 'auto' || overflowY === 'scroll';

    if (isScrollable && node.scrollHeight > node.clientHeight) {
      return node;
    }

    if (node === boundary) break;
    node = node.parentElement;
  }

  return null;
}

/** Доехал ли прокручиваемый элемент до самого верха. */
export function isScrolledToTop(el: HTMLElement): boolean {
  return el.scrollTop <= 0;
}

/** Доехал ли прокручиваемый элемент до самого низа (с допуском в 1px на subpixel-округление). */
export function isScrolledToBottom(el: HTMLElement): boolean {
  return el.scrollHeight - el.clientHeight - el.scrollTop <= 1;
}
