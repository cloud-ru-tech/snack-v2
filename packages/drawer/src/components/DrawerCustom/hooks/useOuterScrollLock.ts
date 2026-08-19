import { isBrowser } from '@ds/utils';
import { useEffect, useState } from 'react';

/** Атрибут, которым `react-remove-scroll-bar` помечает `body` на время активного лока. */
const SCROLL_LOCK_ATTRIBUTE = 'data-scroll-locked';

/**
 * Есть ли снаружи чужой scroll-lock (модалка, из которой открыли дровер).
 *
 * Такой лок гасит колесо и touchmove вне своего поддерева, а дровер живёт в отдельном портале —
 * без собственного лока поверх него тело дровера не прокручивается. Свой лок нужен только в этом
 * случае: без блэкаута и без внешнего лока страница под дровером должна скроллиться.
 */
export function useOuterScrollLock(open: boolean): boolean {
  const [outerLock, setOuterLock] = useState(false);

  useEffect(() => {
    if (!open || !isBrowser()) {
      setOuterLock(false);

      return;
    }

    // Свой лок дровера идёт с `removeScrollBar: false` и этот атрибут не ставит — самовозбуждения нет.
    const readLock = () => setOuterLock(document.body.hasAttribute(SCROLL_LOCK_ATTRIBUTE));

    readLock();

    const observer = new MutationObserver(readLock);
    observer.observe(document.body, { attributes: true, attributeFilter: [SCROLL_LOCK_ATTRIBUTE] });

    return () => observer.disconnect();
  }, [open]);

  return outerLock;
}
