import { FiltersState } from '@ds/chips';
import { SortingState } from '@tanstack/react-table';

import { ServerTableProps } from '../../components/types';

export type PaginationParams = {
  offset: number;
  limit: number;
  search?: string;
  ordering?: string;
};

export type TableSortingState = SortingState;

export type EntityListData<T> = {
  total: number;
  data: T[];
};

export type EntityListQueryResult<T> = {
  data?: EntityListData<T>;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void | Promise<unknown>;
};

export type EntityQueryFn<P extends FiltersState, T extends object> = (params: P) => EntityListQueryResult<T>;

export type UseEntitiesTableStateProps = {
  defaultSearch?: string;
  defaultOffset?: number;
  defaultLimit?: number;
  defaultSort?: TableSortingState;
};

export type UseEntitiesTableStateResult = {
  search: string;
  offset: number;
  limit: number;
  sorting: TableSortingState | undefined;
  onChangePage: (newOffset: number, newLimit: number) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (state: TableSortingState) => void;
  onReset: () => void;
  paginationParams: PaginationParams;
};

export type EntitiesTableHandle<T extends object> = {
  getParams(): PaginationParams;
  getData(): T[];
  refetchData(): void;
  resetState(): void;
};

export type EntitiesTableProps<T extends object, P extends FiltersState = Record<string, unknown>> = {
  id: string;
  queryFn: EntityQueryFn<P, T>;
  queryProps?: Omit<P, 'params'>;
  onQuerySuccess?(): void;
  onPaginationOrDataChange?(data: T[]): void;
  searchPlaceholder?: string;
} & UseEntitiesTableStateProps &
  Omit<
    ServerTableProps<T, P>,
    | 'items'
    | 'loading'
    | 'dataError'
    | 'onChangePage'
    | 'onRefresh'
    | 'search'
    | 'sorting'
    | 'offset'
    | 'limit'
    | 'total'
    | 'savedState'
    | 'outline'
    | 'columnsSettings'
    | 'pagination'
  >;

export type ToEntitiesTablePropsInput<T extends object, P extends FiltersState = Record<string, unknown>> = Omit<
  EntitiesTableProps<T, P>,
  'queryFn' | 'onQuerySuccess' | 'onPaginationOrDataChange'
>;
