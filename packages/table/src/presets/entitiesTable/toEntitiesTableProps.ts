import { FiltersState } from '@ds/chips';

import { ServerTableProps } from '../../components/types';
import { ENTITIES_PRESET_PAGINATION_OPTIONS } from '../constants';
import { EntityListQueryResult, ToEntitiesTablePropsInput, UseEntitiesTableStateResult } from './types';
import { createEmptyEntityListData } from './utils';

type ToEntitiesTablePropsArgs<T extends object, P extends FiltersState = Record<string, unknown>> = {
  input: ToEntitiesTablePropsInput<T, P>;
  tableState: UseEntitiesTableStateResult;
  query: EntityListQueryResult<T>;
  filtersValue?: FiltersState;
  setFiltersValue?: (value: FiltersState | undefined) => void;
};

/** Маппинг state + query result в `ServerTableProps` с product-дефолтами EntitiesTable */
export function toEntitiesTableProps<T extends object, P extends FiltersState = Record<string, unknown>>({
  input,
  tableState,
  query,
  filtersValue,
  setFiltersValue,
}: ToEntitiesTablePropsArgs<T, P>): ServerTableProps<T, P> {
  const { id, columnDefinitions, searchPlaceholder, columnFilters, ...rest } = input;

  const { search, offset, limit, sorting, onChangePage, onSearchChange, onSortChange } = tableState;
  const data = query.data ?? createEmptyEntityListData<T>();
  const loading = query.isLoading && query.isFetching;

  return {
    ...rest,
    columnDefinitions,
    outline: true,
    savedState: {
      id,
      resize: true,
    },
    columnsSettings: {
      enableDrag: true,
      enableSettingsMenu: true,
    },
    pagination: {
      options: [...ENTITIES_PRESET_PAGINATION_OPTIONS],
    },
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    items: data.data,
    total: data.total,
    loading,
    dataError: query.isError,
    onRefresh: query.refetch,
    offset,
    limit,
    onChangePage,
    search: {
      state: search,
      onChange: onSearchChange,
      loading,
      placeholder: searchPlaceholder,
    },
    sorting: {
      state: sorting,
      onChange: onSortChange,
    },
    ...(columnFilters
      ? {
          columnFilters: {
            ...columnFilters,
            value: filtersValue as P | undefined,
            onChange: setFiltersValue as ((value: P) => void) | undefined,
          },
        }
      : {}),
  };
}
