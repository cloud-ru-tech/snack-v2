import { useLayoutEffect } from '@ds/utils';
import { useEffect, useRef } from 'react';
import { tabbable } from 'tabbable';

/**
 * Focus scope для bottom-sheet-панели:
 *   - переносит фокус внутрь панели при открытии;
 *   - цикличный Tab / Shift+Tab внутри контейнера.
 *
 * Возврат фокуса на триггер после закрытия делает САМ компонент (`BottomSheetCustom`): «прежний»
 * элемент нужно запоминать в момент `open=true`, до slide-up-задержки `isActive`, иначе триггер
 * успевает потерять фокус и восстанавливать оказывается некуда.
 *
 * Nested-safe: Tab-обработчик трогает фокус только когда тот **уже внутри** этой панели.
 * Если фокус в другом слое (вложенный bottom-sheet поверх — он в отдельном portal'е), внешняя
 * панель не «утягивает» фокус к себе. Так несколько вложенных sheet'ов не конфликтуют, а топовый
 * (с реальным фокусом) корректно зацикливает Tab. Тот же принцип у `@ds/modal::useModalFocusTrap`.
 *
 * Возвращает ref, который нужно повесить на корневой DOM-узел панели.
 */
export function useFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    // Контейнер всегда делаем программно фокусируемым (tabindex=-1), а не только когда у него
    // нет focusable-детей: если все focusable-элементы удалятся в рантайме (динамический контент —
    // например, список опустеет), Tab-обработчик ниже сможет вернуть фокус на root и удержать trap.
    if (!container.hasAttribute('tabindex')) {
      container.setAttribute('tabindex', '-1');
    }
    // Перенести фокус внутрь dialog'а при открытии: первый focusable либо сам root. Без этого
    // keyboard-юзер остаётся на триггере вне sheet'а — focus-trap включён, но фокусу некуда уходить.
    const nodes = tabbable(container);
    // tabbable() возвращает FocusableElement (HTMLElement | SVGElement) — оба фокусируемы.
    const target = nodes[0] ?? container;
    target.focus({ preventScroll: true });
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const container = containerRef.current;
      if (!container) return;

      const activeElement = document.activeElement;
      if (!(activeElement instanceof HTMLElement)) return;

      // Топовый слой (вложенный sheet) живёт в отдельном portal'е и НЕ внутри этого контейнера —
      // значит фокус не наш, не трогаем. Это и делает trap nested-safe.
      const focusInsideDialog = activeElement === container || container.contains(activeElement);
      if (!focusInsideDialog) return;

      // preventScroll везде: bottom-sheet — fixed-overlay, перевод фокуса внутри него никогда не
      // должен скроллить фон-страницу (иначе при открытии/Tab страница «уезжает» — заметно, когда
      // sheet встроен в прокручиваемую страницу, например в demo/docs).
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
