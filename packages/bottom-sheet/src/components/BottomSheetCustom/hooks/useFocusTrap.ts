import { useLayoutEffect } from '@ds/utils';
import { useEffect, useRef } from 'react';
import { tabbable } from 'tabbable';

/**
 * Focus scope для bottom-sheet-панели: фокус внутрь при открытии + цикличный Tab/Shift+Tab.
 * Возврат фокуса на триггер делает сам `BottomSheetCustom`. Nested-safe: Tab-обработчик трогает
 * фокус только когда тот уже внутри панели, поэтому вложенные sheet'ы не конфликтуют.
 * Возвращает ref на корневой DOM-узел панели.
 */
export function useFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    // Контейнер всегда фокусируемый (tabindex=-1): если focusable-дети удалятся в рантайме,
    // Tab-обработчик вернёт фокус на root и удержит trap.
    if (!container.hasAttribute('tabindex')) {
      container.setAttribute('tabindex', '-1');
    }
    // Фокус при открытии — на панель, не на первый focusable: скринридер озвучивает заголовок,
    // на touch не всплывает лишняя focus-рамка и виртуальная клавиатура.
    container.focus({ preventScroll: true });
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const container = containerRef.current;
      if (!container) return;

      const activeElement = document.activeElement;
      if (!(activeElement instanceof HTMLElement)) return;

      // Вложенный sheet живёт в отдельном portal'е — если фокус не внутри контейнера, не трогаем.
      const focusInsideDialog = activeElement === container || container.contains(activeElement);
      if (!focusInsideDialog) return;

      // preventScroll везде: перевод фокуса в fixed-overlay не должен скроллить фон-страницу.
      const nodes = tabbable(container);
      if (nodes.length === 0) {
        event.preventDefault();
        container.focus({ preventScroll: true });
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (activeElement === container) {
        event.preventDefault();
        if (event.shiftKey) last?.focus({ preventScroll: true });
        else first?.focus({ preventScroll: true });
        return;
      }

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last?.focus({ preventScroll: true });
        return;
      }

      if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first?.focus({ preventScroll: true });
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [active]);

  return containerRef;
}
