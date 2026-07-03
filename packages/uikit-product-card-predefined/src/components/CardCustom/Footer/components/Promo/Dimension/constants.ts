import { RADIUS, Size } from '@ds/card';
import { TypographySize } from '@ds/typography';

export const TYPOGRAPHY_SIZE_MAP: Record<Size, TypographySize> = {
  [RADIUS.S]: 'm',
  [RADIUS.M]: 'm',
  [RADIUS.L]: 'l',
};
