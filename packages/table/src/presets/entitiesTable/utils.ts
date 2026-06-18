import { EntityListData, PaginationParams, TableSortingState } from './types';

export function createEmptyEntityListData<T extends object>(): EntityListData<T> {
  return { total: 0, data: [] };
}

export function getOrderingParams(sortingState?: TableSortingState) {
  const sorting = sortingState?.[0];

  if (sorting) {
    return sorting.desc ? `-${sorting.id}` : `${sorting.id}`;
  }
}

export function buildPaginationParams({
  offset,
  limit,
  search,
  sorting,
}: {
  offset: number;
  limit: number;
  search: string;
  sorting?: TableSortingState;
}): PaginationParams {
  return {
    offset,
    limit,
    ...Object.fromEntries(
      Object.entries({
        search,
        ordering: getOrderingParams(sorting),
      }).filter(([, value]) => Boolean(value)),
    ),
  };
}
