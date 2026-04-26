import cn from 'classnames';
import { type CSSProperties, type PointerEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ROW_REL } from './constants';
import styles from './styles.module.scss';
import { mod, nearestInSortedValues } from './utils';

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

/**
 * Колонка «барабана»: 5 строк в DOM, значения по кругу в пределах `options`.
 */
export function TimePickerDrumWheelColumn({
  options,
  value,
  onChange,
  itemHeight,
  height,
  formatLabel,
  className,
  'data-test-id': dataTestId,
}: TimePickerDrumWheelColumnProps) {
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

  const commitDrag = useCallback(() => {
    const list = optionsRef.current;
    const len = list.length;
    if (len === 0) {
      setDragOffset(0);
      return;
    }

    const off = dragOffsetRef.current;
    const steps = Math.round(off / itemHeight);
    if (steps !== 0) {
      const idx = resolveIndex(list, valueRef.current);
      onChange(list[mod(idx - steps, len)]);
    }
    setDragOffset(0);
  }, [itemHeight, onChange, resolveIndex]);

  const flushWheel = useCallback(() => {
    const list = optionsRef.current;
    const len = list.length;
    if (len === 0) {
      return;
    }

    const steps = Math.round(wheelAccum.current / itemHeight);
    wheelAccum.current = 0;
    if (steps !== 0) {
      const idx = resolveIndex(list, valueRef.current);
      onChange(list[mod(idx - steps, len)]);
    }
  }, [itemHeight, onChange, resolveIndex]);

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
    },
    [],
  );

  const onPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    startY.current = event.clientY;
    startOffset.current = dragOffsetRef.current;
  }, []);

  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }
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
      className={cn(className)}
      data-test-id={dataTestId}
      onLostPointerCapture={commitDrag}
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
                  <span aria-hidden className={styles.stateLayer} data-state='regularFilled' />
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
}
