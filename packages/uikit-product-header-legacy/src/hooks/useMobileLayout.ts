import { LAYOUT_TYPE, useAdaptiveLayout } from '@ds/adaptive';

export function useMobileLayout() {
  const { layoutType } = useAdaptiveLayout();

  return layoutType !== LAYOUT_TYPE.Desktop;
}
