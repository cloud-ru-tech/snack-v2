import { useLayoutEffect } from '@ds/utils';
import { useEffect, useRef } from 'react';
import { tabbable } from 'tabbable';

/**
 * Focus scope для Drawer-панели:
 *  - запоминает activeElement до открытия и возвращает фокус после закрытия;
 *  - устанавливает фокус на контейнер при открытии (без прыжка на первый focusable);
 *  - цикличный Tab / Shift+Tab внутри контейнера.
 *
 * Возвращает ref, который нужно повесить на корневой DOM-узел панели.
 */
export function useDrawerFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!active) {
      return;
    }

    // Панель rc-drawer монтируется отдельным коммитом, поэтому `containerRef` здесь ещё пуст —
    // возврат фокуса от него не зависит и на его отсутствие завязываться нельзя.
    // Начальный фокус ставит сам rc-drawer (autoFocus на panelRef).
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    return () => {
      if (
        previous &&
        previous !== document.body &&
        previous !== document.documentElement &&
        document.documentElement.contains(previous)
      ) {
        previous.focus({ preventScroll: true });
      }
    };
  }, [active]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const container = containerRef.current;
      if (!container) {
        return;
      }

      const activeElement = document.activeElement;
      if (!(activeElement instanceof HTMLElement)) {
        return;
      }

      const focusInsideDialog = container.contains(activeElement);
      const nodes = tabbable(container);

      if (nodes.length === 0) {
        event.preventDefault();
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (!focusInsideDialog) {
        // Фокус ушёл наружу (rc-drawer sentinel / body) — вернём внутрь.
        event.preventDefault();
        if (event.shiftKey) {
          last?.focus();
        } else {
          first?.focus();
        }
        return;
      }

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last?.focus();
        return;
      }

      if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [active]);

  return containerRef;
}
