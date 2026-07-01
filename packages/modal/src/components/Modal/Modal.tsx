import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';

import { DesktopModal } from '../../helperComponents/DesktopModal';
import { MobileModal } from '../../helperComponents/MobileModal';
import { ModalProps } from './types';

/**
 * Адаптивное модальное окно. Раскладка из `AdaptiveProvider`: на `mobile` — `BottomSheet`,
 * иначе — desktop-модалка. Форс — `<AdaptiveProvider layoutType=…>` / `withLayoutType`.
 */
export function Modal(props: ModalProps) {
  const { layoutType } = useAdaptiveLayout();

  return isMobileLayout(layoutType) ? <MobileModal {...props} /> : <DesktopModal {...props} />;
}
