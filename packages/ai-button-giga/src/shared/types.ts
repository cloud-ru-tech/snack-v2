import { ReactNode } from 'react';

import { BaseGigaButtonProps, IconPosition, Size } from '../types';

export type GigaButtonProps = BaseGigaButtonProps & {
  label?: string;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  size: Size;
  view: 'outline' | 'function' | 'mama';
  rootTestId: string;
};
