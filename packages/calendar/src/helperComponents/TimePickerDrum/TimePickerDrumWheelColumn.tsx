import { isBrowser } from '@ds/utils';
import cn from 'classnames';
import {
  CSSProperties,
  forwardRef,
  PointerEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ROW_REL } from './constants';
import styles from './styles.module.scss';
import { mod, nearestInSortedValues } from './utils';

/** Инерция барабана (iOS-подобный «доворот»): затухание скорости за мс и пороги остановки/запуска. */
const MOMENTUM_DECAY_PER_MS = 0.9966;
/** Ниже этой |скорости| (px/ms) инерция останавливается и колонка доводится до ближайшего значения. */
const MOMENTUM_STOP_VELOCITY = 0.02;
/** Минимальная |скорость| отпускания (px/ms), запускающая инерцию; ниже — сразу snap. */
const MOMENTUM_MIN_FLING_VELOCITY = 0.05;

export type TimePickerDrumWheelColumnProps = {
  /**
   * Допустимые значения колонки: отсортированный по возрастанию список без дубликатов.
   * Циклическая прокрутка выполняется только по индексам этого массива.
   */
  options: number[];
  /** Текущее выбранное значение; должно входить в `options` (иначе для отображения берётся ближайшее из списка). */
  value: number;
  /** Вызывается при смене значения после жеста (отпускание / `lostpointercapture`) или после паузы при прокрутке колесом. */
  onChange(value: number): void;
  /** Высота одной строки барабана в пикселях (шаг дискретизации при перетаскивании и колесе). */
  itemHeight: number;
  /** Высота видимой области колонки («окна») в пикселях. */
  height: number;
  /** Форматирование подписи в ячейке (например с ведущим нулём для минут). */
  formatLabel(value: number): string;
  /** Дополнительный CSS-класс корневого элемента колонки (обёртка с обработчиками указателя). */
  className?: string;
  /** Идентификатор для автотестов на корневом элементе колонки. */
  'data-test-id'?: string;
};

/** Императивный интерфейс колонки: форсит «оседание» незавершённого жеста (инерция/колесо) в `onChange`. */
export type TimePickerDrumWheelColumnHandle = {
  /**
   * Синхронно завершает незакоммиченный жест (инерцию и/или колесо), вызывая `onChange` немедленно,
   * и возвращает итоговое значение колонки. Нужен, чтобы быстрое закрытие/переход не терял значение,
   * которое иначе закоммитилось бы только после доворота (см. FF-8654, комментарий #2).
   */
  flush(): number;
};

/**
 * Колонка «барабана»: 5 строк в DOM, значения по кругу в пределах `options`.
 */
export const TimePickerDrumWheelColumn = forwardRef<TimePickerDrumWheelColumnHandle, TimePickerDrumWheelColumnProps>(
  function TimePickerDrumWheelColumn(
    { options, value, onChange, itemHeight, height, formatLabel, className, 'data-test-id': dataTestId },
    ref,
  ) {
    const n = options.length;

    const [dragOffset, setDragOffset] = useState(0);
    const dragOffsetRef = useRef(0);
    const valueRef = useRef(value);
    const optionsRef = useRef(options);
    const startY = useRef(0);
    const startOffset = useRef(0);
    const wheelAccum = useRef(0);
    const wheelTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const viewportRef = useRef<HTMLDivElement>(null);
    // Инерция: скорость отпускания (px/ms), отметка последнего move и хэндл rAF-цикла доворота.
    const velocityRef = useRef(0);
    const lastMoveRef = useRef<{ y: number; t: number }>({ y: 0, t: 0 });
    const momentumRaf = useRef(0);

    useEffect(() => {
      dragOffsetRef.current = dragOffset;
    }, [dragOffset]);

    useEffect(() => {
      valueRef.current = value;
    }, [value]);

    useEffect(() => {
      optionsRef.current = options;
    }, [options]);

    useEffect(() => {
      setDragOffset(0);
    }, [value, options]);

    const valueIdx = useMemo(() => {
      const i = options.indexOf(value);
      if (i >= 0) {
        return i;
      }
      return options.indexOf(nearestInSortedValues(options, value));
    }, [options, value]);

    const stepsRounded = Math.round(dragOffset / itemHeight);
    const previewIndex = n > 0 ? mod(valueIdx - stepsRounded, n) : 0;
    const dragRemainderPx = dragOffset - stepsRounded * itemHeight;

    const resolveIndex = useCallback((list: number[], raw: number) => {
      let idx = list.indexOf(raw);
      if (idx >= 0) {
        return idx;
      }
      idx = list.indexOf(nearestInSortedValues(list, raw));
      return idx >= 0 ? idx : 0;
    }, []);

    const commitDrag = useCallback((): number | null => {
      const list = optionsRef.current;
      const len = list.length;
      if (len === 0) {
        setDragOffset(0);
        return null;
      }

      const off = dragOffsetRef.current;
      const steps = Math.round(off / itemHeight);
      let committed: number | null = null;
      if (steps !== 0) {
        const idx = resolveIndex(list, valueRef.current);
        committed = list[mod(idx - steps, len)];
        onChange(committed);
      }
      setDragOffset(0);
      return committed;
    }, [itemHeight, onChange, resolveIndex]);

    const cancelMomentum = useCallback(() => {
      if (momentumRaf.current) {
        cancelAnimationFrame(momentumRaf.current);
        momentumRaf.current = 0;
      }
    }, []);

    /**
     * Инерционный «доворот» после отпускания (iOS-подобный): колонка продолжает крутиться по скорости
     * жеста с экспоненциальным затуханием, затем доводится до ближайшего значения (`commitDrag`).
     * При скорости ниже порога снап происходит сразу. Использует timestamp из rAF (без `performance.now`).
     */
    const startMomentum = useCallback(() => {
      const v0 = velocityRef.current;
      velocityRef.current = 0;

      if (!isBrowser() || !Number.isFinite(v0) || Math.abs(v0) < MOMENTUM_MIN_FLING_VELOCITY) {
        commitDrag();
        return;
      }

      let velocity = v0;
      let last = 0;
      const tick = (now: number) => {
        if (last === 0) {
          last = now;
          if (isBrowser()) {
            momentumRaf.current = requestAnimationFrame(tick);
          }
          return;
        }
        const dt = Math.max(1, now - last);
        last = now;

        dragOffsetRef.current += velocity * dt;
        setDragOffset(dragOffsetRef.current);
        velocity *= MOMENTUM_DECAY_PER_MS ** dt;

        if (Math.abs(velocity) < MOMENTUM_STOP_VELOCITY) {
          momentumRaf.current = 0;
          commitDrag();
          return;
        }
        if (isBrowser()) {
          momentumRaf.current = requestAnimationFrame(tick);
        }
      };
      if (isBrowser()) {
        momentumRaf.current = requestAnimationFrame(tick);
      }
    }, [commitDrag]);

    const flushWheel = useCallback((): number | null => {
      const list = optionsRef.current;
      const len = list.length;
      if (len === 0) {
        return null;
      }

      const steps = Math.round(wheelAccum.current / itemHeight);
      wheelAccum.current = 0;
      if (steps !== 0) {
        const idx = resolveIndex(list, valueRef.current);
        const committed = list[mod(idx - steps, len)];
        onChange(committed);
        return committed;
      }
      return null;
    }, [itemHeight, onChange, resolveIndex]);

    // Форсит завершение незакоммиченного жеста (инерция + колесо) синхронно и возвращает итоговое значение.
    const flush = useCallback((): number => {
      cancelMomentum();
      const wheeled = flushWheel();
      const dragged = commitDrag();
      return dragged ?? wheeled ?? valueRef.current;
    }, [cancelMomentum, commitDrag, flushWheel]);

    useImperativeHandle(ref, () => ({ flush }), [flush]);

    useEffect(() => {
      const el = viewportRef.current;
      if (!el) {
        return;
      }

      const onWheelNative = (event: WheelEvent) => {
        if (event.cancelable) {
          event.preventDefault();
        }
        let delta = event.deltaY * 0.12;
        if (Math.abs(delta) < itemHeight * 0.25) {
          delta = itemHeight * 0.35 * Math.sign(event.deltaY);
        }
        wheelAccum.current += delta;
        window.clearTimeout(wheelTimer.current);
        wheelTimer.current = setTimeout(() => {
          flushWheel();
        }, 180);
      };

      el.addEventListener('wheel', onWheelNative, { passive: false });
      return () => {
        el.removeEventListener('wheel', onWheelNative);
      };
    }, [flushWheel, itemHeight]);

    useEffect(
      () => () => {
        window.clearTimeout(wheelTimer.current);
        cancelMomentum();
      },
      [cancelMomentum],
    );

    const onPointerDown = useCallback(
      (event: PointerEvent<HTMLDivElement>) => {
        cancelMomentum();
        event.currentTarget.setPointerCapture(event.pointerId);
        startY.current = event.clientY;
        startOffset.current = dragOffsetRef.current;
        velocityRef.current = 0;
        lastMoveRef.current = { y: event.clientY, t: event.timeStamp };
      },
      [cancelMomentum],
    );

    const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        return;
      }
      const dt = event.timeStamp - lastMoveRef.current.t;
      if (dt > 0) {
        velocityRef.current = (event.clientY - lastMoveRef.current.y) / dt;
      }
      lastMoveRef.current = { y: event.clientY, t: event.timeStamp };
      setDragOffset(startOffset.current + (event.clientY - startY.current));
    }, []);

    const onPointerUp = useCallback((event: PointerEvent<HTMLDivElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    }, []);

    const onPointerCancel = useCallback((event: PointerEvent<HTMLDivElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    }, []);

    const trackTranslate = height / 2 - itemHeight / 2 - 2 * itemHeight + dragRemainderPx;

    if (n === 0) {
      return null;
    }

    return (
      <div
        className={className}
        data-test-id={dataTestId}
        onLostPointerCapture={startMomentum}
        onPointerCancel={onPointerCancel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div
          ref={viewportRef}
          className={styles.wheelViewport}
          style={
            {
              height,
              '--wheel-item': `${itemHeight}px`,
            } as CSSProperties
          }
        >
          <div className={styles.wheelFadingWrapper}>
            <div className={styles.wheelTrack} style={{ '--wheel-translate': `${trackTranslate}px` }}>
              {ROW_REL.map(rel => {
                const cellValue = options[mod(previewIndex + rel, n)];
                const selected = rel === 0;
                return (
                  <div
                    key={rel}
                    className={cn(styles.wheelRow, styles.itemCell, selected && styles.itemCellSelected)}
                    style={{ '--wheel-item': `${itemHeight}px` }}
                  >
                    <span aria-hidden className={styles.stateLayer} data-state='emptyNeutralOnBackground' />
                    <span className={styles.itemLabel}>{formatLabel(cellValue)}</span>
                  </div>
                );
              })}
            </div>
            <div className={styles.wheelFadeTop} aria-hidden />
            <div className={styles.wheelFadeBottom} aria-hidden />
            <div className={styles.wheelSlotLines} aria-hidden>
              <span className={styles.wheelSlotLine} />
              <span className={styles.wheelSlotLine} />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
