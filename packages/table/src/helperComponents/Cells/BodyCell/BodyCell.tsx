import { Cell as TableCell, flexRender } from '@tanstack/react-table';
import cn from 'classnames';
import { CSSProperties } from 'react';

import { TEST_IDS } from '../../../constants';
import { useCellSizes, useColumnDragTransform } from '../../../hooks';
import { ColumnDefinition, ColumnOrder } from '../../../types';
import { Cell, CellProps } from '../Cell';
import styles from './styles.module.scss';

type BodyCellProps<TData> = Omit<CellProps, 'style' | 'children'> & {
  cell: TableCell<TData, unknown>;
  rowAutoHeight?: boolean;
  isDraggable?: boolean;
  columnOrder?: ColumnOrder;
};

type BodyCellViewProps<TData> = Omit<BodyCellProps<TData>, 'isDraggable' | 'columnOrder'> & {
  style: CSSProperties;
  isDragging?: boolean;
};
function BodyCellView<TData>({
  cell,
  className,
  rowAutoHeight,
  style,
  isDragging,
  ...props
}: BodyCellViewProps<TData>) {
  const columnDef = cell.column.columnDef as ColumnDefinition<TData>;

  return (
    <Cell
      {...props}
      style={style}
      className={cn(styles.tableBodyCell, className, columnDef.cellClassName)}
      data-row-auto-height={rowAutoHeight || undefined}
      data-align={columnDef.align}
      data-no-padding={columnDef.noBodyCellPadding || undefined}
      data-column-id={cell.column.id}
      data-dragging={isDragging || undefined}
      data-test-id={TEST_IDS.bodyCell}
    >
      {flexRender(columnDef.cell, cell.getContext())}
    </Cell>
  );
}

function StaticBodyCell<TData>(props: Omit<BodyCellProps<TData>, 'isDraggable' | 'columnOrder'>) {
  const style = useCellSizes(props.cell);

  return <BodyCellView {...props} style={style} />;
}

function DraggableBodyCell<TData>({
  columnOrder,
  ...props
}: Omit<BodyCellProps<TData>, 'isDraggable'> & { columnOrder: ColumnOrder }) {
  const { transform, isDragging } = useColumnDragTransform(props.cell.column.id, columnOrder);
  const style = useCellSizes(props.cell, { isDraggable: true, transform });

  return <BodyCellView {...props} style={style} isDragging={isDragging} />;
}

export function BodyCell<TData>({ isDraggable, columnOrder, ...props }: BodyCellProps<TData>) {
  if (isDraggable && columnOrder) {
    return <DraggableBodyCell {...props} columnOrder={columnOrder} />;
  }

  return <StaticBodyCell {...props} />;
}
