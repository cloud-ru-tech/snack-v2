import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { BottomSheetCustom, BottomSheetCustomProps, OVERLAY_SURFACE, OverlaySurfaceProvider } from '@ds/bottom-sheet';
import { usePortalContext } from '@ds/portal-context';
import { extractSupportProps, isBrowser, useModalOpenState, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';

import { MODE, TEST_IDS, WIDTH } from '../../constants';
import {
  ButtonClose,
  DialogBody,
  DialogBodyProps,
  DialogFooter,
  DialogFooterProps,
  DialogHeader,
  DialogHeaderProps,
} from '../../helperComponents';
import { ModalMode, ModalWidth } from '../../types';
import { useModalFocusTrap } from './hooks';
import styles from './styles.module.scss';

type ModalContainer = HTMLElement | string;

export type ModalCustomProps = WithSupportProps<{
  /** Управление состоянием показан/не показан */
  open: boolean;
  /** Колбэк закрытия */
  onClose(): void;
  /**
   * Режим закрытия: Regular — overlay/Esc/кнопка; Aggressive — только кнопка; Forced — без кнопки и overlay/Esc.
   * @default MODE.Regular
   */
  mode?: ModalMode;
  /** Содержимое окна (композиция Header/Body/Footer) */
  children: ReactNode;
  /** CSS-класс окна */
  className?: string;
  /** CSS-класс корневого слоя портала */
  rootClassName?: string;
  /** Размер окна */
  width?: ModalWidth;
  /** Растягивать по высоте в пределах контейнера */
  heightAuto?: boolean;
  /** Явный DOM-контейнер для `createPortal`; иначе `usePortalContext()` или `document.body`. */
  container?: ModalContainer;
  /** Закрытие при навигации по истории */
  closeOnPopstate?: boolean;
}> &
  // Только mobile: управляют sheet-поверхностью (на desktop игнорируются).
  Pick<BottomSheetCustomProps, 'snapPoints' | 'swipeEnabled' | 'safeArea' | 'showBackdrop'>;

/** Desktop-frame модалки: портал + overlay + close-button + width/mode/heightAuto. Surface='modal'. */
function ModalFrame({
  open = false,
  onClose,
  mode = MODE.Regular,
  children,
  className,
  rootClassName,
  width = WIDTH.S,
  heightAuto = true,
  container,
  closeOnPopstate,
  ...rest
}: ModalCustomProps) {
  const close = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const isRegular = mode === MODE.Regular;
  const hasCloseButton = mode !== MODE.Forced;
  const overlayBackdropBlur = mode === MODE.Aggressive || mode === MODE.Forced;

  useModalOpenState(
    Boolean(open),
    () => {
      if (hasCloseButton) {
        close();
      }
    },
    { closeOnPopstate },
  );

  useEffect(() => {
    if (!open || !isBrowser() || !isRegular) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, isRegular, open]);

  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const portalContextRef = usePortalContext();

  useEffect(() => {
    if (!isBrowser()) {
      setPortalContainer(null);
      return;
    }

    if (!open) {
      return;
    }

    const doc = window.document;

    if (container === undefined) {
      setPortalContainer(portalContextRef.current ?? doc.body);
      return;
    }

    if (typeof container === 'string') {
      const nextContainer = doc.querySelector(container);

      setPortalContainer(nextContainer instanceof HTMLElement ? nextContainer : doc.body);
      return;
    }

    setPortalContainer(container);
  }, [open, container, portalContextRef]);

  const focusTrapActive = Boolean(open && portalContainer);
  const dialogRef = useModalFocusTrap(focusTrapActive);

  if (!open || !portalContainer) {
    return null;
  }

  return createPortal(
    <RemoveScroll>
      <div
        className={cn(styles.root, rootClassName)}
        data-overlay-blur={overlayBackdropBlur ? 'true' : undefined}
        data-acrylic-appearance='neutral'
        data-acrylic-level='1Level'
      >
        <div
          className={styles.blackout}
          aria-hidden
          data-test-id={TEST_IDS.overlay}
          onClick={event => {
            event.stopPropagation();

            if (isRegular) {
              close();
            }
          }}
        />

        <div
          className={cn(styles.modal, className)}
          data-width={width}
          data-mode={mode}
          data-height-auto={heightAuto || undefined}
          role='dialog'
          aria-modal='true'
          ref={dialogRef}
          tabIndex={-1}
          {...extractSupportProps(rest)}
        >
          <OverlaySurfaceProvider surface={OVERLAY_SURFACE.Modal}>{children}</OverlaySurfaceProvider>

          {hasCloseButton && (
            <div className={styles.closeButtonWrapper}>
              <ButtonClose onClick={close} />
            </div>
          )}
        </div>
      </div>
    </RemoveScroll>,
    portalContainer,
  );
}

/**
 * Адаптивный low-level `ModalCustom`: на `mobile` — `BottomSheetCustom`, иначе — `ModalFrame`.
 * Композиция одна (surface-aware слоты `.Header/.Body/.Footer`). Форс — `withLayoutType`.
 */
export function ModalCustom(props: ModalCustomProps) {
  const { layoutType } = useAdaptiveLayout();

  if (isMobileLayout(layoutType)) {
    const {
      open = false,
      onClose,
      children,
      className,
      rootClassName,
      container,
      closeOnPopstate,
      snapPoints,
      swipeEnabled,
      safeArea,
      showBackdrop,
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
        snapPoints={snapPoints}
        swipeEnabled={swipeEnabled}
        safeArea={safeArea}
        showBackdrop={showBackdrop}
        {...extractSupportProps(rest)}
      >
        {children}
      </BottomSheetCustom>
    );
  }

  return <ModalFrame {...props} />;
}

export namespace ModalCustom {
  export type HeaderProps = DialogHeaderProps;
  export type BodyProps = DialogBodyProps;
  export type FooterProps = DialogFooterProps;
  export const Header = DialogHeader;
  export const Body = DialogBody;
  export const Footer = DialogFooter;
}
