import { SkeletonContextProvider } from '@ds/skeleton';
import { Row, Table } from '@tanstack/react-table';
import { CSSProperties, Fragment, ReactNode } from 'react';

import { TABLE_CSS_VARS } from '../../../../constants';
import { TableCard } from '../../../../helperComponents';
import type { RowClickHandler } from '../../../../helperComponents/Rows/BodyRow';
import { RenderCardContext, RowAppearance } from '../../../types';
import styles from '../../styles.module.scss';

type TableCardsBodyProps<TData extends object> = {
  filteredTopRows: Row<TData>[];
  centerRows: Row<TData>[];
  table: Table<TData>;
  headlineId?: string;
  cardSelection: 'none' | 'single' | 'multiple';
  rowSelectionAppearance?: RowAppearance;
  suppressHeader: boolean;
  onRowClick?: RowClickHandler<TData>;
  renderCard?: (context: RenderCardContext<TData>) => ReactNode;
  cardsListProps: {
    className: string;
    style?: CSSProperties;
    'data-fixed-columns'?: boolean;
  };
  emptyState: ReactNode;
  showInfiniteLoadingTail: boolean;
  loadingTableRows: Row<TData>[];
  loadingTable: Table<TData>;
  loadMoreButton?: ReactNode;
};

export function TableCardsBody<TData extends object>({
  filteredTopRows,
  centerRows,
  table,
  headlineId,
  cardSelection,
  rowSelectionAppearance,
  suppressHeader,
  onRowClick,
  renderCard,
  cardsListProps,
  emptyState,
  showInfiniteLoadingTail,
  loadingTableRows,
  loadingTable,
  loadMoreButton,
}: TableCardsBodyProps<TData>) {
  const renderContentCard = (row: Row<TData>, selectionAppearance?: RowAppearance) => {
    const defaultRender = (
      <TableCard
        headlineId={headlineId}
        row={row}
        table={table}
        selection={cardSelection}
        selectionAppearance={selectionAppearance}
        suppressHeader={suppressHeader}
        onRowClick={onRowClick}
      />
    );

    return <Fragment key={row.id}>{renderCard ? renderCard({ row, table, defaultRender }) : defaultRender}</Fragment>;
  };

  return (
    <>
      <div {...cardsListProps}>
        {filteredTopRows.map(row => renderContentCard(row, RowAppearance.HideToggler))}
        {centerRows.map(row => renderContentCard(row, rowSelectionAppearance))}
      </div>
      {showInfiniteLoadingTail ? (
        <SkeletonContextProvider loading={true}>
          <div {...cardsListProps}>
            {loadingTableRows.slice(0, 3).map(row => (
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
      ) : null}
      {loadMoreButton}
      {emptyState}
    </>
  );
}

export function getCardsListProps({
  isMobile,
  cardMinWidth,
  cardColumns,
}: {
  isMobile: boolean;
  cardMinWidth?: number;
  cardColumns?: number;
}) {
  const cardsGridProps = {
    className: styles.cardsGrid,
    style: {
      ...(cardMinWidth ? { [TABLE_CSS_VARS.cardMinWidth]: `${cardMinWidth}px` } : {}),
      ...(cardColumns ? { [TABLE_CSS_VARS.cardColumns]: String(cardColumns) } : {}),
    } as CSSProperties,
    ...(cardColumns ? { 'data-fixed-columns': true as const } : {}),
  };

  return isMobile ? { className: styles.mobileCardsList } : cardsGridProps;
}

export function getMobileTableClassName() {
  return styles.mobileTable;
}
