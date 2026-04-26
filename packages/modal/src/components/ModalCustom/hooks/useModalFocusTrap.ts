import { useLayoutEffect } from '@ds/utils';
import { useEffect, useRef } from 'react';
import { tabbable } from 'tabbable';

/**
 * Focus scope: фокус при открытии только на контейнере диалога (без прыжка на кнопки — удобно при открытии мышью);
 * Tab / Shift+Tab циклически ходят по tabbable внутри; возврат фокуса после закрытия.
 */
export function useModalFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!active) {
      return;
    }

    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.focus({ preventScroll: true });

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

      const focusInsideDialog = activeElement === container || container.contains(activeElement);
      if (!focusInsideDialog) {
        return;
      }

      const nodes = tabbable(container);
      if (nodes.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (activeElement === container) {
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
