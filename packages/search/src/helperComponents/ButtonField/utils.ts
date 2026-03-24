import { SIZE } from '../../constants';
import { Size } from '../../types';

export function getIconSize(size?: Size) {
  switch (size) {
    case SIZE.S: {
      return 16;
    }
    case SIZE.M:
    case SIZE.L:
    default: {
      return 24;
    }
  }
}
