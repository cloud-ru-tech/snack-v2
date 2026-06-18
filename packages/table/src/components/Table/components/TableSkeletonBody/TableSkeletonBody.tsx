import { SkeletonContextProvider } from '@ds/skeleton';
import { Row, Table } from '@tanstack/react-table';
import { CSSProperties } from 'react';

import { BodyRow, HeaderRow, TableCard } from '../../../../helperComponents';
import { RowAppearance } from '../../../types';

type TableSkeletonBodyProps<TData extends object> = {
  variant: 'table' | 'cards';
  loadingTableRows: Row<TData>[];
  loadingTable: Table<TData>;
  columnOrder: string[];
  rowAutoHeight?: boolean;
  rowSelectionAppearance?: RowAppearance;
  usePageStickyHeader: boolean;
  showHeader: boolean;
  headlineId?: string;
  suppressHeader: boolean;
  cardsListProps: {
    className: string;
    style?: CSSProperties;
    'data-fixed-columns'?: boolean;
  };
  tableScrollRowsOnly?: boolean;
};

export function TableSkeletonBody<TData extends object>({
  variant,
  loadingTableRows,
  loadingTable,
  columnOrder,
  rowAutoHeight,
  rowSelectionAppearance,
  usePageStickyHeader,
  showHeader,
  headlineId,
  suppressHeader,
  cardsListProps,
  tableScrollRowsOnly = false,
}: TableSkeletonBodyProps<TData>) {
  if (variant === 'cards') {
    return (
      <SkeletonContextProvider loading={true}>
        <div {...cardsListProps}>
          {loadingTableRows.map(row => (
            <TableCard
              key={row.id}
              headlineId={headlineId}
              row={row}
              table={loadingTable}
              selection='none'
              suppressHeader={suppressHeader}
            />
          ))}
        </div>
      </SkeletonContextProvider>
    );
  }

  const rows = loadingTableRows.map(row => (
    <BodyRow
      key={row.id}
      row={row}
      rowAutoHeight={rowAutoHeight}
      columnOrder={columnOrder}
      disabledRowAppearance={rowSelectionAppearance}
    />
  ));

  if (tableScrollRowsOnly) {
    return <SkeletonContextProvider loading={true}>{rows}</SkeletonContextProvider>;
  }

  return (
    <SkeletonContextProvider loading={true}>
      {!usePageStickyHeader && showHeader ? (
        <HeaderRow rowAutoHeight={rowAutoHeight} columnOrder={columnOrder} />
      ) : null}
      {rows}
    </SkeletonContextProvider>
  );
}
