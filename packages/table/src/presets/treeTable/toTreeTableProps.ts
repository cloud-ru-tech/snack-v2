import { Row, RowSelectionState } from '@tanstack/react-table';

import { CardViewInput, defineColumns, mapCardViewProps, SimpleColumnDef } from '../../columnUtils';
import { ClientTableProps } from '../../components/types';
import { ExpandedState } from '../../types';
import { wrapGetRowId } from '../wrapGetRowId';

type TreeTablePrimaryColumn<TData extends object> = {
  key: keyof TData & string;
  header: string;
  width?: number;
  showToggle?: boolean;
  /** Показывать линии-направляющие вложенности в tree-ячейке */
  showLines?: boolean;
};

type TreeTableSelectionConfig<TData extends object> = {
  multiRow?: boolean;
  enable?: boolean | ((row: TData) => boolean);
  onChange?: (state: RowSelectionState) => void;
  state?: RowSelectionState;
  initialState?: RowSelectionState;
};

/** Входные пропсы `TreeTable` / `useTreeTableProps` */
export type TreeTableInput<TData extends object> = CardViewInput<TData> & {
  data: TData[];
  getChildren: (row: TData) => TData[] | undefined;
  primaryColumn: TreeTablePrimaryColumn<TData>;
  secondaryColumns?: SimpleColumnDef<TData>[];
  selection?: TreeTableSelectionConfig<TData>;
  expandingInitialState?: ExpandedState;
  expandingState?: ExpandedState;
  onExpandingChange?: (state: ExpandedState) => void;
  getRowId: (row: TData) => string;
} & Omit<
    ClientTableProps<TData>,
    | 'data'
    | 'columnDefinitions'
    | 'getRowId'
    | 'headlineId'
    | 'expanding'
    | 'suppressPagination'
    | 'rowSelection'
    | 'rowPinning'
  >;

function getExpandingShowToggle(showToggle: boolean | undefined, hasSelection: boolean) {
  if (showToggle !== undefined) {
    return { showToggle };
  }

  if (hasSelection) {
    return { showToggle: true };
  }

  return {};
}

function mapSelectionEnable<TData extends object>(
  enable: TreeTableSelectionConfig<TData>['enable'],
): boolean | ((row: Row<TData>) => boolean) {
  if (typeof enable === 'function') {
    return (row: Row<TData>) => enable(row.original);
  }

  return enable ?? true;
}

/** Маппинг упрощённых пропсов в `ClientTableProps` для `Table` */
export function toTreeTableProps<TData extends object>(input: TreeTableInput<TData>): ClientTableProps<TData> {
  const {
    data,
    getChildren,
    primaryColumn,
    secondaryColumns = [],
    selection,
    expandingInitialState,
    expandingState,
    onExpandingChange,
    getRowId,
    headlineKey,
    defaultView,
    view,
    onViewChange,
    renderCard,
    outline,
    ...rest
  } = input;

  return {
    ...rest,
    ...mapCardViewProps({ headlineKey, defaultView, view, onViewChange, renderCard }),
    data,
    columnDefinitions: defineColumns(secondaryColumns),
    getRowId: wrapGetRowId(getRowId),
    suppressPagination: true,
    outline: outline ?? true,
    expanding: {
      getSubRows: getChildren,
      expandingColumnDefinition: {
        accessorKey: primaryColumn.key,
        header: primaryColumn.header,
        ...(primaryColumn.width !== undefined ? { minSize: primaryColumn.width } : {}),
        ...(primaryColumn.showLines !== undefined ? { showLines: primaryColumn.showLines } : {}),
        ...getExpandingShowToggle(primaryColumn.showToggle, Boolean(selection)),
      },
      ...(expandingInitialState !== undefined ? { initialState: expandingInitialState } : {}),
      ...(expandingState !== undefined ? { state: expandingState } : {}),
      ...(onExpandingChange !== undefined ? { onChange: onExpandingChange } : {}),
    },
    ...(selection
      ? {
          rowSelection: {
            enable: mapSelectionEnable(selection.enable),
            multiRow: selection.multiRow ?? true,
            onChange: selection.onChange,
            state: selection.state,
            initialState: selection.initialState,
          },
        }
      : {}),
  };
}
