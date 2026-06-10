import { isBrowser, useLayoutEffect, useValueControl } from '@ds/utils';
import { PointerEvent as ReactPointerEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { SnapPoint } from '../../../types';
import { DRAG_START_THRESHOLD_PX, SCROLL_LOCK_COOLDOWN_MS, SINGLE_CLOSE_DISTANCE_RATIO } from '../constants';
import { findScrollableAncestor, isScrolledToBottom, isScrolledToTop } from '../utils/scroll';
import {
  findTargetSnap,
  isValidSnapPoint,
  resolveSnapPointPx,
  VELOCITY_THRESHOLD_PX_PER_MS,
} from '../utils/snapPoints';

/** Атрибут-флаг на интерактивном предке, отключающий захват drag'ом (слайдеры, карты и т.п.). */
const NO_DRAG_SELECTOR = '[data-bottom-sheet-no-drag]';
/** Длительность settle-анимации height (мс) — для отложенного восстановления `auto` у fit-content. */
const SETTLE_TIMEOUT_MS = 260;

type UseDragEngineProps = {
  snapPoints?: SnapPoint[];
  defaultSnapIndex?: number;
  snapIndex?: number;
  onSnapIndexChange?(snapIndex: number): void;
  onClose(): void;
  swipeEnabled: boolean;
  /** Активна ли панель (sheet раскрыт). Drag разрешён только в активной фазе. */
  isActive: boolean;
};

type DragHandlers = {
  onPointerDown(event: ReactPointerEvent<HTMLDivElement>): void;
};

type UseDragEngineReturn = {
  /** Ref-callback для корневого `.content`-узла sheet'а (swipe-target + владелец height). */
  setContentNode(node: HTMLDivElement | null): void;
  /** Pointer-обработчики для `.content`. Вешать всегда — внутри есть guard по `swipeEnabled`. */
  dragHandlers: DragHandlers;
  /** Активный snap-индекс (для `data-snap-index`). `undefined` если snap-points не заданы. */
  snapIndex: number | undefined;
  /** Идёт ли drag прямо сейчас (для `data-dragging`). */
  isDragging: boolean;
};

/** CSS-высота для snap'а: `fit-content` → auto, доля → dvh, литералы px/%/dvh/svh/lvh — как есть. */
function resolveSnapCss(snap: SnapPoint): string {
  if (snap === 'fit-content') return 'auto';
  if (typeof snap === 'number') return `${snap * 100}dvh`;
  if (snap.endsWith('px')) return snap;
  if (snap.endsWith('%')) return `${parseFloat(snap)}dvh`;
  return snap;
}

/**
 * Drag-движок bottom-sheet'а на Pointer Events (единый путь для touch/mouse/pen).
 *
 * Модель drag'а — **изменение высоты, привязанной к низу** (а не translate): sheet растёт вверх при
 * раскрытии и сжимается при сворачивании, не отрываясь от нижней кромки и не уезжая за экран.
 * Высоту целиком ведёт движок императивно (React её не выставляет), чтобы не конфликтовать.
 *
 * Move/up слушаются на `document` (а не на `.content`): drag отслеживается, даже когда палец уходит
 * за пределы sheet'а (например, тянем вверх от самой кромки). Pointer capture НЕ используется — он
 * перенацеливает `click` на захватившую ноду и ломает кнопки внутри sheet'а.
 *
 * Ключевая мобильная механика — «drag только от края скролла» (vaul-подобная): если жест начат внутри
 * прокручиваемого контента, который ещё не упёрся в нужный край, жест отдаётся нативному скроллу.
 *
 *  - без `snapPoints` — single snap по высоте контента, swipe-down закрывает.
 *  - с `snapPoints` — multi-snap: drag меняет высоту → `snapIndex` или закрывает (см. `findTargetSnap`).
 */
export function useDragEngine({
  snapPoints,
  defaultSnapIndex = 0,
  snapIndex: snapIndexProp,
  onSnapIndexChange,
  onClose,
  swipeEnabled,
  isActive,
}: UseDragEngineProps): UseDragEngineReturn {
  const safeSnapPoints = useMemo(() => snapPoints ?? [], [snapPoints]);
  // Type-valid, но рантайм-невалидные snapPoints (например, `[50]` вместо `[0.5]`, или `'-5px'`)
  // деградируют к single-snap, а не бросают необработанно в pointer-обработчике на первом свайпе.
  const snapsValid = useMemo(() => safeSnapPoints.every(isValidSnapPoint), [safeSnapPoints]);
  const hasSnapPoints = safeSnapPoints.length > 0 && snapsValid;
  const lastIndex = safeSnapPoints.length - 1;
  // Нецелочисленный / NaN индекс (например, вычисленный потребителем) приводим к 0, иначе он утёк бы
  // в `data-snap-index` строкой 'NaN' и в `safeSnapPoints[NaN]` → undefined.
  const clampIndex = (index: number) => (Number.isInteger(index) ? Math.max(0, Math.min(index, lastIndex)) : 0);
  const clampedDefault = hasSnapPoints ? clampIndex(defaultSnapIndex) : 0;

  const [snapIndex, setSnapIndex] = useValueControl<number>({
    value: snapIndexProp,
    defaultValue: clampedDefault,
    onChange: onSnapIndexChange,
  });

  const resolvedIndex = snapIndex ?? clampedDefault;
  const safeIndex = hasSnapPoints ? clampIndex(resolvedIndex) : 0;
  const currentSnap: SnapPoint = hasSnapPoints ? safeSnapPoints[safeIndex] : 'fit-content';

  // Зеркало snap-производных значений для чтения в pointer-обработчиках. Pointer-события синхронны
  // и могут прийти между сменой snapPoints и ре-рендером React — ref всегда актуален, в отличие от
  // значений, захваченных в closure обработчика.
  const snapStateRef = useRef({ hasSnapPoints, safeIndex, lastIndex, safeSnapPoints, currentSnap });
  snapStateRef.current = { hasSnapPoints, safeIndex, lastIndex, safeSnapPoints, currentSnap };

  const contentRef = useRef<HTMLDivElement | null>(null);
  const pointerId = useRef<number | null>(null);
  const startTarget = useRef<EventTarget | null>(null);
  const startY = useRef(0);
  const startTime = useRef(0);
  const startHeight = useRef(0);
  const snapHeightsPx = useRef<number[]>([]);
  const maxSnapHeightPx = useRef(0);
  const lastDelta = useRef(0);
  const committed = useRef(false);
  const scrollPreventedAt = useRef(0);
  const heightMounted = useRef(false);
  const docListeners = useRef<{
    move(event: PointerEvent): void;
    up(event: PointerEvent): void;
    cancel(event: PointerEvent): void;
  } | null>(null);
  // Отложенная async-работа жеста — храним хэндлы, чтобы отменять на reset/unmount (иначе осиротевший
  // settle-таймер / veto-rAF может сработать по уже закрытому/переоткрытому sheet'у).
  const settleTimer = useRef(0);
  const vetoRaf = useRef(0);
  // Прокручиваемый предок резолвим один раз за жест (а не на каждом pointermove): getComputedStyle —
  // дорогой style-recalc на самом горячем пути (инерционный скролл body даёт десятки move-событий).
  const scrollableAncestor = useRef<HTMLElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  /** Выставить height на `.content`: `animate=false` → мгновенно (transition none), иначе CSS-transition. */
  const applyHeight = useCallback((value: string, animate: boolean) => {
    const node = contentRef.current;
    if (!node) return;
    node.style.transition = animate ? '' : 'none';
    node.style.height = value;
  }, []);

  const setContentNode = useCallback(
    (node: HTMLDivElement | null) => {
      contentRef.current = node;
      // height живёт на движке (не на React-style) — выставляем стартовую высоту сразу при mount'е.
      if (node) applyHeight(resolveSnapCss(snapStateRef.current.currentSnap), false);
    },
    [applyHeight],
  );

  // Анимируем height при смене snap'а через controlled `snapIndex` (drag-смену движок анимирует сам).
  useLayoutEffect(() => {
    if (committed.current) return;
    applyHeight(resolveSnapCss(currentSnap), heightMounted.current);
    heightMounted.current = true;
  }, [currentSnap, applyHeight]);

  const detachDocListeners = useCallback(() => {
    const listeners = docListeners.current;
    if (!listeners) return;
    if (isBrowser()) {
      document.removeEventListener('pointermove', listeners.move);
      document.removeEventListener('pointerup', listeners.up);
      document.removeEventListener('pointercancel', listeners.cancel);
    }
    docListeners.current = null;
  }, []);

  /**
   * Полный обрыв жеста: снимаем document-listener'ы, отменяем отложенную работу и сбрасываем refs.
   * Вызывается при unmount'е И при закрытии sheet'а (isActive=false) — иначе in-flight drag продолжал
   * бы тянуть закрывающийся sheet ещё CLOSING_TIMEOUT мс, а `finish` мог повторно вызвать `onClose`.
   */
  const resetGesture = useCallback(() => {
    detachDocListeners();
    if (settleTimer.current) {
      window.clearTimeout(settleTimer.current);
      settleTimer.current = 0;
    }
    if (vetoRaf.current && isBrowser()) {
      cancelAnimationFrame(vetoRaf.current);
      vetoRaf.current = 0;
    }
    pointerId.current = null;
    committed.current = false;
    startTarget.current = null;
    lastDelta.current = 0;
    scrollPreventedAt.current = 0;
    scrollableAncestor.current = null;
    setIsDragging(false);
  }, [detachDocListeners]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!swipeEnabled || !isActive) return;
      if (!event.isPrimary || pointerId.current !== null) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (event.target instanceof Element && event.target.closest(NO_DRAG_SELECTOR)) return;

      const node = contentRef.current;
      pointerId.current = event.pointerId;
      startTarget.current = event.target;
      startY.current = event.clientY;
      startTime.current = Date.now();
      startHeight.current = node?.offsetHeight ?? 0;
      lastDelta.current = 0;
      committed.current = false;
      scrollPreventedAt.current = 0;
      scrollableAncestor.current = findScrollableAncestor(event.target, node);

      const { hasSnapPoints: snapsOn, safeSnapPoints: snaps } = snapStateRef.current;
      if (snapsOn) {
        // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi -- pointer-событие всегда из браузера
        const viewportHeightPx = window.innerHeight;
        snapHeightsPx.current = snaps.map(s => resolveSnapPointPx(s, viewportHeightPx, startHeight.current));
        // Потолок drag'а — не ниже фактической высоты sheet'а: на mobile dvh/svh/lvh (CSS) и innerHeight
        // (JS) расходятся на высоту URL-бара, и без клампа первый кадр lvh-snap'а скачком сжимался бы.
        maxSnapHeightPx.current = Math.max(Math.max(...snapHeightsPx.current), startHeight.current);
      } else {
        snapHeightsPx.current = [];
        maxSnapHeightPx.current = startHeight.current;
      }

      const move = (e: PointerEvent) => {
        if (e.pointerId !== pointerId.current) return;

        const delta = e.clientY - startY.current; // вниз — положительная
        lastDelta.current = delta;
        const { hasSnapPoints: on, safeIndex: idx, lastIndex: last } = snapStateRef.current;

        if (!committed.current) {
          if (Math.abs(delta) < DRAG_START_THRESHOLD_PX) return;

          const isDown = delta > 0;
          // Прокручиваемый предок зафиксирован в onPointerDown (от точки старта жеста); читаем из ref'а,
          // а свежий край-скролл (scrollTop) проверяем ниже через isScrolledToTop/Bottom.
          const scrollable = scrollableAncestor.current;

          if (isDown) {
            // Тянем вниз: пока вложенный скролл не на самом верху — отдаём жест ему.
            if (scrollable && !isScrolledToTop(scrollable)) {
              scrollPreventedAt.current = Date.now();
              return;
            }
          } else {
            // Тянем вверх: пока есть куда скроллить вниз — скроллим контент.
            if (scrollable && !isScrolledToBottom(scrollable)) {
              scrollPreventedAt.current = Date.now();
              return;
            }
            // Вверх осмыслен только как expand на следующий snap.
            if (!on || idx >= last) {
              scrollPreventedAt.current = Date.now();
              return;
            }
          }

          // Cooldown после край-скролла — чтобы инерционный долёт до края не закрывал/раскрывал sheet.
          if (Date.now() - scrollPreventedAt.current < SCROLL_LOCK_COOLDOWN_MS) return;

          committed.current = true;
          setIsDragging(true);
        }

        // Высота, привязанная к низу: вниз (delta>0) → меньше, вверх (delta<0) → больше.
        const nextHeight = Math.max(0, Math.min(startHeight.current - delta, maxSnapHeightPx.current));
        applyHeight(`${nextHeight}px`, false);
      };

      const finish = (cancelled: boolean) => (e: PointerEvent) => {
        if (e.pointerId !== pointerId.current) return;
        detachDocListeners();

        const wasCommitted = committed.current;
        const delta = lastDelta.current;
        const startH = startHeight.current;
        const maxH = maxSnapHeightPx.current;
        const elapsed = Math.max(1, Date.now() - startTime.current);
        const { hasSnapPoints: on, safeSnapPoints: snaps2 } = snapStateRef.current;

        pointerId.current = null;
        committed.current = false;
        lastDelta.current = 0;
        scrollPreventedAt.current = 0;
        startTarget.current = null;

        if (!wasCommitted) return;
        setIsDragging(false);

        if (cancelled) {
          applyHeight(resolveSnapCss(snapStateRef.current.currentSnap), true);
          return;
        }

        const velocity = delta / elapsed; // px/ms, вниз — положительная
        const currentHeightPx = Math.max(0, Math.min(startH - delta, maxH));

        if (on) {
          const target = findTargetSnap(snapHeightsPx.current, currentHeightPx, velocity);
          if (target === -1) {
            // Закрытие: высоту не трогаем (sheet уже сжат), уезжает leave-анимацией `.contentWrapper`.
            onClose();
          } else {
            setSnapIndex(target);
            if (snapIndexProp === undefined) {
              // Uncontrolled: state обновится синхронно (вето невозможно) — анимируем к target сразу.
              applyHeight(resolveSnapCss(snaps2[target]), true);
            } else {
              // Controlled: высоту ведёт проп. На следующем кадре выравниваем по фактическому
              // `currentSnap`: потребитель вернул target → анимируем к target; проигнорировал
              // `onSnapIndexChange` (вето) → возвращаем к исходному snap'у, а не «залипаем» на
              // release-позиции драга.
              if (isBrowser()) {
                vetoRaf.current = requestAnimationFrame(() => {
                  vetoRaf.current = 0;
                  if (!committed.current) applyHeight(resolveSnapCss(snapStateRef.current.currentSnap), true);
                });
              }
            }
          }
          return;
        }

        if (velocity > VELOCITY_THRESHOLD_PX_PER_MS || delta > startH * SINGLE_CLOSE_DISTANCE_RATIO) {
          onClose();
          return;
        }

        // Single fit-content: возврат к контентной высоте. Анимируем к px старта, затем отдаём auto.
        applyHeight(`${startH}px`, true);
        settleTimer.current = window.setTimeout(() => {
          settleTimer.current = 0;
          if (!committed.current) applyHeight('auto', false);
        }, SETTLE_TIMEOUT_MS);
      };

      detachDocListeners(); // safety: снять возможные висящие listener'ы прошлого жеста
      docListeners.current = { move, up: finish(false), cancel: finish(true) };
      if (isBrowser()) {
        document.addEventListener('pointermove', docListeners.current.move);
        document.addEventListener('pointerup', docListeners.current.up);
        document.addEventListener('pointercancel', docListeners.current.cancel);
      }
    },
    [swipeEnabled, isActive, applyHeight, onClose, setSnapIndex, detachDocListeners, snapIndexProp],
  );

  // Реакция на смену фазы sheet'а:
  //  - закрытие (isActive=false) → обрываем in-flight жест (иначе тянул бы закрывающийся sheet ещё
  //    CLOSING_TIMEOUT мс и `finish` мог бы повторно вызвать onClose); снап-индекс/высоту не трогаем,
  //    чтобы не мешать leave-анимации;
  //  - открытие (isActive=true) → выставляем чистую стартовую высоту по текущему snap'у: при быстром
  //    close→reopen в пределах CLOSING_TIMEOUT `.content` не перемонтируется, и без этого осталась бы
  //    inline-высота от прошлого жеста.
  useLayoutEffect(() => {
    if (isActive) {
      applyHeight(resolveSnapCss(snapStateRef.current.currentSnap), false);
    } else {
      resetGesture();
    }
  }, [isActive, applyHeight, resetGesture]);

  // Финальная очистка при размонтировании (onClose посреди drag'а и т.п.).
  useEffect(() => resetGesture, [resetGesture]);

  return {
    setContentNode,
    dragHandlers: { onPointerDown },
    snapIndex: hasSnapPoints ? safeIndex : undefined,
    isDragging,
  };
}
