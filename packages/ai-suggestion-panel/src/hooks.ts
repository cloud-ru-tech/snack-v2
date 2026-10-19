import { useLayoutEffect } from '@ds/utils';
import { RefObject, useCallback, useRef, useState } from 'react';

import { getVisibleItemsCount } from './utils';

/** Атрибут ячеек ряда замера: `item` — вопрос, `more` — «+N». */
export const MEASURE_ATTR = 'data-measure';

const sumWidths = (cells: Element[]) => cells.reduce((sum, cell) => sum + cell.getBoundingClientRect().width, 0);

/**
 * Сколько вопросов показывать в полосе. Ширины берутся из скрытого ряда замера, поэтому
 * учитываются шрифты, размер и Loading (сегмент становится шире).
 */
export function useVisibleItems(rootRef: RefObject<HTMLElement>, measureRef: RefObject<HTMLElement>) {
  const [visibleCount, setVisibleCount] = useState<number | undefined>(undefined);
  const frameRef = useRef<number>();

  const recalculate = useCallback(() => {
    const root = rootRef.current;
    const row = measureRef.current;

    if (!root || !row) return;

    const itemCells = Array.from(row.querySelectorAll(`[${MEASURE_ATTR}='item']`));
    const moreCells = Array.from(row.querySelectorAll(`[${MEASURE_ATTR}='more']`));
    const itemWidths = itemCells.map(cell => cell.getBoundingClientRect().width);
    const moreWidth = sumWidths(moreCells);

    setVisibleCount(
      getVisibleItemsCount({
        containerWidth: root.getBoundingClientRect().width,
        fixedWidth: row.getBoundingClientRect().width - sumWidths(itemCells) - moreWidth,
        itemWidths,
        moreWidth,
      }),
    );
  }, [rootRef, measureRef]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const row = measureRef.current;

    if (!root || !row) return;

    recalculate();

    const observer = new ResizeObserver(() => {
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(recalculate);
    });

    observer.observe(root);
    observer.observe(row);

    return () => {
      observer.disconnect();
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
    };
  }, [recalculate, rootRef, measureRef]);

  return { visibleCount, recalculate };
}
