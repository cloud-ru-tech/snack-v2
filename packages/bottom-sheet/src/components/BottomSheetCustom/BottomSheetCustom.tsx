import {
  OVERLAY_SURFACE,
  OverlaySurfaceProvider,
  PopupBody,
  PopupFooter,
  PopupHeader,
  PopupMedia,
} from '@ds/popup-private';
import { usePortalContext } from '@ds/portal-context';
import { useThemeClassnames } from '@ds/theme';
import { extractSupportProps, isBrowser, useLayoutEffect, useModalOpenState } from '@ds/utils';
import cn from 'classnames';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';

import { TEST_IDS } from '../../constants';
import { Handle } from '../../helperComponents';
import {
  BottomSheetBodyProps,
  BottomSheetCustomProps,
  BottomSheetFooterProps,
  BottomSheetHeaderProps,
  BottomSheetMediaProps,
} from '../../types';
import { CLOSING_TIMEOUT } from './constants';
import { useDragEngine, useFocusTrap, useTransitionPhase } from './hooks';
import styles from './styles.module.scss';

/** Резолв portal-target'а. Вызывается после `isMounted=true` (браузер), `document` доступен. */
function resolveContainer(
  container: BottomSheetCustomProps['container'],
  portalContextNode: HTMLElement | null,
): Element | null {
  if (typeof container === 'string') {
    // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi -- guarded by isMounted (browser only)
    return document.querySelector(container);
  }
  if (container instanceof HTMLElement) return container;
  // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi -- guarded by isMounted (browser only)
  return portalContextNode ?? document.body;
}

/**
 * Низкоуровневая обёртка bottom-sheet'а: portal + backdrop + slide-up motion + focus-trap +
 * Pointer-Events swipe / snap-engine. Готовая анатомия — `BottomSheet`.
 */
export function BottomSheetCustom(props: BottomSheetCustomProps) {
  const {
    open,
    onClose,
    showBackdrop = true,
    lockScroll = true,
    swipeEnabled = true,
    safeArea = true,
    snapPoints,
    defaultSnapIndex,
    snapIndex,
    onSnapIndexChange,
    closeOnPopstate = true,
    disableMotions = false,
    container,
    className,
    rootClassName,
    children,
    ...rest
  } = props;

  // Sheet модальный, если затемняет фон или лочит скролл. Non-modal не прячет фон от AT,
  // не ловит фокус и закрывается по Esc при фокусе снаружи.
  const isModal = showBackdrop || lockScroll;

  useModalOpenState(open, onClose, { closeOnPopstate });

  // Возврат фокуса на триггер: запоминаем активный элемент при open=true, возвращаем при open=false.
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  useLayoutEffect(() => {
    if (open && !wasOpenRef.current) {
      wasOpenRef.current = true;
      restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    } else if (!open && wasOpenRef.current) {
      wasOpenRef.current = false;
      const previous = restoreFocusRef.current;
      restoreFocusRef.current = null;
      if (
        previous &&
        previous !== document.body &&
        previous !== document.documentElement &&
        document.documentElement.contains(previous)
      ) {
        previous.focus({ preventScroll: true });
      }
    }
  }, [open]);

  const { isMounted, isActive } = useTransitionPhase(open, disableMotions ? 0 : CLOSING_TIMEOUT);

  const portalContextRef = usePortalContext();
  // Фокус-trap только для модального sheet'а: в non-modal Tab уходит на фон.
  const focusTrapRef = useFocusTrap(isActive && isModal);

  // Esc → закрытие. `useModalOpenState` закрывает через `CloseWatcher` (Chromium-only); в
  // Safari/Firefox навешиваем keydown-fallback ровно когда `CloseWatcher` недоступен.
  // Nested-safe для модального sheet'а: закрываем только если фокус внутри этой панели; для
  // non-modal фокус снаружи — закрываем безусловно.
  useEffect(() => {
    if (!isActive || !isBrowser() || 'CloseWatcher' in window) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const panel = focusTrapRef.current;
      const focusInside = Boolean(
        panel && (panel === document.activeElement || panel.contains(document.activeElement)),
      );
      if (!isModal || focusInside) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [isActive, isModal, onClose, focusTrapRef]);

  const {
    setContentNode,
    dragHandlers,
    snapIndex: activeSnapIndex,
    isDragging,
  } = useDragEngine({
    snapPoints,
    defaultSnapIndex,
    snapIndex,
    onSnapIndexChange,
    onClose,
    swipeEnabled,
    isActive,
  });

  // Верхний safe-area отступ нужен только на full-height (верх под notch); флаг — в `data-full-height`.
  const activeSnap = snapPoints?.[activeSnapIndex ?? 0];
  const isFullHeight = activeSnap === 1 || (typeof activeSnap === 'string' && /^100(%|dvh|svh|lvh)$/.test(activeSnap));

  const mergeRefCb = useCallback(
    (node: HTMLDivElement | null) => {
      (focusTrapRef as { current: HTMLDivElement | null }).current = node;
      setContentNode(node);
    },
    [focusTrapRef, setContentNode],
  );

  const handleBackdropClick = useCallback(() => {
    if (showBackdrop) onClose();
  }, [showBackdrop, onClose]);

  // Мобильная поверхность — comfort-плотность.
  const densityClassName = useThemeClassnames({ density: 'comfort' });

  if (!isMounted) return null;

  const targetNode = resolveContainer(container, portalContextRef.current);
  if (!targetNode) return null;

  const supportProps = extractSupportProps(rest);

  return createPortal(
    // RemoveScroll лочит фон-скролл (refcount для вложенных sheet'ов); `enabled={lockScroll}` —
    // для non-modal фон остаётся прокручиваемым.
    <RemoveScroll enabled={lockScroll}>
      <div
        className={cn(styles.root, rootClassName)}
        data-active={isActive || undefined}
        data-disable-motions={disableMotions || undefined}
      >
        {showBackdrop && (
          <div className={styles.backdrop} data-test-id={TEST_IDS.backdrop} onClick={handleBackdropClick} aria-hidden />
        )}

        <div
          className={styles.contentWrapper}
          data-active={isActive || undefined}
          // Full-height снимает верхний зазор max-height на `.contentWrapper`.
          data-full-height={isFullHeight || undefined}
        >
          <div
            ref={mergeRefCb}
            className={cn(styles.content, densityClassName, className)}
            role='dialog'
            // aria-modal только для модального sheet'а: non-modal оставляет фон доступным AT.
            aria-modal={isModal ? 'true' : undefined}
            data-test-id={TEST_IDS.root}
            data-safe-area={safeArea || undefined}
            data-snap-index={activeSnapIndex}
            // Пустой массив ведёт себя как single fit-content — атрибут не выставляем.
            data-snap-points={snapPoints && snapPoints.length > 0 ? snapPoints.length : undefined}
            data-swipe-enabled={swipeEnabled || undefined}
            data-dragging={isDragging || undefined}
            data-full-height={isFullHeight || undefined}
            {...supportProps}
            {...(swipeEnabled ? dragHandlers : {})}
          >
            {swipeEnabled && <Handle />}
            <OverlaySurfaceProvider surface={OVERLAY_SURFACE.Sheet}>{children}</OverlaySurfaceProvider>
          </div>
        </div>
      </div>
    </RemoveScroll>,
    targetNode,
  );
}

BottomSheetCustom.Header = PopupHeader;
BottomSheetCustom.Body = PopupBody;
BottomSheetCustom.Footer = PopupFooter;
BottomSheetCustom.Media = PopupMedia;

export namespace BottomSheetCustom {
  export type HeaderProps = BottomSheetHeaderProps;
  export type BodyProps = BottomSheetBodyProps;
  export type FooterProps = BottomSheetFooterProps;
  export type MediaProps = BottomSheetMediaProps;
}
