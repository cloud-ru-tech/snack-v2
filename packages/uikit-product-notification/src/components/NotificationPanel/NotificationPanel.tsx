import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { DrawerCustom, DrawerCustomProps, POSITION, WIDTH } from '@ds/drawer';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactElement } from 'react';

import { NotificationPanelContent, NotificationPanelContentProps } from '../NotificationPanelContent';
import styles from './styles.module.scss';

type SharedOverlayProps = Pick<
  DrawerCustomProps,
  'open' | 'onClose' | 'className' | 'rootClassName' | 'showBlackout' | 'container' | 'closeOnPopstate'
>;

/**
 * Только desktop: `position` и `width` применяются лишь к Drawer-поверхности
 * (desktop). На mobile (BottomSheet) молча игнорируются.
 */
export type NotificationPanelProps = WithSupportProps<
  {
    /** Контент панели (`NotificationPanelContent`), отображаемый внутри обёртки */
    content: ReactElement<NotificationPanelContentProps, typeof NotificationPanelContent>;
  } & SharedOverlayProps &
    Partial<Pick<DrawerCustomProps, 'position' | 'width'>>
>;

/**
 * Адаптивная обёртка панели уведомлений. Рендерит `NotificationPanelContent` в `DrawerCustom`, который сам
 * авто-свапается по `AdaptiveProvider`: на desktop — дровер, на mobile — bottom-sheet. Композит НЕ
 * выбирает поверхность сам (канон adaptive-components: swap у `DrawerCustom`) — контекст читается лишь
 * для surface-специфичного класса обёртки (на дровере нужен `height: 100%`, на sheet — нет).
 * `position`/`width` — desktop-only (на mobile-поверхности игнорируются самим дровером).
 */
export function NotificationPanel({
  content,
  position = POSITION.Right,
  width = WIDTH.S,
  className,
  showBlackout,
  ...rest
}: NotificationPanelProps) {
  const { layoutType } = useAdaptiveLayout();
  const surfaceClassName = isMobileLayout(layoutType) ? styles.notificationPanelSheet : styles.notificationPanelDrawer;

  return (
    <DrawerCustom
      position={position}
      width={width}
      className={cn(surfaceClassName, className)}
      showBlackout={showBlackout}
      {...rest}
    >
      {content}
    </DrawerCustom>
  );
}
