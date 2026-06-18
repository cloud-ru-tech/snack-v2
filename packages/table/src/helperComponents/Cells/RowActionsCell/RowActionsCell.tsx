import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Droplist, DroplistProps, isBaseItemProps } from '@ds/list';
import { CellContext, Row } from '@tanstack/react-table';
import { MouseEvent, useCallback, useMemo } from 'react';

import { RowAppearance } from '../../../components/types';
import { COLUMN_PIN_POSITION, DefaultColumns, TEST_IDS } from '../../../constants';
import { useRowContext } from '../../../contexts';
import { ColumnDefinition } from '../../../types';
import { RowActionsButton } from './components';
import styles from './styles.module.scss';

export type ActionsGenerator<TData> = (cell: CellContext<TData, unknown>) => DroplistProps['items'];

export type RowActionsColumnDefProps<TData> = {
  /** Действия для строки */
  actionsGenerator: ActionsGenerator<TData>;
  /** Закрепление колонки справа в таблице */
  pinned?: boolean;
};

type RowAction = DroplistProps['items'][number];

type RowActionsCellProps<TData> = {
  row: Row<TData>;
  actions: DroplistProps['items'];
};

function RowActionsCell<TData>({ row, actions }: RowActionsCellProps<TData>) {
  const { dropListOpened, setDropListOpen, disabledRowAppearance } = useRowContext();
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);

  const patchItem = useCallback((item: RowAction, cb: (e: MouseEvent) => void): RowAction => {
    if (isBaseItemProps(item)) {
      return {
        ...item,
        onClick(e: MouseEvent<HTMLElement>) {
          item.onClick?.(e);
          cb(e);
        },
      };
    }

    return {
      ...item,
      items: item.items.map((i: RowAction) => patchItem(i, cb)),
    };
  }, []);

  const canSelect = row.getCanSelect();
  const shouldShowActions = isMobile
    ? canSelect && Boolean(actions.length)
    : canSelect || disabledRowAppearance !== RowAppearance.Disabled;

  const stopPropagationClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const patchedItems = useMemo(
    () => actions.map(item => patchItem(item, () => setDropListOpen(false))),
    [actions, patchItem, setDropListOpen],
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onClick={stopPropagationClick}
      className={styles.rowActionsCellWrap}
      data-row-actions-wrap
      data-open={dropListOpened || undefined}
    >
      {shouldShowActions && Boolean(actions.length) && (
        <Droplist
          trigger='click'
          open={dropListOpened}
          onOpenChange={setDropListOpen}
          placement='bottom-end'
          size='m'
          data-test-id={TEST_IDS.rowActions.droplist}
          items={patchedItems}
        >
          <RowActionsButton />
        </Droplist>
      )}
    </div>
  );
}

/** Вспомогательная функция для создания ячейки с дополнительными действиями у строки */
export function getRowActionsColumnDef<TData>({
  actionsGenerator,
  pinned,
}: RowActionsColumnDefProps<TData>): ColumnDefinition<TData> {
  return {
    id: DefaultColumns.RowActions,
    pinned: pinned ? COLUMN_PIN_POSITION.Right : undefined,
    meta: {
      skipOnExport: true,
    },
    noBodyCellPadding: true,
    cellClassName: styles.rowActionsCell,
    enableResizing: false,
    header: () => <RowActionsButton variant='placeholder' />,
    headerClassName: styles.rowActionsHeader,
    cell: cell => <RowActionsCell row={cell.row} actions={actionsGenerator(cell)} />,
  } as ColumnDefinition<TData>;
}
