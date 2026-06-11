import { BottomSheetCustom } from '@ds/bottom-sheet';
import { DrawerCustom, DrawerCustomProps, POSITION, WIDTH } from '@ds/drawer';
import { LAYOUT_TYPE, LayoutType, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactElement } from 'react';

import { NotificationPanel, NotificationPanelProps } from '../NotificationPanel';
import styles from './styles.module.scss';

type SharedOverlayProps = Pick<
  DrawerCustomProps,
  'open' | 'onClose' | 'className' | 'rootClassName' | 'showBlackout' | 'container' | 'closeOnPopstate'
>;

export type NotificationPanelPopoverProps = WithSupportProps<
  {
    /** Контент панели (`NotificationPanel`), отображаемый внутри обёртки */
    content: ReactElement<NotificationPanelProps, typeof NotificationPanel>;
    /**
     * Тип раскладки. `desktop` → Drawer (Figma `notificationDrawer`),
     * `mobile` → BottomSheet (Figma `notificationBottomSheet`).
     * @default 'desktop'
     */
    layoutType?: LayoutType;
  } & SharedOverlayProps &
    /** Только для desktop / Drawer. */
    Partial<Pick<DrawerCustomProps, 'position' | 'width'>>
>;

/**
 * Адаптивная обёртка панели уведомлений. На десктопе открывает `NotificationPanel`
 * в дровере, на мобилке — в bottom-sheet'е (выбор по `layoutType`, как у `Widget`/`Toolbar`).
 */
export function NotificationPanelPopover({
  content,
  layoutType = LAYOUT_TYPE.Desktop,
  position = POSITION.Right,
  width = WIDTH.S,
  className,
  showBlackout,
  ...rest
}: NotificationPanelPopoverProps) {
  if (layoutType === LAYOUT_TYPE.Mobile) {
    return (
      <BottomSheetCustom className={cn(styles.notificationPanelSheet, className)} showBackdrop={showBlackout} {...rest}>
        {content}
      </BottomSheetCustom>
    );
  }

  return (
    <DrawerCustom
      position={position}
      width={width}
      className={cn(styles.notificationPanelDrawer, className)}
      showBlackout={showBlackout}
      {...rest}
    >
      {content}
    </DrawerCustom>
  );
}
