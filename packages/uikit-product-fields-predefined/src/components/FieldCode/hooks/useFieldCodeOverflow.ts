import { useLayoutEffect } from '@ds/utils';
import { useCallback, useRef, useState } from 'react';

function hasCodeOverflow(root: HTMLElement, codeContainer: HTMLElement): boolean {
  return codeContainer.scrollWidth > root.clientWidth;
}

/** Запасной сценарий: включает горизонтальный скролл, если ряд ячеек шире контейнера. */
export function useFieldCodeOverflow() {
  const [hasOverflow, setHasOverflow] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);

  const measure = useCallback(() => {
    const root = rootRef.current;
    const codeContainer = codeContainerRef.current;

    if (!root || !codeContainer) {
      return;
    }

    setHasOverflow(prev => {
      const next = hasCodeOverflow(root, codeContainer);
      return prev === next ? prev : next;
    });
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const codeContainer = codeContainerRef.current;

    if (!root || !codeContainer) {
      return;
    }

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(root);
    resizeObserver.observe(codeContainer);

    const mutationObserver = new MutationObserver(measure);
    mutationObserver.observe(codeContainer, { childList: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [measure]);

  return { rootRef, codeContainerRef, hasOverflow };
}
