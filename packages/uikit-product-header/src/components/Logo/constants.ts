import { PromoTagProps } from '@ds/promo-tag';
import { ValueOf } from '@ds/utils';

export const HEADER_LOGO_MODE = {
  Develop: 'develop',
  Stage: 'stage',
  Hybrid: 'hybrid',
  Prod: 'prod',
} as const;

export type HeaderLogoMode = ValueOf<typeof HEADER_LOGO_MODE>;

export const MAP_LOGO_MODE_TO_APPEARANCE: Record<Exclude<HeaderLogoMode, 'prod'>, PromoTagProps['appearance']> = {
  [HEADER_LOGO_MODE.Develop]: 'blue',
  [HEADER_LOGO_MODE.Stage]: 'orange',
  [HEADER_LOGO_MODE.Hybrid]: 'violet',
} as const;
