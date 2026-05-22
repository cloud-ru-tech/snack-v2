import 'rc-drawer/assets/index.css';

import { usePortalContext } from '@ds/portal-context';
import { extractSupportProps, useModalOpenState } from '@ds/utils';
import cn from 'classnames';
import RcDrawerImport, { DrawerProps as RcDrawerBaseProps } from 'rc-drawer';
import { ComponentType, CSSProperties, useMemo } from 'react';

import { WIDTH_AS_VALUES } from '../../constants';
import {
  ButtonClose,
  DrawerBody,
  DrawerBodyProps,
  DrawerFooter,
  DrawerFooterProps,
  DrawerHeader,
  DrawerHeaderProps,
} from '../../helperComponents';
import { interopDefault } from '../../utils/interopDefault';
import { motionProps } from './constants';
import { useDrawerFocusTrap } from './hooks';
import { DrawerCustomLayoutProvider } from './layoutContext';
import styles from './styles.module.scss';
import { DrawerCustomProps } from './types';

const RcDrawer = interopDefault<ComponentType<RcDrawerBaseProps>>(RcDrawerImport);

export function DrawerCustom(props: DrawerCustomProps) {
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

  // Fallback: if no explicit container, route the portal through PortalContextProvider
  // (matches Modal behaviour). This lets callers scope the drawer to a local element and
  // avoids the body-level scroll lock that rc-drawer applies when rendering into document.body.
  const portalContextRef = usePortalContext();
  const resolvedContainer =
    container ?? (portalContextRef.current ? () => portalContextRef.current as HTMLElement : undefined);

  return (
    <DrawerCustomLayoutProvider value={{ heightAutoVertical }}>
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

          {children}

          {nestedDrawer}
        </div>
      </RcDrawer>
    </DrawerCustomLayoutProvider>
  );
}

export namespace DrawerCustom {
  export type HeaderProps = DrawerHeaderProps;
  export type BodyProps = DrawerBodyProps;
  export type FooterProps = DrawerFooterProps;
  export const Header = DrawerHeader;
  export const Body = DrawerBody;
  export const Footer = DrawerFooter;
}
