import { ADAPTIVE_QUERY } from '../constants/adaptive';
import { AdaptiveQuery, MatchMediaGeneric } from '../types/adaptive';
import { LAYOUT_TYPE, LayoutType } from '../types/layoutTypes';

/** Каскад `layoutType` по adaptive media-query (без учёта user-agent). */
export function layoutTypeFromMatchMedia(matchMedia: MatchMediaGeneric<AdaptiveQuery>): LayoutType {
  if (matchMedia[ADAPTIVE_QUERY.IsMobile]) {
    return LAYOUT_TYPE.Mobile;
  }

  if (matchMedia[ADAPTIVE_QUERY.IsTablet]) {
    return LAYOUT_TYPE.Tablet;
  }

  if (matchMedia[ADAPTIVE_QUERY.IsSmallDesktop]) {
    return LAYOUT_TYPE.DesktopSmall;
  }

  return LAYOUT_TYPE.Desktop;
}
