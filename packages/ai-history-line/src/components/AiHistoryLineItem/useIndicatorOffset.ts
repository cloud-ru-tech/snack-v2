import { useLayoutEffect } from '@ds/utils';
import { RefObject, useState } from 'react';

import { measureIndicatorOffset } from './utils';

export function useIndicatorOffset(
  itemRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  revision: unknown,
) {
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    const item = itemRef.current;
    const content = contentRef.current;

    if (!item || !content) return;

    let cancelled = false;

    const measure = () => {
      if (cancelled) return;

      const next = measureIndicatorOffset(item, content);
      setOffset(current => (current === next ? current : next));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(content);

    document.fonts?.ready.then(measure);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [contentRef, itemRef, revision]);

  return offset;
}
