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
  // Стартует с `isOpen`: у раскрытого при маунте блока контент уже смонтирован, и эффект не должен
  // добавлять лишний рендер, переключая флаг.
  const [keepMountedWhileClosing, setKeepMountedWhileClosing] = useState(isOpen);
  const isMounted = isOpen || keepMounted || keepMountedWhileClosing;
  const [isCompletelyOpen, setIsCompletelyOpen] = useState(isOpen);
  const [isCompletelyClose, setIsCompletelyClose] = useState(!isOpen);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRunRef = useRef(true);

  useEffect(() => {
    // Начальные флаги уже согласованы с `isOpen`, анимировать нечего: без этого каждый блок при
    // маунте ставил таймер на `ANIMATION_DURATION` ради setState с тем же значением.
    if (isFirstRunRef.current) {
      isFirstRunRef.current = false;
      return;
    }

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
