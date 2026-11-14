import { useRef } from 'react';

import { useEventHandler } from './useEventHandler';
import { useLayoutEffect } from './useIsomorphicLayoutEffect';

const OVERLAY_STACK = Symbol.for('@ds/overlay-stack');

type OverlayDocument = Document & { [OVERLAY_STACK]?: object[] };

// Хост и микрофронты могут загружать разные копии пакета в один документ.
function getOverlayStack(document: Document): object[] {
  const owner = document as OverlayDocument;
  return (owner[OVERLAY_STACK] ??= []);
}

export function useOverlayStack(open: boolean, onEscape?: () => void) {
  const entry = useRef({});
  const activeStack = useRef<object[]>();
  const restoreFocus = useRef<ReturnType<typeof setTimeout>>();
  const isTopOverlay = useEventHandler(() => activeStack.current?.at(-1) === entry.current);
  const handleEscape = useEventHandler((event: KeyboardEvent) => {
    if (event.key !== 'Escape' || event.defaultPrevented || !isTopOverlay()) {
      return;
    }

    event.preventDefault();
    if (!event.repeat) {
      onEscape?.();
    }
  });

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    clearTimeout(restoreFocus.current);
    const overlay = entry.current;
    const previousFocus = document.activeElement;
    const stack = getOverlayStack(document);
    activeStack.current = stack;
    stack.push(overlay);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      const wasTop = isTopOverlay();
      activeStack.current = undefined;
      clearTimeout(restoreFocus.current);
      const index = stack.indexOf(overlay);
      if (index === -1) {
        return;
      }
      stack.splice(index, 1);

      if (wasTop && previousFocus instanceof HTMLElement) {
        const nextOverlay = stack.at(-1);
        restoreFocus.current = setTimeout(() => {
          restoreFocus.current = undefined;
          if (stack.at(-1) === nextOverlay && previousFocus.isConnected) {
            previousFocus.focus({ preventScroll: true });
          }
        }, 0);
      }
    };
  }, [open, handleEscape, isTopOverlay]);

  return isTopOverlay;
}
