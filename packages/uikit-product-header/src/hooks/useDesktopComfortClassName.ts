import { DENSITY, useThemeClassnames } from '@ds/theme';

import { useMobileLayout } from './useMobileLayout';

/** Класс плотности comfort для выпадающих списков шапки на desktop; на mobile остаётся compact из темы. */
export function useDesktopComfortClassName() {
  const isMobile = useMobileLayout();
  const comfortClassName = useThemeClassnames({ density: DENSITY.Comfort });

  return isMobile ? undefined : comfortClassName;
}
