import { useCallback, useEffect, useRef, useState } from 'react';

import { copyToClipboard } from '../utils/copyToClipboard';

const DEFAULT_CHECKED_DURATION_MS = 1000;

/**
 * Хук для копирования значения в буфер обмена и визуального подтверждения действия.
 * @function React hook
 * @param durationMs - Продолжительность отображения иконки подтверждения в миллисекундах. По-умолчанию 1000 мс.
 */
export function useCopyToClipboard(durationMs = DEFAULT_CHECKED_DURATION_MS): {
  isChecked: boolean;
  copy: (value: string) => void;
} {
  const [isChecked, setIsChecked] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const copy = useCallback(
    (value: string) => {
      if (!value) return;
      copyToClipboard(value).catch(() => undefined);
      setIsChecked(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsChecked(false), durationMs);
    },
    [durationMs],
  );

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );

  return { isChecked, copy };
}
