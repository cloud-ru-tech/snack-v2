import { RADIUS, Size } from '@ds/card';
import { TypographySize } from '@ds/typography';

export const TITLE_SIZE_MAP: Record<Size, TypographySize> = {
  [RADIUS.S]: 's',
  [RADIUS.M]: 'm',
  [RADIUS.L]: 'l',
};

export const DESCRIPTION_SIZE_MAP: Record<Size, TypographySize> = {
  [RADIUS.S]: 'm',
  [RADIUS.M]: 'm',
  [RADIUS.L]: 'l',
};

export const TRUNCATE_DEFAULTS = {
  title: 1,
  description: 2,
  metadata: 1,
};
