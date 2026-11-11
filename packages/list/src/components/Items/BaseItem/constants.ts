import { CheckboxProps } from '@ds/toggles';

import { Size } from '../../../types';

export const TOGGLE_SIZE_MAP: Record<Size, NonNullable<CheckboxProps['size']>> = {
  s: 'xs',
  m: 's',
  l: 's',
};

export const CHECKBOX_SIZE_MAP = {
  s: 'xs',
  m: 'xs',
  l: 's',
} as const;
