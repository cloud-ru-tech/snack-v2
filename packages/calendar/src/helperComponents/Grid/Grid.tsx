import { CSSProperties, useMemo } from 'react';

import { GRID_SIZE, VIEW_MODE } from '../../constants';
import { useCalendarContext } from '../../hooks';
import { Cell } from '../../types';
import { Item } from '../Item';
import { WeekRow } from '../WeekRow';
import styles from './styles.module.scss';

export type GridProps = {
  grid: Cell[][];
};

export function Grid({ grid }: GridProps) {
  const { size, viewMode, fitToContainer } = useCalendarContext();

  const gridConfig: CSSProperties = useMemo(() => {
    const { columns } = GRID_SIZE[viewMode];
    return {
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    };
  }, [viewMode]);

  return (
    <div className={styles.grid} data-fit-to-container={fitToContainer || undefined} style={gridConfig}>
      {viewMode === VIEW_MODE.Month && <WeekRow />}
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Item
            key={`${cell.label}_${rowIndex}_${colIndex}`}
            label={cell.label}
            size={size}
            checked={cell.checked}
            rangePosition={cell.rangePosition}
            disabled={cell.disabled}
            holiday={cell.holiday}
            another={cell.another}
            current={cell.current}
            visible
            tabIndex={cell.tabIndex}
            address={cell.address}
            date={cell.date}
            onSelect={cell.onSelect}
            onPreselect={cell.onPreselect}
            onLeave={cell.onLeave}
            onKeyDown={cell.onKeyDown}
          />
        )),
      )}
    </div>
  );
}
