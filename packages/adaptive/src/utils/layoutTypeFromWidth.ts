import { ADAPTIVE_BREAKPOINT, AdaptiveBreakpoints } from '../constants/adaptive';
import { LAYOUT_TYPE, LayoutType } from '../types';

export function layoutTypeFromWidth(width: number, breakpoints?: AdaptiveBreakpoints): LayoutType {
  const mergedBreakpoints = { ...ADAPTIVE_BREAKPOINT, ...breakpoints };

  if (width <= mergedBreakpoints.mobile) {
    return LAYOUT_TYPE.Mobile;
  }

  if (width <= mergedBreakpoints.tablet) {
    return LAYOUT_TYPE.Tablet;
  }

  if (width <= mergedBreakpoints.desktopSmall) {
    return LAYOUT_TYPE.DesktopSmall;
  }

  return LAYOUT_TYPE.Desktop;
}
