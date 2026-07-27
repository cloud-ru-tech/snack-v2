import { FieldComboProps } from '@ds/fields';

import { ZERO_WIDTH_SPACE } from './constants';

export const isNumberChar = (char: string) => /^\d$/.test(char);
export const isStringCodeLength = (input: string, codeLength: number) => new RegExp(`^\\d{${codeLength}}$`).test(input);
export const isZeroWidthSpace = (value: string) => value === ZERO_WIDTH_SPACE;

export function getFirstEmptyCellIndex(code: readonly string[]): number {
  return code.findIndex(isZeroWidthSpace);
}

export const getCellValidationState = (
  value: string,
  showEmptyChars?: boolean,
  error?: boolean,
): FieldComboProps['validationState'] => {
  if (showEmptyChars) {
    return isZeroWidthSpace(value) ? 'error' : 'default';
  }

  return error ? 'error' : 'default';
};
