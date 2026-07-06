import { useCallback, useEffect } from 'react';

import { getFirstEmptyCellIndex } from '../utils';

type UseFieldHelpersParams = {
  onChangeCode(code: string): void;
  moveFocus(index: number): void;
  isMobile?: boolean;
  showEmptyChars?: boolean;
  code: readonly string[];
  codeLength: number;
};

export function useFieldHelpers(params: UseFieldHelpersParams) {
  const { onChangeCode, moveFocus, isMobile = false, showEmptyChars, code, codeLength } = params;

  const resetCode = useCallback(() => {
    onChangeCode('');

    if (!isMobile) {
      moveFocus(0);
    }
  }, [isMobile, moveFocus, onChangeCode]);

  useEffect(() => {
    if (!isMobile) {
      moveFocus(0);
    }
  }, [isMobile, moveFocus]);

  useEffect(() => {
    if (isMobile || !showEmptyChars) {
      return;
    }

    const emptyIndex = getFirstEmptyCellIndex(code);
    if (emptyIndex >= 0) {
      moveFocus(emptyIndex);
    }
    // Фокус перемещается только при включении подсветки или смене длины кода, не на каждый ввод.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEmptyChars, isMobile, moveFocus, codeLength]);

  return { resetCode };
}
