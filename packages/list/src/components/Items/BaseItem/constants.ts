import { CheckboxProps } from '@ds/toggles';

import { Size } from '../../../types';

export const TOGGLE_SIZE_MAP: Record<Size, NonNullable<CheckboxProps['size']>> = {
  s: 'xs',
  m: 's',
  l: 's',
};
