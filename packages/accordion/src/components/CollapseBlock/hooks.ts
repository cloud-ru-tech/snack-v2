import { useToggleGroup } from '@design-system/toggles';
import { useEffect, useRef, useState } from 'react';

import { ANIMATION_DURATION } from '../../constants';

type UseCollapseStateProps = {
  id: string;
  keepMounted?: boolean;
};

export function useCollapseState({ id, keepMounted = false }: UseCollapseStateProps) {
  const { isChecked: isOpen, handleClick: toggleOpen } = useToggleGroup({ value: id });
  const [isMounted, setIsMounted] = useState(isOpen || keepMounted);
  const [isCompletelyOpen, setIsCompletelyOpen] = useState(isOpen);
  const [isCompletelyClose, setIsCompletelyClose] = useState(!isOpen);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsCompletelyClose(false);
      timeoutRef.current = setTimeout(() => {
        setIsCompletelyOpen(true);
      }, ANIMATION_DURATION);
    } else {
      setIsCompletelyOpen(false);
      timeoutRef.current = setTimeout(() => {
        setIsCompletelyClose(true);
        !keepMounted && setIsMounted(false);
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
