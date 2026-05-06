import { useCallback, useEffect, useRef, useState } from 'react';

import { copyToClipboard } from '../utils';

const CHECKED_DURATION_MS = 1000;

export function useCopyToClipboard() {
  const [isChecked, setIsChecked] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const copy = useCallback((value: string) => {
    if (!value) return;
    copyToClipboard(value).catch(() => undefined);
    setIsChecked(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsChecked(false), CHECKED_DURATION_MS);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );

  return { isChecked, copy };
}
