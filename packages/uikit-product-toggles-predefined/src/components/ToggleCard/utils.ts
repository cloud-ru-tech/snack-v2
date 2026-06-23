import { SIZE as ICON_SIZE, Size as IconSize } from '@ds/icon-predefined';

import { SIZE } from '../../constants';
import { Emblem, EmblemPicture, Size } from '../../types';

/**
 * Эмблема масштабируется вместе с карточкой (как в продуктовом ките):
 * размер `IconPredefined` выводится из `size` карточки, а не задаётся снаружи.
 */
export function sizeToEmblemSize(size: Size): IconSize {
  switch (size) {
    case SIZE.S:
      return ICON_SIZE.M;
    case SIZE.L:
      return ICON_SIZE['5XL'];
    case SIZE.M:
    default:
      return ICON_SIZE.L;
  }
}

export function isEmblemPicture(emblem: Emblem): emblem is EmblemPicture {
  return 'src' in emblem;
}
