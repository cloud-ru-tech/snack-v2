import { useLayoutEffect } from '@ds/utils';
import { useEffect, useRef } from 'react';
import { tabbable } from 'tabbable';

/**
 * Focus scope: при открытии сохраняет фокус на поле с autoFocus или переводит его на контейнер диалога.
 * Tab / Shift+Tab циклически ходят по tabbable внутри.
 */
export function useModalFocusTrap(active: boolean, isTopOverlay: () => boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!active) {
      return;
    }

    const container = containerRef.current;
    if (container && isTopOverlay() && !container.contains(document.activeElement)) {
      container.focus({ preventScroll: true });
    }
  }, [active, isTopOverlay]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || event.defaultPrevented || !isTopOverlay()) {
        return;
      }

      const container = containerRef.current;
      if (!container) {
        return;
      }

      const nodes = tabbable(container);
      const index = nodes.findIndex(node => node === document.activeElement);
      const previousIndex = index <= 0 ? nodes.length - 1 : index - 1;
      const nextNode = event.shiftKey ? nodes[previousIndex] : (nodes[index + 1] ?? nodes[0]);

      event.preventDefault();
      (nextNode ?? container).focus({ preventScroll: true });
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [active, isTopOverlay]);

  return containerRef;
}
