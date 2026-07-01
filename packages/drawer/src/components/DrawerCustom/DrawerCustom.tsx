import 'rc-drawer/assets/index.css';

import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { BottomSheetCustom, OVERLAY_SURFACE, OverlaySurfaceProvider } from '@ds/bottom-sheet';
import { usePortalContext } from '@ds/portal-context';
import { extractSupportProps, useModalOpenState } from '@ds/utils';
import cn from 'classnames';
import RcDrawerImport, { DrawerProps as RcDrawerBaseProps } from 'rc-drawer';
import { ComponentType, CSSProperties, useMemo } from 'react';

import { WIDTH_AS_VALUES } from '../../constants';
import {
  ButtonClose,
  DialogBody,
  DialogBodyProps,
  DialogFooter,
  DialogFooterProps,
  DialogHeader,
  DialogHeaderProps,
} from '../../helperComponents';
import { interopDefault } from '../../utils/interopDefault';
import { motionProps } from './constants';
import { useDrawerFocusTrap } from './hooks';
import styles from './styles.module.scss';
import { DrawerCustomProps } from './types';

const RcDrawer = interopDefault<ComponentType<RcDrawerBaseProps>>(RcDrawerImport);

/** Desktop-frame дровера: rc-drawer + position/width/push/nestedDrawer + close-button. Surface='drawer'. */
function DrawerFrame(props: DrawerCustomProps) {
  const {
    showBlackout = true,
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
    width,
    ...rest
  } = props;
  const isPredefinedWidth = typeof props.width === 'string' && WIDTH_AS_VALUES.includes(props.width);
  const heightAutoVertical = Boolean(heightAuto && (position === 'top' || position === 'bottom'));

  const { contentWrapperStyle, drawerPanelStyle } = useMemo(() => {
    if (!heightAutoVertical) {
      return {
        contentWrapperStyle: undefined as CSSProperties | undefined,
        drawerPanelStyle: undefined as CSSProperties | undefined,
      };
    }

    const contentWrapperStyleBase: CSSProperties = {
      height: 'auto',
      maxHeight: '100%',
    };

    const inset: CSSProperties =
      position === 'bottom'
        ? { top: 'auto', right: 0, bottom: 0, left: 0 }
        : { top: 0, right: 0, bottom: 'auto', left: 0 };

    return {
      contentWrapperStyle: { ...contentWrapperStyleBase, ...inset },
      drawerPanelStyle: {
        height: 'auto',
        maxHeight: '100%',
        minHeight: 0,
        overflow: 'hidden',
      } satisfies CSSProperties,
    };
  }, [heightAutoVertical, position]);

  useModalOpenState(open, onClose, { closeOnPopstate });

  const focusTrapRef = useDrawerFocusTrap(Boolean(open));

  // Без явного container портал идёт через PortalContextProvider (как у Modal): скоуп к локальному
  // элементу и отказ от body-level scroll lock, который rc-drawer ставит при рендере в document.body.
  const portalContextRef = usePortalContext();
  const resolvedContainer =
    container ?? (portalContextRef.current ? () => portalContextRef.current as HTMLElement : undefined);

  return (
    <RcDrawer
      mask={showBlackout}
      maskClosable={showBlackout}
      maskClassName={styles.mask}
      keyboard={showBlackout}
      data-showblackout={showBlackout}
      open={open}
      onClose={onClose}
      push={push}
      getContainer={resolvedContainer}
      placement={position}
      destroyOnClose
      className={cn(styles.drawer, className)}
      rootClassName={cn(styles.drawerRoot, rootClassName)}
      width={isPredefinedWidth ? 'null' : width}
      contentWrapperStyle={contentWrapperStyle}
      style={drawerPanelStyle}
      {...extractSupportProps(rest)}
      data-content-wrapper
      data-position={position}
      data-width={isPredefinedWidth ? width : undefined}
      data-height-auto={heightAutoVertical ? true : undefined}
      data-acrylic-appearance='neutral'
      data-acrylic-level='1Level'
      {...motionProps}
    >
      <div ref={focusTrapRef} className={styles.focusScope}>
        <div className={styles.badgeButtonClosedWrapper}>
          <ButtonClose className={styles.badgeButtonClosed} onClick={onClose} />
        </div>

        <OverlaySurfaceProvider surface={OVERLAY_SURFACE.Drawer} bodyHeightAuto={heightAutoVertical}>
          {children}
        </OverlaySurfaceProvider>

        {nestedDrawer}
      </div>
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
