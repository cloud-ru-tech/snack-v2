import { ADAPTIVE_BREAKPOINT, AdaptiveBreakpoints, buildAdaptiveQueries } from '../constants/adaptive';
import { LAYOUT_TYPE } from '../types/layoutTypes';

export function getLayoutBootstrapScript(breakpoints?: AdaptiveBreakpoints): string {
  const queries = buildAdaptiveQueries({ ...ADAPTIVE_BREAKPOINT, ...breakpoints });

  return `(function(){try{var d=document.documentElement;if(matchMedia('${queries.isMobile}').matches){d.dataset.layoutType='${LAYOUT_TYPE.Mobile}';}else if(matchMedia('${queries.isTablet}').matches){d.dataset.layoutType='${LAYOUT_TYPE.Tablet}';}else if(matchMedia('${queries.isSmallDesktop}').matches){d.dataset.layoutType='${LAYOUT_TYPE.DesktopSmall}';}else{d.dataset.layoutType='${LAYOUT_TYPE.Desktop}';}}catch(e){}})();`;
}
