import { SkeletonContextProvider } from '@ds/skeleton';
import { Row } from '@tanstack/react-table';
import { Virtualizer } from '@tanstack/react-virtual';
import { CSSProperties, ReactNode } from 'react';

import { TABLE_CSS_VARS } from '../../../../constants';
import { BodyRow } from '../../../../helperComponents';
import type { RowClickHandler } from '../../../../helperComponents/Rows/BodyRow';
import { RowAppearance } from '../../../types';
import styles from '../../styles.module.scss';

type TableRowsBodyProps<TData extends object> = {
  filteredTopRows: Row<TData>[];
  centerRows: Row<TData>[];
  rowVirtualizer: Virtualizer<HTMLElement, Element> | null;
  columnOrder: string[];
  rowAutoHeight?: boolean;
  onRowClick?: RowClickHandler<TData>;
  enableColumnsOrderSortByDrag?: boolean;
  rowSelectionAppearance?: RowAppearance;
  emptyState: ReactNode;
  showInfiniteLoadingTail: boolean;
  loadingTableRows: Row<TData>[];
  loadMoreButton?: ReactNode;
};

export function TableRowsBody<TData extends object>({
  filteredTopRows,
  centerRows,
  rowVirtualizer,
  columnOrder,
  rowAutoHeight,
  onRowClick,
  enableColumnsOrderSortByDrag,
  rowSelectionAppearance,
  emptyState,
  showInfiniteLoadingTail,
  loadingTableRows,
  loadMoreButton,
}: TableRowsBodyProps<TData>) {
  return (
    <>
      {filteredTopRows.length ? (
        <div className={styles.topRowWrapper}>
          {filteredTopRows.map(row => (
            <BodyRow
              key={row.id}
              row={row}
              onRowClick={onRowClick}
              rowAutoHeight={rowAutoHeight}
              columnOrder={columnOrder}
              enableColumnsOrderSortByDrag={enableColumnsOrderSortByDrag}
              disabledRowAppearance={RowAppearance.HideToggler}
            />
          ))}
        </div>
      ) : null}
      {rowVirtualizer ? (
        <div
          style={{
            position: 'relative',
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const row = centerRows[virtualRow.index];

            return (
              <div
                key={row.id}
                ref={rowVirtualizer.measureElement}
                data-index={virtualRow.index}
                className={styles.virtualRow}
                style={{ [TABLE_CSS_VARS.virtualRowStart]: `${virtualRow.start}px` } as CSSProperties}
              >
                <BodyRow
                  row={row}
                  onRowClick={onRowClick}
                  rowAutoHeight={rowAutoHeight}
                  columnOrder={columnOrder}
                  enableColumnsOrderSortByDrag={enableColumnsOrderSortByDrag}
                  disabledRowAppearance={rowSelectionAppearance}
                />
              </div>
            );
          })}
        </div>
      ) : (
        centerRows.map(row => (
          <BodyRow
            key={row.id}
            row={row}
            onRowClick={onRowClick}
            rowAutoHeight={rowAutoHeight}
            columnOrder={columnOrder}
            enableColumnsOrderSortByDrag={enableColumnsOrderSortByDrag}
            disabledRowAppearance={rowSelectionAppearance}
          />
        ))
      )}
      {showInfiniteLoadingTail ? (
        <SkeletonContextProvider loading={true}>
          {loadingTableRows.slice(0, 3).map(row => (
            <BodyRow
              key={row.id}
              row={row}
              columnOrder={columnOrder}
              enableColumnsOrderSortByDrag={enableColumnsOrderSortByDrag}
              disabledRowAppearance={rowSelectionAppearance}
            />
          ))}
        </SkeletonContextProvider>
      ) : null}
      {loadMoreButton}
      {emptyState}
    </>
  );
}
