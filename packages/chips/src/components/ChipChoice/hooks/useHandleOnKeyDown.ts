import { KeyboardEvent, KeyboardEventHandler, useCallback } from 'react';

type UseHandleOnKeyDownProps = {
  setOpen(open: boolean): void;
};

export function useHandleOnKeyDown({ setOpen }: UseHandleOnKeyDownProps) {
  return useCallback(
    (onKeyDown?: KeyboardEventHandler<HTMLElement>) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        e.stopPropagation();
      } else {
        onKeyDown?.(e);
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setOpen(false);
      }

      if (e.key === 'Tab') {
        setOpen(false);
      }
    },
    [setOpen],
  );
}
