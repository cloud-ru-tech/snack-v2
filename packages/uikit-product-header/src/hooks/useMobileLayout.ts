import { LAYOUT_TYPE, useAdaptiveLayout } from '@ds/adaptive';

export function useMobileLayout() {
  const { layoutType } = useAdaptiveLayout();

  // Осознанное исключение из isMobileLayout: desktop-шапка не помещается на tablet и desktopSmall
  return layoutType !== LAYOUT_TYPE.Desktop;
}
