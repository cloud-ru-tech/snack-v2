import { FiltersState } from '@ds/chips';

import { ServerTableProps } from '../../components/types';
import { AdminTableInput, toAdminTableProps } from '../adminTable/toAdminTableProps';
import { DEFAULT_PRESET_PAGE_SIZE, DEFAULT_PRESET_PAGINATION_OPTIONS } from '../constants';

/** Входные пропсы `ServerAdminTable` / `useServerAdminTableProps` */
export type ServerAdminTableInput<TData extends object, TFilters extends FiltersState = Record<string, unknown>> = Omit<
  AdminTableInput<TData, TFilters>,
  'data' | 'search'
> & {
  items?: TData[];
  pageSize?: number;
  limit?: number;
  onChangePage(offset: number, limit: number): void;
  search: NonNullable<ServerTableProps<TData, TFilters>['search']>;
} & Omit<
    ServerTableProps<TData, TFilters>,
    'items' | 'columnDefinitions' | 'getRowId' | 'headlineId' | 'search' | 'onChangePage' | 'limit'
  >;

/** Маппинг упрощённых пропсов в `ServerTableProps` */
export function toServerAdminTableProps<TData extends object, TFilters extends FiltersState = Record<string, unknown>>(
  input: ServerAdminTableInput<TData, TFilters>,
): ServerTableProps<TData, TFilters> {
  const { items, onChangePage, search, pageSize, limit, ...adminInput } = input;
  const pageLimit = limit ?? pageSize ?? DEFAULT_PRESET_PAGE_SIZE;
  const clientProps = toAdminTableProps({ ...adminInput, data: items ?? [], pageSize: pageLimit, search: false });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- strip client-only fields
  const { data, search: clientSearch, suppressSearch, pagination, ...rest } = clientProps;

  return {
    ...rest,
    items,
    onChangePage,
    search,
    limit: pageLimit,
    pagination: pagination ?? { options: [...DEFAULT_PRESET_PAGINATION_OPTIONS] },
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    ...(suppressSearch ? { suppressSearch } : {}),
  };
}
