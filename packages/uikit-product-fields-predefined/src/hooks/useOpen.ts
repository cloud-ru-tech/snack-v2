import { useCallback, useMemo, useState } from 'react';

export function useOpen(defaultState = false) {
  const [isOpen, setIsOpen] = useState(defaultState);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  return useMemo(
    () => ({
      isOpen,
      onClose,
      onOpen,
    }),
    [isOpen, onClose, onOpen],
  );
}
