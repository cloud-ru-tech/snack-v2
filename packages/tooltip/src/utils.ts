import { SIZE } from './constants';
import { Size } from './types';

export function getIconSize(size?: Size) {
  switch (size) {
    case SIZE.XS: {
      return 16;
    }
    case SIZE.S:
    default: {
      return 24;
    }
  }
}
