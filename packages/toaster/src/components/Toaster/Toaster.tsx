import { useLocale } from '@ds/locale';
import { Scroll } from '@ds/scroll';
import { useLayoutEffect } from '@ds/utils';
import cn from 'classnames';
import { FocusEvent, MouseEvent, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import { CLOSE_ALL_THRESHOLD, POSITION_SYSTEM_EVENT, TEST_IDS, TOASTER_TYPE } from '../../constants';
import { ToastSystemEventCloseAll } from '../../helperComponents/ToastSystemEventCloseAll';
import { toasterManager } from '../../manager';
import { ManagedToast, ToasterId } from '../../manager/types';
import { DraggableDirection, ToasterContainerProps } from '../../types';
import { useTimerSync, useTouchStickyPauseRelease } from './hooks';
import styles from './styles.module.scss';
import {
  clipByLimit,
  DivPointerEvent,
  DRAGGING_SELECTOR,
  INITIAL_UI_STATE,
  INTERACTIVE_SELECTOR,
  isMousePointer,
  isPaused,
  isTouchPointer,
  mergeWithDefaults,
  POSITION_CLASS_NAME,
  renderFlatToasts,
  renderStackToasts,
  RenderToastsOptions,
  TOAST_STATUS,
  uiReducer,
} from './utils';

export type ToasterProps = ToasterContainerProps;

/**
 * Контейнер тостов одного типа (`system-event` / `user-action` / `upload`).
 * Подписывается на `toasterManager`, держит стек, очередь автозакрытия и
 * UI-состояние (hover/touch-pause/collapse).
 */
export function ToasterContainer(rawProps: ToasterProps) {
  const props = mergeWithDefaults(rawProps);
  const { type, position, limit, containerId, displayCloseAllButton, width, draggable } = props;
  const stacked = Boolean(props.stacked);
  const { autoClose } = rawProps;
  const { t } = useLocale('ToasterContainer');

  // Свайп по умолчанию — по оси приезда: top-/bottom-center «подъезжают» сверху/
  // снизу, остальные позиции — сбоку.
  const draggableDirection: DraggableDirection =
    props.draggableDirection ??
    (position === POSITION_SYSTEM_EVENT.TopCenter || position === POSITION_SYSTEM_EVENT.BottomCenter ? 'y' : 'x');

  const renderOptions = useMemo<RenderToastsOptions>(
    () => ({ containerId, draggable: Boolean(draggable), draggableDirection }),
    [containerId, draggable, draggableDirection],
  );

  // ===== Manager subscription =====
  const [toasts, setToasts] = useState<ManagedToast[]>(() => toasterManager.getToasts(containerId));
  const [closeAllDismissed, setCloseAllDismissed] = useState(false);

  useLayoutEffect(
    () =>
      toasterManager.subscribe(containerId, list => {
        setToasts(prev => {
          const prevActive = prev.filter(p => p.status !== TOAST_STATUS.Leaving).length;
          const nextActive = list.filter(p => p.status !== TOAST_STATUS.Leaving).length;
          // Новый тост после Close all → возвращаем кнопку.
          if (nextActive > prevActive) setCloseAllDismissed(false);
          return list;
        });
      }),
    [containerId],
  );

  // resolveAutoClose в helpers.tsx использует это как fallback.
  useLayoutEffect(() => {
    toasterManager.setContainerDefaults(containerId, { autoClose });
  }, [containerId, autoClose]);

  // ===== Visibility & limit =====
  // Храним в state ВСЕ тосты (включая leaving), а ограничиваем на рендере;
  // manager про visible-limit не знает.
  const visibleToasts = useMemo(() => clipByLimit(toasts, limit), [toasts, limit]);

  // Split по типам: Upload рендерится отдельным блоком (см. DOM-order ниже),
  // UserAction + SystemEvent делят «main»-блок и общий стек.
  const uploadToasts = useMemo(() => visibleToasts.filter(t => t.toastType === TOASTER_TYPE.Upload), [visibleToasts]);
  const systemEventToasts = useMemo(
    () => visibleToasts.filter(t => t.toastType === TOASTER_TYPE.SystemEvent),
    [visibleToasts],
  );
  const userActionToasts = useMemo(
    () => visibleToasts.filter(t => t.toastType === TOASTER_TYPE.UserAction),
    [visibleToasts],
  );

  // UserAction в стандартном bottom-/top-center контейнере живёт один, без
  // стека. В shared-контейнере (общий containerId) их рендерим вместе с
  // SystemEvent — это «main» блок, противоположный Upload-якорю.
  const mainBlockToasts = useMemo(
    () => [...userActionToasts, ...systemEventToasts],
    [userActionToasts, systemEventToasts],
  );

  // Тосты, выпавшие за `limit` — не в DOM, их таймер не должен тикать.
  const clippedByLimit = useMemo(() => {
    const visibleIds = new Set(visibleToasts.map(t => t.id));
    return toasts.filter(t => t.status !== TOAST_STATUS.Leaving && !visibleIds.has(t.id));
  }, [toasts, visibleToasts]);

  // ===== UI state machine =====
  const [ui, dispatch] = useReducer(uiReducer, INITIAL_UI_STATE);
  const containerRef = useRef<HTMLDivElement>(null);
  const paused = isPaused(ui);

  useTouchStickyPauseRelease(containerRef, ui.touchPaused, stacked, dispatch);

  // ===== Timer sync =====
  const systemEventNonLeaving = useMemo(
    () => systemEventToasts.filter(t => t.status !== TOAST_STATUS.Leaving),
    [systemEventToasts],
  );
  const frontId = systemEventNonLeaving[systemEventNonLeaving.length - 1]?.id;
  const visibleIdsKey = useMemo(
    () =>
      visibleToasts
        .filter(t => t.status !== TOAST_STATUS.Leaving)
        .map(t => `${t.toastType}:${t.id}`)
        .join(','),
    [visibleToasts],
  );

  useTimerSync({
    containerId,
    paused,
    stacked: stacked,
    collapsed: ui.collapsed,
    visibleToasts,
    hiddenByLimit: clippedByLimit,
    systemEventNonLeaving,
    frontId,
    visibleIdsKey,
  });

  // Когда тосты кончились — снимаем sticky-pause, иначе следующий тост
  // прилетит уже на паузе и будет висеть бесконечно.
  useEffect(() => {
    if (visibleToasts.length === 0) dispatch({ type: 'toasts:emptied' });
  }, [visibleToasts.length]);

  // ===== Buttons (Expand/Collapse, Close all) =====
  const activeSystemEventCount = systemEventNonLeaving.length;
  const showButtons =
    Boolean(displayCloseAllButton) && activeSystemEventCount >= CLOSE_ALL_THRESHOLD && !closeAllDismissed;

  // Снапшот id'шников, по которым пользователь нажал Close all. Пока хотя бы
  // один из них ещё висит, кнопки скрыты; как только из очереди приедет
  // НОВЫЙ тост (id не из снапшота) — сбрасываем флаг и возвращаем кнопки.
  const closeAllDismissedIdsRef = useRef<Set<ToasterId>>(new Set());

  const closeAll = useCallback(() => {
    const dismissed = new Set<ToasterId>();
    systemEventToasts.forEach(t => {
      if (t.status !== TOAST_STATUS.Leaving) {
        dismissed.add(t.id);
        toasterManager.dismiss(t.id, containerId);
      }
    });
    closeAllDismissedIdsRef.current = dismissed;
    setCloseAllDismissed(true);
    dispatch({ type: 'close-all', stacked: stacked });
  }, [systemEventToasts, containerId, stacked]);

  useEffect(() => {
    if (!closeAllDismissed) return;
    const snapshot = closeAllDismissedIdsRef.current;
    const hasFresh = systemEventNonLeaving.some(t => !snapshot.has(t.id));
    if (hasFresh) {
      closeAllDismissedIdsRef.current = new Set();
      setCloseAllDismissed(false);
    }
  }, [closeAllDismissed, systemEventNonLeaving]);

  const toggleCollapsed = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatch({ type: 'manual:toggle', stacked: stacked });
    },
    [stacked],
  );

  // ===== Container-level pointer/focus handlers =====
  // Hover/focus на контейнере целиком только паузит таймеры. Раскрытие стека —
  // отдельный handler на блоке карточек: hover на кнопках Collapse/Close all
  // не должен разворачивать стек, иначе click сразу схлопывает обратно
  // (mouseenter ставит false → click toggle ставит true).
  // Тач отфильтровываем через pointerType: на тач-устройствах браузер
  // эмулирует mouseenter перед каждым тапом и почти никогда не шлёт mouseleave —
  // hovered залипал бы навсегда.
  const onPointerEnter = useCallback((e: DivPointerEvent) => {
    if (!isMousePointer(e)) return;
    dispatch({ type: 'pointer:enter-container' });
  }, []);

  const onPointerLeave = useCallback(
    (e: DivPointerEvent) => {
      if (!isMousePointer(e)) return;
      dispatch({ type: 'pointer:leave-container', stacked: stacked });
    },
    [stacked],
  );

  // Тач-тап по тосту вне close-кнопки и вне активного свайпа = sticky-pause.
  // [data-dragging] фильтрует pointerup, прилетающий после успешного или
  // snap-back свайпа: setDrag из ToastSlot применится после bubbling, но в DOM
  // атрибут пока что хранит предыдущее значение.
  const onPointerUp = useCallback(
    (e: DivPointerEvent) => {
      if (!isTouchPointer(e)) return;
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTOR) || target.closest(DRAGGING_SELECTOR)) return;
      dispatch({ type: 'touch:tap-inside', stacked: stacked });
    },
    [stacked],
  );

  const onFocusCapture = useCallback(() => {
    dispatch({ type: 'focus:enter-container' });
  }, []);

  const onBlurCapture = useCallback(
    (e: FocusEvent<HTMLDivElement>) => {
      // blur с relatedTarget внутри контейнера = перемещение фокуса между
      // тостами, не выход.
      if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
      dispatch({ type: 'focus:leave-container', stacked: stacked });
    },
    [stacked],
  );

  // ===== Stack-block handlers (раскрытие по hover/focus на карточках) =====
  const onStackPointerEnter = useCallback(
    (e: DivPointerEvent) => {
      if (!isMousePointer(e)) return;
      dispatch({ type: 'pointer:enter-stack', stacked: stacked });
    },
    [stacked],
  );

  const onStackFocusCapture = useCallback(() => {
    dispatch({ type: 'focus:enter-stack', stacked: stacked });
  }, [stacked]);

  return (
    <div
      id={containerId}
      ref={containerRef}
      className={cn(styles.container, styles[POSITION_CLASS_NAME[position]])}
      role='region'
      aria-live='polite'
      aria-relevant='additions text'
      data-test-id={rawProps['data-test-id'] ?? TEST_IDS.toasterContainer}
      data-toaster-container
      data-type={type}
      data-position={position}
      data-stacked={stacked || undefined}
      data-width={width}
      data-collapsed={stacked ? ui.collapsed : undefined}
      data-paused={paused || undefined}
      data-show-buttons={showButtons || undefined}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerUp={onPointerUp}
      onFocusCapture={onFocusCapture}
      onBlurCapture={onBlurCapture}
    >
      {/* Скролл-хост — fallback под высоту: когда суммарная высота тостов
          превышает доступную (`max-height` на `.scrollHost`), внутренний скролл
          из @ds/scroll даёт прокрутить хвост, оставаясь в paddingVertical
          контейнера. Flex-раскладка живёт на `.stackInner` (DOM-порядок
          [Main, Buttons, Upload] переворачивается в column-reverse для top-*). */}
      <Scroll className={styles.scrollHost} barHideStrategy='scroll' size='s'>
        <div className={cn(styles.stackInner, styles[POSITION_CLASS_NAME[position]])}>
          {mainBlockToasts.length > 0 && (
            <div
              className={styles.systemEventBlock}
              data-test-id={TEST_IDS.mainBlock}
              onPointerEnter={onStackPointerEnter}
              onFocusCapture={onStackFocusCapture}
            >
              {renderStackToasts(mainBlockToasts, renderOptions)}
            </div>
          )}

          {showButtons && (
            <div className={styles.buttonsBlock} data-stacked={stacked || undefined}>
              {stacked && (
                <ToastSystemEventCloseAll onClick={toggleCollapsed} data-test-id={TEST_IDS.buttonCollapse}>
                  {ui.collapsed ? t('expand') : t('collapse')}
                </ToastSystemEventCloseAll>
              )}
              <ToastSystemEventCloseAll onClick={closeAll} data-test-id={TEST_IDS.buttonCloseAll}>
                {t('closeAll')}
              </ToastSystemEventCloseAll>
            </div>
          )}

          {uploadToasts.length > 0 && (
            <div className={styles.uploadBlock} data-test-id={TEST_IDS.uploadBlock}>
              {renderFlatToasts(uploadToasts, renderOptions)}
            </div>
          )}
        </div>
      </Scroll>
    </div>
  );
}
