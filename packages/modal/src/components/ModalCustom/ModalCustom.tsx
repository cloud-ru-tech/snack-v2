import { usePortalContext } from '@ds/portal-context';
import { extractSupportProps, isBrowser, useModalOpenState, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';

import { MODE, TEST_IDS, WIDTH } from '../../constants';
import {
  Body as ModalBodyComponent,
  BodyProps as ModalBodyPropsType,
  ButtonClose,
  Footer as ModalFooterComponent,
  FooterProps as ModalFooterPropsType,
  Header as ModalHeaderComponent,
  HeaderProps as ModalHeaderPropsType,
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
   * Режим закрытия: Regular — overlay, Esc и кнопка; Aggressive — только кнопка; Forced — без кнопки и без overlay/Esc.
   * blur подложки — только у Aggressive и Forced.
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
  /**
   * Явный DOM-контейнер для `createPortal`.
   * Если не задан — используется `usePortalContext()` (например `PortalContextProvider` из `@design-system/portal-context`), иначе `document.body`.
   */
  container?: ModalContainer;
  /** Закрытие при навигации по истории */
  closeOnPopstate?: boolean;
}>;

export function ModalCustom({
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
          {children}

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

export namespace ModalCustom {
  export type HeaderProps = ModalHeaderPropsType;
  export type BodyProps = ModalBodyPropsType;
  export type FooterProps = ModalFooterPropsType;
  export const Header = ModalHeaderComponent;
  export const Body = ModalBodyComponent;
  export const Footer = ModalFooterComponent;
}
