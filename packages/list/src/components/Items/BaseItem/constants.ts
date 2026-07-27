import { CheckboxProps } from '@ds/toggles';

import { Size } from '../../../types';

// Размер toggle-контрола по размеру item'а (Figma listItem). Тип держит карту полной.
export const TOGGLE_SIZE_MAP: Record<Size, NonNullable<CheckboxProps['size']>> = {
  s: 'xs',
  m: 's',
  l: 's',
};
