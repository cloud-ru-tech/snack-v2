import { ReactNode } from 'react';

import { ICON_POSITION } from './constants';
import { IconPosition } from './types';

export function getLayout(
  icon: ReactNode | undefined,
  label: string | undefined,
  iconPosition: IconPosition = ICON_POSITION.Before,
): 'label-only' | 'icon-before' | 'icon-after' | 'icon-only' {
  if (icon && label) {
    return iconPosition === ICON_POSITION.After ? 'icon-after' : 'icon-before';
  }

  if (label) {
    return 'label-only';
  }

  return 'icon-only';
}
