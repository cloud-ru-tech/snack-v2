import { useToggleGroup } from '@ds/toggles';
import { useEffect, useRef, useState } from 'react';

import { ANIMATION_DURATION } from '../../constants';

type UseCollapseStateProps = {
  id: string;
  keepMounted?: boolean;
};

export function useCollapseState({ id, keepMounted = false }: UseCollapseStateProps) {
  const { isChecked: isOpen, handleClick: toggleOpen } = useToggleGroup({ value: id });
  // Контент доживает до конца закрывающей анимации, но при открытии появляется синхронно с
  // `isOpen` — если монтировать его эффектом, первый кадр раскрытия считается по пустому телу
  // и высота стартует рывком.
  const [keepMountedWhileClosing, setKeepMountedWhileClosing] = useState(false);
  const isMounted = isOpen || keepMounted || keepMountedWhileClosing;
  const [isCompletelyOpen, setIsCompletelyOpen] = useState(isOpen);
  const [isCompletelyClose, setIsCompletelyClose] = useState(!isOpen);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setKeepMountedWhileClosing(true);
      setIsCompletelyClose(false);
      timeoutRef.current = setTimeout(() => {
        setIsCompletelyOpen(true);
      }, ANIMATION_DURATION);
    } else {
      setIsCompletelyOpen(false);
      timeoutRef.current = setTimeout(() => {
        setIsCompletelyClose(true);
        setKeepMountedWhileClosing(false);
      }, ANIMATION_DURATION);
    }

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [isOpen, keepMounted]);

  return {
    isOpen,
    isMounted,
    toggleOpen,
    isCompletelyOpen,
    isCompletelyClose,
  };
}
