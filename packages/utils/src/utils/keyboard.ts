/**
 * Клавиши-стрелки. Внутри компонентов с собственной клавиатурной навигацией (списки, сетка
 * календаря, roving-кнопки) их нативное поведение — прокрутка страницы — нужно гасить, иначе
 * событие «улетает» за компонент и скроллит документ.
 */
export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] as const;

/**
 * Вертикальные стрелки. Для текстовых полей гасить нужно только их (горизонтальные `ArrowLeft` /
 * `ArrowRight` двигают каретку — их перехватывать нельзя), тогда как в сетках/списках/roving-кнопках
 * без текста гасятся все четыре (см. {@link ARROW_KEYS}).
 */
export const VERTICAL_ARROW_KEYS = ['ArrowUp', 'ArrowDown'] as const;

export type ArrowKey = (typeof ARROW_KEYS)[number];

/** `true`, если клавиша — одна из стрелок навигации. */
export function isArrowKey(key: string): key is ArrowKey {
  return (ARROW_KEYS as readonly string[]).includes(key);
}

/** `true`, если клавиша — вертикальная стрелка (`ArrowUp` / `ArrowDown`). */
export function isVerticalArrowKey(key: string): boolean {
  return (VERTICAL_ARROW_KEYS as readonly string[]).includes(key);
}

/**
 * Гасит нативную прокрутку страницы для клавиш-стрелок: если нажата стрелка — вызывает
 * `preventDefault()` и возвращает `true`. Использовать в начале keydown-обработчика компонента,
 * который сам обрабатывает стрелочную навигацию.
 *
 * @example
 * const handleKeyDown = (e) => {
 *   preventScrollOnArrowKeys(e);
 *   // …собственная навигация
 * };
 */
export function preventScrollOnArrowKeys(event: Pick<KeyboardEvent, 'key' | 'preventDefault'>): boolean {
  if (isArrowKey(event.key)) {
    event.preventDefault();
    return true;
  }

  return false;
}

/**
 * Как {@link preventScrollOnArrowKeys}, но только для вертикальных стрелок (`ArrowUp` / `ArrowDown`).
 * Для текстовых полей: гасит прокрутку страницы по Up/Down, не трогая горизонтальные стрелки —
 * каретка по тексту продолжает двигаться.
 */
export function preventScrollOnVerticalArrows(event: Pick<KeyboardEvent, 'key' | 'preventDefault'>): boolean {
  if (isVerticalArrowKey(event.key)) {
    event.preventDefault();
    return true;
  }

  return false;
}

/**
 * Программный фокус без авто-прокрутки страницы к элементу (`focus({ preventScroll: true })`).
 * Применять при перемещении фокуса по клавиатуре внутри уже видимого компонента (ячейка
 * календаря, элемент списка), иначе браузер скроллит документ к новому фокусу.
 */
export function focusWithoutScroll(element: HTMLElement | null | undefined): void {
  element?.focus({ preventScroll: true });
}
