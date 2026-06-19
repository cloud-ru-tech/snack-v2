import { usePortalContext } from '@ds/portal-context';
import { extractSupportProps, isBrowser, useLayoutEffect, useModalOpenState } from '@ds/utils';
import cn from 'classnames';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';

import { TEST_IDS } from '../../constants';
import { Body, Footer, Handle, Header, Media } from '../../helperComponents';
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

/**
 * Резолв portal-target'а. Вызывается только после того, как `useTransitionPhase` поднял
 * `isMounted = true` — это бывает только в браузере (rAF / setTimeout), поэтому глобальный
 * `document` здесь гарантированно доступен.
 */
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
 * Pointer-Events swipe / snap-engine. Рендеримся через `createPortal` напрямую; transition-фазами
 * управляет `useTransitionPhase`.
 *
 * Мобильная корректность:
 *  - `react-remove-scroll` лочит скролл фона и гасит pull-to-refresh / overscroll-bleed на iOS;
 *  - `touch-action` на слоях (см. `styles.module.scss`) убирает нативные жесты на поверхности sheet'а;
 *  - drag-движок (`useDragEngine`) отдаёт жест нативному скроллу, пока вложенный контент не упёрся
 *    в край — поэтому контент скроллится, а sheet не «дёргается».
 *
 * Высокоуровневая обёртка с готовой анатомией (header / body / media / footer) — `BottomSheet`.
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
    container,
    className,
    rootClassName,
    children,
    ...rest
  } = props;

  // Модальность: sheet модальный, если затемняет фон ИЛИ лочит скролл. Non-modal (оба false) оставляет
  // фон видимым и интерактивным — тогда dialog НЕ должен прятать фон от AT (aria-modal), НЕ должен
  // ловить фокус и должен закрываться по Esc даже когда фокус снаружи (на фоновом контенте).
  const isModal = showBackdrop || lockScroll;

  useModalOpenState(open, onClose, { closeOnPopstate });

  // Возврат фокуса на триггер. Запоминаем активный элемент в момент open=true (до slide-up-задержки
  // isActive: к ней триггер успевает потерять фокус → восстанавливать было бы некуда), возвращаем на
  // open=false. Sheet к этому моменту ещё смонтирован (leave-анимация) — фокус уходит из него на триггер.
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

  const { isMounted, isActive } = useTransitionPhase(open, CLOSING_TIMEOUT);

  const portalContextRef = usePortalContext();
  // Фокус-trap только для модального sheet'а: в non-modal клавиатурный юзер должен иметь возможность
  // уйти Tab'ом на фон (который для pointer-юзера уже доступен).
  const focusTrapRef = useFocusTrap(isActive && isModal);

  // Esc → закрытие. `useModalOpenState` закрывает только через `CloseWatcher` (Chromium-only, плюс
  // ловит Android-back). В Safari/Firefox его нет — навешиваем явный keydown-fallback ровно когда
  // `CloseWatcher` недоступен (иначе на Chromium был бы двойной `onClose`).
  //
  // Nested-safe для МОДАЛЬНОГО sheet'а: закрываем, только если фокус сейчас внутри ЭТОЙ панели.
  // `useFocusTrap` держит фокус в топовом sheet'е, поэтому на один Escape сработает лишь верхний слой.
  // Для NON-MODAL фокус легитимно находится снаружи (на фоне) — там закрываем по Esc безусловно
  // (иначе документированный «Esc закрывает» в Safari/Firefox молча не работал бы).
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

  // Верхний safe-area отступ нужен только когда sheet раскрыт на полный вьюпорт — тогда его верх
  // попадает под notch. Для частичных snap'ов / auto-высоты верх ниже notch, отступ не нужен.
  // Флаг отдаём в `data-full-height`; сам env-паддинг включает CSS на `.content[data-safe-area][data-full-height]`.
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

  if (!isMounted) return null;

  const targetNode = resolveContainer(container, portalContextRef.current);
  if (!targetNode) return null;

  const supportProps = extractSupportProps(rest);

  return createPortal(
    // RemoveScroll лочит фон-скролл и ставит `data-scroll-locked` на body (refcount для вложенных
    // sheet'ов). На мобильном overlay-скроллбара нет, поэтому padding-компенсации/«уезжания» не
    // возникает; на desktop bottom-sheet не используется (mobile-only).
    // `enabled={lockScroll}` — для non-modal sheet'а (lockScroll=false) фон остаётся прокручиваемым.
    <RemoveScroll enabled={lockScroll}>
      <div className={cn(styles.root, rootClassName)} data-active={isActive || undefined}>
        {showBackdrop && (
          <div className={styles.backdrop} data-test-id={TEST_IDS.backdrop} onClick={handleBackdropClick} aria-hidden />
        )}

        <div
          className={styles.contentWrapper}
          data-active={isActive || undefined}
          // Full-height снимает верхний зазор max-height на `.contentWrapper` (Full = весь вьюпорт).
          data-full-height={isFullHeight || undefined}
        >
          <div
            ref={mergeRefCb}
            className={cn(styles.content, className)}
            role='dialog'
            // aria-modal только для модального sheet'а: для non-modal фон должен оставаться доступным AT.
            aria-modal={isModal ? 'true' : undefined}
            data-test-id={TEST_IDS.root}
            data-safe-area={safeArea || undefined}
            data-snap-index={activeSnapIndex}
            // Эффективное число snap'ов: пустой массив ведёт себя как single fit-content (как undefined),
            // поэтому атрибут не выставляем (иначе data-snap-points="0" противоречил бы поведению).
            data-snap-points={snapPoints && snapPoints.length > 0 ? snapPoints.length : undefined}
            data-swipe-enabled={swipeEnabled || undefined}
            data-dragging={isDragging || undefined}
            data-full-height={isFullHeight || undefined}
            {...supportProps}
            {...(swipeEnabled ? dragHandlers : {})}
          >
            {swipeEnabled && <Handle />}
            {children}
          </div>
        </div>
      </div>
    </RemoveScroll>,
    targetNode,
  );
}

BottomSheetCustom.Header = Header;
BottomSheetCustom.Body = Body;
BottomSheetCustom.Footer = Footer;
BottomSheetCustom.Media = Media;

export namespace BottomSheetCustom {
  export type HeaderProps = BottomSheetHeaderProps;
  export type BodyProps = BottomSheetBodyProps;
  export type FooterProps = BottomSheetFooterProps;
  export type MediaProps = BottomSheetMediaProps;
}
