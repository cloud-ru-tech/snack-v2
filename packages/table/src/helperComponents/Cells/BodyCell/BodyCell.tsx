import { useSortable } from '@dnd-kit/sortable';
import { Cell as TableCell, flexRender } from '@tanstack/react-table';
import cn from 'classnames';
import { CSSProperties } from 'react';

import { TEST_IDS } from '../../../constants';
import { useCellSizes } from '../../../hooks';
import { ColumnDefinition } from '../../../types';
import { Cell, CellProps } from '../Cell';
import styles from './styles.module.scss';

type BodyCellProps<TData> = Omit<CellProps, 'style' | 'children'> & {
  cell: TableCell<TData, unknown>;
  rowAutoHeight?: boolean;
  isDraggable?: boolean;
};

type BodyCellViewProps<TData> = Omit<BodyCellProps<TData>, 'isDraggable'> & {
  style: CSSProperties;
  setNodeRef?: (node: HTMLDivElement | null) => void;
};
function BodyCellView<TData>({
  cell,
  className,
  rowAutoHeight,
  style,
  setNodeRef,
  ...props
}: BodyCellViewProps<TData>) {
  const columnDef = cell.column.columnDef as ColumnDefinition<TData>;

  return (
    <Cell
      {...props}
      ref={setNodeRef}
      style={style}
      className={cn(styles.tableBodyCell, className, columnDef.cellClassName)}
      data-row-auto-height={rowAutoHeight || undefined}
      data-align={columnDef.align}
      data-no-padding={columnDef.noBodyCellPadding || undefined}
      data-column-id={cell.column.id}
      data-test-id={TEST_IDS.bodyCell}
    >
      {flexRender(columnDef.cell, cell.getContext())}
    </Cell>
  );
}

function StaticBodyCell<TData>(props: Omit<BodyCellProps<TData>, 'isDraggable'>) {
  const style = useCellSizes(props.cell);

  return <BodyCellView {...props} style={style} />;
}

function DraggableBodyCell<TData>(props: Omit<BodyCellProps<TData>, 'isDraggable'>) {
  const { setNodeRef, isDragging, transform } = useSortable({ id: props.cell.column.id });
  const style = useCellSizes(props.cell, { isDraggable: true, isDragging, transform });

  return <BodyCellView {...props} style={style} setNodeRef={setNodeRef} />;
}

export function BodyCell<TData>({ isDraggable, ...props }: BodyCellProps<TData>) {
  if (isDraggable) {
    return <DraggableBodyCell {...props} />;
  }

  return <StaticBodyCell {...props} />;
}
