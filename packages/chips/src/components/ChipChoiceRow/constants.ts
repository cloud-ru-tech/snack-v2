import { ButtonProps } from '@ds/button';

import { SIZE } from '../../constants';

export const MAP_ROW_SIZE_TO_BUTTON_SIZE: Record<string, ButtonProps['size']> = {
  [SIZE.S]: 's',
  [SIZE.M]: 'm',
  [SIZE.L]: 'm',
};
