import { useMemo, useRef } from 'react';

import styles from '../styles.module.scss';

export function useHighlight() {
  const element = useRef<HTMLElement>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  return useMemo(
    () => (elementToHighlight?: HTMLElement | null) => {
      if (elementToHighlight) {
        element.current = elementToHighlight;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        element.current?.classList.add(styles.highlight);

        setTimeout(() => {
          element.current?.classList.remove(styles.highlight);
          element.current = undefined;
        }, 300);
      }, 80);
    },
    [],
  );
}
