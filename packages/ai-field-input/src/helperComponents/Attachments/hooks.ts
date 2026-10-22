import { RefObject, useCallback, useEffect, useState } from 'react';

type ScrollEdges = {
  canScrollLeft: boolean;
  canScrollRight: boolean;
};

export function useScrollEdges(ref: RefObject<HTMLElement | null>, enabled: boolean): ScrollEdges & { update(): void } {
  const [edges, setEdges] = useState<ScrollEdges>({ canScrollLeft: false, canScrollRight: false });

  const update = useCallback(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const maxScrollLeft = element.scrollWidth - element.clientWidth;

    setEdges({
      canScrollLeft: element.scrollLeft > 0,
      canScrollRight: element.scrollLeft < maxScrollLeft - 1,
    });
  }, [ref]);

  useEffect(() => {
    const element = ref.current;

    if (!enabled || !element) {
      return;
    }

    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);
    Array.from(element.children).forEach(child => resizeObserver.observe(child));

    const mutationObserver = new MutationObserver(update);
    mutationObserver.observe(element, { childList: true, subtree: true });

    element.addEventListener('scroll', update, { passive: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      element.removeEventListener('scroll', update);
    };
  }, [ref, update, enabled]);

  return { ...edges, update };
}
