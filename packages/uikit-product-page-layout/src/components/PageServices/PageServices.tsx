import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';

import { DesktopActions } from '../Actions';
import { DesktopPageServices } from './DesktopPageServices';
import { MobilePageServices, MobilePageServicesProps } from './MobilePageServices';
import { DesktopPageServicesProps } from './types';

export type PageServicesProps = Omit<DesktopPageServicesProps, 'actions'> &
  Pick<MobilePageServicesProps, 'actions' | 'maxVisibleActionsItems'>;

/**
 * Адаптивный `PageServices`: раскладку берёт из `AdaptiveProvider` (контекст). На `mobile` рендерит
 * `MobilePageServices` и передаёт `actions` структурированным массивом; на остальных раскладках
 * оборачивает `actions` в `DesktopActions` и отдаёт `DesktopPageServices` через слот `actions`.
 * Форс платформы — `withLayoutType` / вложенный `<AdaptiveProvider layoutType=…>`; пропа
 * `layoutType` у компонента нет.
 */
export function PageServices({ actions, maxVisibleActionsItems, ...props }: PageServicesProps) {
  const { layoutType } = useAdaptiveLayout();

  if (isMobileLayout(layoutType)) {
    return <MobilePageServices actions={actions} maxVisibleActionsItems={maxVisibleActionsItems} {...props} />;
  }

  const actionsNode = actions ? <DesktopActions items={actions} /> : undefined;

  return <DesktopPageServices {...props} actions={actionsNode} />;
}

PageServices.displayName = 'PageServices';
