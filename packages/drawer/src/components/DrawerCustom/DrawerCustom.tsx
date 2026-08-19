import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { BottomSheetCustom, OVERLAY_SURFACE, OverlaySurfaceProvider } from '@ds/bottom-sheet';
import { PopupCloseButton } from '@ds/popup-private';
import { usePortalContext } from '@ds/portal-context';
import { extractSupportProps, useModalOpenState } from '@ds/utils';
import RcDrawerImport, { DrawerProps as RcDrawerBaseProps } from '@rc-component/drawer';
import cn from 'classnames';
import { ComponentType, CSSProperties, useMemo } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import { TEST_IDS, WIDTH_AS_VALUES } from '../../constants';
import {
  DialogBody,
  DialogBodyProps,
  DialogFooter,
  DialogFooterProps,
  DialogHeader,
  DialogHeaderProps,
} from '../../helperComponents';
import { interopDefault } from '../../utils/interopDefault';
import { motionProps } from './constants';
import { useDrawerFocusTrap, useOuterScrollLock } from './hooks';
import { useDrawerResize } from './hooks/useDrawerResize';
import styles from './styles.module.scss';
import { DrawerCustomProps } from './types';

const RcDrawer = interopDefault<ComponentType<RcDrawerBaseProps>>(RcDrawerImport);

/** Desktop-frame дровера: rc-drawer + position/width/push/nestedDrawer + close-button. Surface='drawer'. */
function DrawerFrame(props: DrawerCustomProps) {
  const {
    showBlackout = true,
    showButtonClosed = true,
    open,
    onClose,
    rootClassName,
    className,
    push,
    container,
    children,
    nestedDrawer,
    closeOnPopstate,
    position,
    heightAuto,
    width: widthProp,
    resizable: resizableProp,
    disableMotions = false,
    ...rest
  } = props;
  const heightAutoVertical = Boolean(heightAuto && (position === 'top' || position === 'bottom'));
  const resizable = heightAutoVertical ? undefined : resizableProp;
  const {
    tooltip,
    checkElement,
    width: userWidth,
    resizable: drawerResizable,
  } = useDrawerResize({
    resizable,
    position,
  });
  const width = resizable ? (userWidth ?? widthProp) : widthProp;
  const isPredefinedWidth = typeof width === 'string' && WIDTH_AS_VALUES.includes(width);

  // Wrapper height/inset задаёт CSS по `[data-height-auto]`; здесь только стили секции.
  const drawerPanelStyle = useMemo((): CSSProperties | undefined => {
    if (!heightAutoVertical) {
      return undefined;
    }

    return {
      height: 'auto',
      maxHeight: '100%',
      minHeight: 0,
      overflow: 'hidden',
    };
  }, [heightAutoVertical]);

  // Esc обрабатывает rc-drawer (`keyboard={showBlackout}`) — он уважает стек порталов и закрывает
  // только верхний дровер. `CloseWatcher` подключаем лишь там, где rc-drawer Esc не слушает
  // (`showBlackout=false`): иначе два независимых обработчика закрывают и вложенный, и родительский.
  useModalOpenState(open, onClose, { closeOnPopstate, closeByCloseWatcher: !showBlackout });

  const focusTrapRef = useDrawerFocusTrap(Boolean(open));
  const outerScrollLock = useOuterScrollLock(Boolean(open));

  // Без явного container портал идёт через PortalContextProvider (как у Modal): скоуп к локальному
  // элементу и отказ от body-level scroll lock, который rc-drawer ставит при рендере в document.body.
  const portalContextRef = usePortalContext();
  const resolvedContainer =
    container ?? (portalContextRef.current ? () => portalContextRef.current as HTMLElement : undefined);

  return (
    <RcDrawer
      resizable={drawerResizable}
      panelRef={checkElement}
      mask={showBlackout}
      maskClosable={showBlackout}
      keyboard={showBlackout}
      data-showblackout={showBlackout}
      open={open}
      onClose={onClose}
      push={push}
      getContainer={resolvedContainer}
      placement={position}
      destroyOnHidden
      rootClassName={cn(styles.drawerRoot, rootClassName)}
      style={drawerPanelStyle}
      classNames={{
        section: cn(styles.drawer, className),
      }}
      size={isPredefinedWidth ? 'null' : width}
      {...extractSupportProps(rest)}
      data-content-wrapper
      data-position={position}
      data-width={isPredefinedWidth ? width : undefined}
      data-height-auto={heightAutoVertical ? true : undefined}
      data-acrylic-appearance='neutral'
      data-acrylic-level='1Level'
      prefixCls='snack-rc-drawer'
      {...(disableMotions ? {} : motionProps)}
    >
      {/* Свой лок в стеке `react-remove-scroll`: иначе лок модалки-родителя гасит скролл дровера. */}
      <RemoveScroll
        enabled={showBlackout || outerScrollLock}
        removeScrollBar={false}
        ref={focusTrapRef}
        className={styles.focusScope}
      >
        {showButtonClosed && (
          <div className={styles.showButtonClosedWrapper}>
            <PopupCloseButton
              className={styles.showButtonClosed}
              aria-label='close drawer'
              data-test-id={TEST_IDS.closeButton}
              onClick={onClose}
            />
          </div>
        )}

        <OverlaySurfaceProvider surface={OVERLAY_SURFACE.Drawer} bodyHeightAuto={heightAutoVertical}>
          {children}
        </OverlaySurfaceProvider>

        {tooltip}

        {nestedDrawer}
      </RemoveScroll>
    </RcDrawer>
  );
}

/**
 * Адаптивный low-level `DrawerCustom`: на `mobile` — `BottomSheetCustom`, иначе — `DrawerFrame`.
 * Композиция одна (surface-aware слоты `.Header/.Body/.Footer`). Форс — `withLayoutType`.
 */
export function DrawerCustom(props: DrawerCustomProps) {
  const { layoutType } = useAdaptiveLayout();

  if (isMobileLayout(layoutType)) {
    const {
      open,
      onClose,
      children,
      className,
      rootClassName,
      container,
      closeOnPopstate,
      showBlackout,
      snapPoints,
      swipeEnabled,
      safeArea,
      disableMotions,
      ...rest
    } = props;
    return (
      <BottomSheetCustom
        open={open}
        onClose={onClose}
        container={container}
        className={className}
        rootClassName={rootClassName}
        closeOnPopstate={closeOnPopstate}
        showBackdrop={showBlackout}
        snapPoints={snapPoints}
        swipeEnabled={swipeEnabled}
        safeArea={safeArea}
        disableMotions={disableMotions}
        {...extractSupportProps(rest)}
      >
        {children}
      </BottomSheetCustom>
    );
  }

  return <DrawerFrame {...props} />;
}

export namespace DrawerCustom {
  export type HeaderProps = DialogHeaderProps;
  export type BodyProps = DialogBodyProps;
  export type FooterProps = DialogFooterProps;
  export const Header = DialogHeader;
  export const Body = DialogBody;
  export const Footer = DialogFooter;
}
