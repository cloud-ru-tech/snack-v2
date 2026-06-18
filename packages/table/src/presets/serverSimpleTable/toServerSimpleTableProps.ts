import { CardViewInput, defineColumns, mapCardViewProps, SimpleColumnDef } from '../../columnUtils';
import { ServerTableProps } from '../../components/types';
import { DEFAULT_PRESET_PAGE_SIZE, DEFAULT_PRESET_PAGINATION_OPTIONS } from '../constants';
import { wrapGetRowId } from '../wrapGetRowId';

/** Входные пропсы `ServerSimpleTable` / `useServerSimpleTableProps` */
export type ServerSimpleTableInput<TData extends object> = CardViewInput<TData> & {
  items?: TData[];
  columns: SimpleColumnDef<TData>[];
  pageSize?: number;
  limit?: number;
  getRowId?: (row: TData) => string;
  onChangePage(offset: number, limit: number): void;
} & Omit<ServerTableProps<TData>, 'items' | 'columnDefinitions' | 'getRowId' | 'headlineId' | 'limit'>;

/** Маппинг упрощённых пропсов в `ServerTableProps` */
export function toServerSimpleTableProps<TData extends object>(
  input: ServerSimpleTableInput<TData>,
): ServerTableProps<TData> {
  const {
    items,
    columns,
    pageSize,
    getRowId,
    headlineKey,
    defaultView,
    view,
    onViewChange,
    renderCard,
    onChangePage,
    outline,
    pagination,
    limit,
    manualSorting,
    manualPagination,
    manualFiltering,
    ...rest
  } = input;

  const pageLimit = pageSize ?? limit ?? DEFAULT_PRESET_PAGE_SIZE;

  return {
    ...rest,
    ...mapCardViewProps({ headlineKey, defaultView, view, onViewChange, renderCard }),
    items,
    columnDefinitions: defineColumns(columns),
    outline: outline ?? true,
    limit: pageLimit,
    pagination: pagination ?? { options: [...DEFAULT_PRESET_PAGINATION_OPTIONS] },
    getRowId: wrapGetRowId(getRowId),
    onChangePage,
    manualSorting: manualSorting ?? true,
    manualPagination: manualPagination ?? true,
    manualFiltering: manualFiltering ?? true,
  };
}
