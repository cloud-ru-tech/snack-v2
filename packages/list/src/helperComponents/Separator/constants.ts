import { ButtonProps } from '@ds/button';

import { Size } from '../../types';

// @ds/button пока без выделенного ButtonFunction и размера `xs` (Phase 5 cross-package blocker):
// маппим размеры списка на ближайшие доступные `Button` size.
export const SELECT_BUTTON_SIZE_MAP: Record<Size, ButtonProps['size']> = {
  s: 's',
  m: 's',
  l: 'm',
};
