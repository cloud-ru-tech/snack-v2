import { useUncontrolledProp } from '@ds/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseAnimatedOpeningProps = {
  defaultOpen?: boolean;
  onOpenChanged?(open: boolean): void;
  /** Длительность анимации раскрытия/схлопывания, мс. */
  duration: number;
};

type UseAnimatedOpeningResult = {
  open: boolean;
  /**
   * Карточки стопки остаются в DOM на время анимации схлопывания, чтобы успел
   * проиграться transition. Сбрасывается в `false` через `duration` после закрытия.
   */
  isVisible: boolean;
  toggleOpen(): void;
};

export function useAnimatedOpening({
  defaultOpen = false,
  onOpenChanged,
  duration,
}: UseAnimatedOpeningProps): UseAnimatedOpeningResult {
  const [open, setOpen] = useUncontrolledProp(undefined, defaultOpen, onOpenChanged);
  const [isVisible, setIsVisible] = useState(open);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const toggleOpen = useCallback(() => setOpen(!open), [open, setOpen]);

  useEffect(() => {
    clearTimeout(timeout.current);

    if (open) {
      setIsVisible(true);
    } else {
      timeout.current = setTimeout(() => setIsVisible(false), duration);
    }

    return () => clearTimeout(timeout.current);
  }, [open, duration]);

  return { open, isVisible, toggleOpen };
}
