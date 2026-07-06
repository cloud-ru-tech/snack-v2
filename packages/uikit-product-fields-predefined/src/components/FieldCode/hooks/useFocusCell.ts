import { useCallback, useRef } from 'react';

export function useFocusCell(codeLength: number) {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const focusInput = useCallback((index: number) => {
    inputsRef.current[index]?.focus();
  }, []);

  const moveFocus = useCallback(
    (newIndex: number) => {
      if (newIndex >= 0 && newIndex < codeLength) {
        focusInput(newIndex);
      }
    },
    [codeLength, focusInput],
  );

  const blurFields = useCallback(() => {
    inputsRef.current.forEach(input => {
      input?.blur();
    });
  }, []);

  return { inputsRef, moveFocus, blurFields };
}
