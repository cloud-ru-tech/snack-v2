import { CheckboxProps } from '@ds/toggles';

// Figma listItem toggle-control sizing (checkbox multiple-mode + switch): у Checkbox и Switch
// общий размерный ряд (xs/s), поэтому карта одна.
//   s    → toggles size xs (surface 16px), контейнер 16
//   m, l → toggles size s  (surface 20px), контейнер 24 (контрол центрируется внутри)
export const TOGGLE_SIZE_MAP: Record<string, CheckboxProps['size']> = {
  s: 'xs',
  m: 's',
  l: 's',
};
