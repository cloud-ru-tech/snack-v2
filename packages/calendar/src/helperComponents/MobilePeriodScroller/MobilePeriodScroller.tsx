import { Scroll } from '@ds/scroll';
import { useLayoutEffect } from '@ds/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { CSSProperties, useCallback, useRef, useState } from 'react';

import { Size, ViewMode } from '../../types';
import { LevelConfig } from '../MobileCalendar/levelConfig';
import { MobilePeriodBlock } from '../MobilePeriodBlock';
import styles from './styles.module.scss';

/**
 * Первичная оценка высоты блока (px) по размеру — до первого замера. Взята по самому высокому блоку
 * (6-недельный месяц) на каждом размере, чтобы оценка НЕ была меньше реального блока: иначе на первом
 * кадре строки позиционируются с шагом меньше их высоты и налезают друг на друга (заметно на size L —
 * FF-8654). Точная высота каждой строки уточняется `measureElement`; занижение исключено running-max'ом.
 */
const ESTIMATE_BY_SIZE: Record<Size, number> = {
  s: 276,
  m: 328,
  l: 376,
};

export type MobilePeriodScrollerProps = {
  level: ViewMode;
  config: LevelConfig;
  size: Size;
  /** Дата, на период которой центрируется скролл (при маунте и смене). */
  anchorDate: Date;
  /** Выбор ячейки (tap). */
  onSelect(date: Date): void;
};

/**
 * Вертикальный скролл периодов (диапазон широкий — воспринимается безграничным). Скролл-контейнер — `@ds/scroll` (DS-пилюля); его
 * OverlayScrollbars-viewport берётся виртуализатором как scroll-элемент. Хост `@ds/scroll` заполняет
 * body sheet'а (`.scrollHost` height:100%), поэтому именно viewport (computed `overflow-y:auto`)
 * резолвится drag-движком bottom-sheet'а как scrollable-ancestor — handoff drag-vs-scroll сохраняется.
 * Диапазон фиксирован и симметричен (см. `levelConfig`), на маунте центрируется на `anchorDate`.
 *
 * Ключуется по `level` родителем — смена уровня даёт чистый remount (и реинициализацию OS).
 */
export function MobilePeriodScroller({ level, config, size, anchorDate, onSelect }: MobilePeriodScrollerProps) {
  // `@ds/scroll` (OverlayScrollbars) разрешает ref в viewport только после инициализации инстанса;
  // до этого `innerScrollRef.current === null`, и виртуализатор рендерит пустой контейнер. Флаг
  // поднимается из `onInitialized` и форсит повторное чтение scroll-элемента + `measure()`.
  const innerScrollRef = useRef<HTMLElement | null>(null);
  const [scrollElementReady, setScrollElementReady] = useState(false);
  // Оценка высоты строки = МАКСИМУМ измеренных блоков, не «первый»: блоки разной высоты (5- и
  // 6-недельные месяцы), и если оценить по 5-недельному, то более высокий 6-недельный, прокрученный
  // в вид, на кадр налезал бы. Растёт по мере появления более высоких блоков; занижение исключено.
  const [maxRowSize, setMaxRowSize] = useState<number | null>(null);
  // Однократный ре-скролл к anchorDate после первого замера. Сбрасывается при смене anchorDate.
  const didInitialScrollRef = useRef(false);

  const virtualizer = useVirtualizer({
    count: config.count,
    getScrollElement: () => (scrollElementReady ? innerScrollRef.current : null),
    estimateSize: () => maxRowSize ?? ESTIMATE_BY_SIZE[size],
    overscan: 4,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const handleInitialized = useCallback(() => setScrollElementReady(true), []);

  // Смена anchorDate (drill / level-up / Current) — центрируем заново.
  useLayoutEffect(() => {
    didInitialScrollRef.current = false;
  }, [anchorDate]);

  // Центрирование на anchorDate. Первичный `scrollToIndex` идёт по грубой оценке и «промахивается»,
  // поэтому повторяется после первого замера (`maxRowSize`), затем фиксируется флагом — чтобы рост
  // оценки при свободной прокрутке не дёргал пользователя обратно к anchorDate.
  useLayoutEffect(() => {
    if (!scrollElementReady || didInitialScrollRef.current) {
      return;
    }
    virtualizer.measure();
    // indexAt далёкой от origin даты может выйти за [0, count-1] — клампим.
    const target = Math.max(0, Math.min(config.count - 1, config.indexAt(anchorDate)));
    virtualizer.scrollToIndex(target, { align: 'start' });
    if (maxRowSize !== null) {
      didInitialScrollRef.current = true;
    }
  }, [scrollElementReady, anchorDate, config, virtualizer, maxRowSize]);

  // Running-max реальных высот блоков в виду — точная оценка без «скачка» и без занижения (как в
  // ListPrivate, но по максимуму, а не по первому блоку).
  useLayoutEffect(() => {
    if (!scrollElementReady) {
      return;
    }
    const rows = innerScrollRef.current?.querySelectorAll<HTMLElement>('[data-index]');
    if (!rows?.length) {
      return;
    }
    let max = 0;
    rows.forEach(row => {
      max = Math.max(max, row.offsetHeight);
    });
    if (max > 0) {
      setMaxRowSize(prev => (prev === null || max > prev ? max : prev));
    }
  }, [scrollElementReady, virtualItems.length]);

  return (
    <Scroll ref={innerScrollRef} className={styles.scrollHost} onInitialized={handleInitialized}>
      <div className={styles.virtualContainer} style={{ height: virtualizer.getTotalSize() }}>
        {virtualItems.map(virtualRow => (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={virtualizer.measureElement}
            className={styles.virtualRow}
            style={{ '--virtual-row-offset': `${virtualRow.start}px` } as CSSProperties}
          >
            <MobilePeriodBlock
              date={config.dateAt(virtualRow.index)}
              level={level}
              config={config}
              size={size}
              onSelect={onSelect}
            />
          </div>
        ))}
      </div>
    </Scroll>
  );
}
