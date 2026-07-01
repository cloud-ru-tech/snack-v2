import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';

import { DesktopDrawer } from '../../helperComponents/DesktopDrawer';
import { MobileDrawer } from '../../helperComponents/MobileDrawer';
import { DrawerProps } from './types';

/**
 * Адаптивный Drawer. Раскладка из `AdaptiveProvider`: на `mobile` — `BottomSheet`, иначе —
 * desktop-панель. Форс — `<AdaptiveProvider layoutType=…>` / `withLayoutType`.
 */
export function Drawer(props: DrawerProps) {
  const { layoutType } = useAdaptiveLayout();

  return isMobileLayout(layoutType) ? <MobileDrawer {...props} /> : <DesktopDrawer {...props} />;
}
