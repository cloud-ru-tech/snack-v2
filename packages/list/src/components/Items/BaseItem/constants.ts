import { CheckboxProps } from '@ds/toggles';

// Figma listItem multiple-mode checkbox sizing (каноническая матрица 27832:59174 / 27862:48137):
//   s    → toggles size xs (surface 16px), контейнер 16
//   m, l → toggles size s  (surface 20px), контейнер 24 (контрол центрируется внутри)
export const CHECKBOX_SIZE_MAP: Record<string, CheckboxProps['size']> = {
  s: 'xs',
  m: 's',
  l: 's',
};
