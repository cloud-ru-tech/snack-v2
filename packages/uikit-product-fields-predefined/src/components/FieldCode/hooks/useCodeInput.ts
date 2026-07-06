import { useValueControl } from '@ds/utils';
import { ClipboardEvent, KeyboardEvent, useCallback, useEffect } from 'react';

import { ZERO_WIDTH_SPACE } from '../constants';
import { isNumberChar, isStringCodeLength, isZeroWidthSpace } from '../utils';
import { useRefState } from './useRefState';

export type UseCodeInputParams = {
  /** Количество цифр в коде (целое ≥ 1) */
  codeLength: number;
  /** Значение кода */
  value?: string;
  /** Колбек изменения значения */
  onChange?(code: string): void;
  /** Функция переноса фокуса на ячейку с индексом `index` */
  moveFocus(index: number): void;
  /** Колбек ввода всех символов кода */
  onComplete?(code: string): void;
};

const buildCodeArray = (str: string, codeLength: number) =>
  Array.from({ length: codeLength }, (_, idx) => str[idx] || ZERO_WIDTH_SPACE);

export function useCodeInput(params: UseCodeInputParams) {
  const { value: valueProp, onChange: onChangeProp, codeLength, moveFocus, onComplete } = params;

  const [value = '', onChange] = useValueControl<string>({
    value: valueProp,
    onChange: onChangeProp,
    defaultValue: '',
  });

  const codeRef = useRefState<string[]>(buildCodeArray(value, codeLength));

  const updateCodeByIndex = useCallback(
    (index: number, newChar: string) => {
      codeRef.current[index] = newChar;
      onChange?.(codeRef.current.join(''));
    },
    [codeRef, onChange],
  );

  const updateFullCode = useCallback(
    (newCode: string) => {
      codeRef.current = newCode.split('');

      onChange?.(newCode);
      moveFocus(codeLength - 1);
      onComplete?.(newCode);
    },
    [codeLength, codeRef, moveFocus, onChange, onComplete],
  );

  const handleAfterCellUpdate = useCallback(
    (index: number) => {
      const normalizedCode = codeRef.current.join('');

      const isLastInput = index === codeLength - 1;
      const isAllInputsFilled = isStringCodeLength(normalizedCode, codeLength);
      if (!isLastInput) {
        moveFocus(index + 1);
      } else if (isAllInputsFilled) {
        onComplete?.(normalizedCode);
      }
    },
    [codeLength, codeRef, moveFocus, onComplete],
  );

  const deleteChar = useCallback(
    (index: number) => {
      if (codeRef.current[index] && !isZeroWidthSpace(codeRef.current[index])) {
        updateCodeByIndex(index, ZERO_WIDTH_SPACE);
      } else if (index > 0) {
        moveFocus(index - 1);
      }
    },
    [codeRef, moveFocus, updateCodeByIndex],
  );

  const onAutoCompleteInput = useCallback(
    (code: string, index: number) => {
      if (isStringCodeLength(code, codeLength)) {
        updateFullCode(code);
        return;
      }

      if (!isNumberChar(code)) {
        return;
      }

      updateCodeByIndex(index, code);
      handleAfterCellUpdate(index);
    },
    [codeLength, handleAfterCellUpdate, updateCodeByIndex, updateFullCode],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, index: number) => {
      switch (e.key) {
        case 'ArrowLeft':
          moveFocus(index - 1);
          break;
        case 'ArrowRight':
          moveFocus(index + 1);
          break;
        case 'Backspace':
          deleteChar(index);
          break;
        default:
          if (isNumberChar(e.key)) {
            e.preventDefault();
            updateCodeByIndex(index, e.key);
            handleAfterCellUpdate(index);
          }
          break;
      }
    },
    [deleteChar, handleAfterCellUpdate, moveFocus, updateCodeByIndex],
  );

  const onPaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      const codeInput = e?.clipboardData.getData('text') ?? '';
      if (!isStringCodeLength(codeInput, codeLength)) {
        return;
      }

      updateFullCode(codeInput);
    },
    [codeLength, updateFullCode],
  );

  useEffect(() => {
    codeRef.current = buildCodeArray(value, codeLength);
  }, [codeLength, codeRef, value]);

  return {
    code: codeRef.current,
    cellHandlers: {
      onKeyDown,
      onPaste,
      onChange: onAutoCompleteInput,
    },
    onChangeCode: onChange,
  };
}
