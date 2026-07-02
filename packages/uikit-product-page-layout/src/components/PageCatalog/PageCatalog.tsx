import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';

import { DesktopActions } from '../Actions';
import { DesktopPageCatalog, DesktopPageCatalogProps } from './DesktopPageCatalog';
import { MobilePageCatalog, MobilePageCatalogProps } from './MobilePageCatalog';

export type PageCatalogProps = Omit<DesktopPageCatalogProps, 'actions'> &
  Pick<MobilePageCatalogProps, 'actions' | 'maxVisibleActionsItems'>;

/**
 * Адаптивный `PageCatalog`: раскладку берёт из `AdaptiveProvider` (контекст). На `mobile` рендерит
 * `MobilePageCatalog` со структурированными `actions`; на остальных раскладках оборачивает `actions`
 * в `DesktopActions` и отдаёт `DesktopPageCatalog`. Форс платформы — `withLayoutType` / вложенный
 * `<AdaptiveProvider layoutType=…>`; пропа `layoutType` у компонента нет.
 */
export function PageCatalog({ actions, maxVisibleActionsItems, ...props }: PageCatalogProps) {
  const { layoutType } = useAdaptiveLayout();

  if (isMobileLayout(layoutType)) {
    return <MobilePageCatalog actions={actions} maxVisibleActionsItems={maxVisibleActionsItems} {...props} />;
  }

  const actionsNode = actions ? <DesktopActions items={actions} /> : undefined;

  return <DesktopPageCatalog {...props} actions={actionsNode} />;
}

PageCatalog.displayName = 'PageCatalog';
