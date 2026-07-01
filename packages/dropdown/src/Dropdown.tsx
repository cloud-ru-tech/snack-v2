import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';

import { DesktopDropdown } from './helperComponents/DesktopDropdown';
import { MobileDropdown } from './helperComponents/MobileDropdown';
import { DropdownProps } from './types';

/**
 * Адаптивный Dropdown. Раскладку берёт из `AdaptiveProvider` (контекст): на `mobile` рендерит
 * `BottomSheet`, иначе — desktop-popover. Публичный API единый; форс платформы — через
 * `<AdaptiveProvider layoutType=…>` / `withLayoutType` (см. `@ds/adaptive`), пропа `layoutType` нет.
 */
export function Dropdown(props: DropdownProps) {
  const { layoutType } = useAdaptiveLayout();

  return isMobileLayout(layoutType) ? <MobileDropdown {...props} /> : <DesktopDropdown {...props} />;
}
