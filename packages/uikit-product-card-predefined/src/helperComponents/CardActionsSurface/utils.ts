import { KeyboardEventHandler, RefObject } from 'react';

export type CardActionsKeyboardItem = {
  ref: RefObject<HTMLElement | null>;
  /**
   * Поведение Space/Enter, когда фокус на этом элементе.
   * - `undefined` — ничего не делать (например, trigger тултипа)
   * - функция — вызвать и остановиться
   */
  onActivate?(): void;
};

export type CreateCardActionsKeyDownHandlerOptions = {
  disabled?: boolean;
  cardRef: RefObject<HTMLElement | null>;
  /** Упорядоченная цепочка фокуса после карточки: promoTag → tooltip → favorite → expand */
  items: Array<CardActionsKeyboardItem | false | null | undefined>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
};

/**
 * Клавиатура для доп. контролов карточки сервиса:
 * ArrowRight/ArrowLeft — по цепочке card → items; Space/Enter — activate или клик по карточке.
 */
export function createCardActionsKeyDownHandler({
  disabled,
  cardRef,
  items: rawItems,
  onKeyDown,
}: CreateCardActionsKeyDownHandlerOptions): KeyboardEventHandler<HTMLElement> {
  const items = rawItems.filter(Boolean) as CardActionsKeyboardItem[];
  const chain = [cardRef, ...items.map(item => item.ref)];

  return e => {
    if (disabled) {
      onKeyDown?.(e);
      return;
    }

    const currentIndex = chain.findIndex(ref => ref.current === e.target);

    if (e.code === 'ArrowRight') {
      e.preventDefault();

      if (currentIndex !== -1) {
        chain[currentIndex + 1]?.current?.focus();
      }
    }

    if (e.code === 'ArrowLeft') {
      e.preventDefault();

      if (currentIndex > 0) {
        chain[currentIndex - 1]?.current?.focus();
      } else {
        cardRef.current?.focus();
      }
    }

    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();

      const currentItem = currentIndex > 0 ? items[currentIndex - 1] : undefined;

      if (currentItem) {
        currentItem.onActivate?.();

        return;
      }

      cardRef.current?.click();
    }

    onKeyDown?.(e);
  };
}
