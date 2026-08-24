import {
  AdvancedSVG,
  EvolutionSVG,
  MarketplaceSVG,
  MlSpaceSVG,
  PartnerAccountSVG,
  VmwareSVG,
} from '@ds/icons/services';

import { getPlatformIconComponent } from './Container';

export const AdvancedPlatformLogo = getPlatformIconComponent(AdvancedSVG);
export const EnterprisePlatformLogo = getPlatformIconComponent(VmwareSVG);
export const EvolutionPlatformLogo = getPlatformIconComponent(EvolutionSVG);
export const MLSpacePlatformLogo = getPlatformIconComponent(MlSpaceSVG);
export const PartnerPlatformLogo = getPlatformIconComponent(PartnerAccountSVG);
export const MarketplacePlatformLogo = getPlatformIconComponent(MarketplaceSVG);
