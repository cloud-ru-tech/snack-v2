import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';

import { DesktopPageForm } from './DesktopPageForm';
import { MobilePageForm } from './MobilePageForm';
import { DesktopPageFormProps } from './types';

export type PageFormProps = DesktopPageFormProps;

/**
 * Адаптивный `PageForm`: раскладку берёт из `AdaptiveProvider` (контекст). На `mobile` рендерит
 * `MobilePageForm` (sticky-футер, bottom-sheet для sideBlock / price-summary), на остальных
 * раскладках — `DesktopPageForm`. Форс платформы — `withLayoutType` / вложенный
 * `<AdaptiveProvider layoutType=…>`; пропа `layoutType` у компонента нет.
 */
export function PageForm(props: PageFormProps) {
  const { layoutType } = useAdaptiveLayout();

  if (isMobileLayout(layoutType)) {
    return <MobilePageForm {...props} />;
  }

  return <DesktopPageForm {...props} />;
}

PageForm.displayName = 'PageForm';
