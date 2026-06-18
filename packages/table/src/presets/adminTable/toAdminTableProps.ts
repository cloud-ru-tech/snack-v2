import { FiltersState } from '@ds/chips';
import { FilterRow } from '@ds/toolbar';
import { RowSelectionState } from '@tanstack/react-table';

import {
  actionsColumn,
  CardViewInput,
  defineColumns,
  mapCardViewProps,
  RowActionsConfig,
  SimpleColumnDef,
  statusColumn,
  StatusColumnConfig,
} from '../../columnUtils';
import { ClientTableProps } from '../../components/types';
import { DEFAULT_PRESET_PAGE_SIZE, DEFAULT_PRESET_PAGINATION_OPTIONS } from '../constants';
import { wrapGetRowId } from '../wrapGetRowId';

type AdminTableSearchConfig = {
  placeholder?: string;
  onChange?: (value: string) => void;
};

type AdminTableSelectionConfig = {
  multiRow?: boolean;
  bulkActions?: ClientTableProps<object>['bulkActions'];
  onChange?: (state: RowSelectionState) => void;
  state?: RowSelectionState;
  initialState?: RowSelectionState;
};

/** Входные пропсы `AdminTable` / `useAdminTableProps` */
export type AdminTableInput<
  TData extends object,
  TFilters extends FiltersState = Record<string, unknown>,
> = CardViewInput<TData> & {
  data: TData[];
  columns: SimpleColumnDef<TData>[];
  statusColumn?: StatusColumnConfig<TData>;
  rowActions?: RowActionsConfig<TData>;
  filters?: FilterRow<TFilters>;
  selection?: AdminTableSelectionConfig;
  search?: boolean | AdminTableSearchConfig;
  pageSize?: number;
  getRowId: (row: TData) => string;
} & Omit<
    ClientTableProps<TData, TFilters>,
    | 'data'
    | 'columnDefinitions'
    | 'getRowId'
    | 'headlineId'
    | 'search'
    | 'suppressSearch'
    | 'columnFilters'
    | 'rowSelection'
    | 'bulkActions'
  >;

function mapSearchProps(search?: boolean | AdminTableSearchConfig) {
  if (search === false) {
    return { suppressSearch: true as const };
  }

  if (search === true || search === undefined) {
    return {};
  }

  return {
    search: {
      placeholder: search.placeholder,
      onChange: search.onChange,
    },
  };
}

function buildColumnDefinitions<TData extends object>({
  statusColumn: statusColumnConfig,
  columns,
  rowActions,
}: Pick<AdminTableInput<TData>, 'statusColumn' | 'columns' | 'rowActions'>) {
  return [
    ...(statusColumnConfig ? [statusColumn(statusColumnConfig)] : []),
    ...defineColumns(columns),
    ...(rowActions ? [actionsColumn(rowActions)] : []),
  ];
}

/** Маппинг упрощённых пропсов в `ClientTableProps` для `Table` */
export function toAdminTableProps<TData extends object, TFilters extends FiltersState = Record<string, unknown>>(
  input: AdminTableInput<TData, TFilters>,
): ClientTableProps<TData, TFilters> {
  const {
    data,
    columns,
    statusColumn: statusColumnConfig,
    rowActions,
    filters,
    selection,
    search,
    pageSize = DEFAULT_PRESET_PAGE_SIZE,
    getRowId,
    headlineKey,
    defaultView,
    view,
    onViewChange,
    renderCard,
    outline,
    pagination,
    columnsSettings,
    onRefresh,
    ...rest
  } = input;

  return {
    ...rest,
    ...mapCardViewProps({ headlineKey, defaultView, view, onViewChange, renderCard }),
    ...mapSearchProps(search),
    data,
    columnDefinitions: buildColumnDefinitions({ statusColumn: statusColumnConfig, columns, rowActions }),
    outline: outline ?? true,
    pageSize,
    pagination: pagination ?? { options: [...DEFAULT_PRESET_PAGINATION_OPTIONS] },
    getRowId: wrapGetRowId(getRowId),
    onRefresh,
    columnsSettings: columnsSettings ?? { enableSettingsMenu: true },
    ...(filters ? { columnFilters: filters } : {}),
    ...(selection
      ? {
          rowSelection: {
            enable: true,
            multiRow: selection.multiRow ?? true,
            onChange: selection.onChange,
            state: selection.state,
            initialState: selection.initialState,
          },
          bulkActions: selection.bulkActions,
        }
      : {}),
  };
}
