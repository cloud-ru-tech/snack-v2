import { useCallback, useMemo, useState } from 'react';

import { DEFAULT_PAGINATION_LIMIT } from './constants';
import { UseEntitiesTableStateProps, UseEntitiesTableStateResult } from './types';
import { buildPaginationParams } from './utils';

/** Локальный state пагинации, поиска и сортировки для server-driven списков сущностей */
export function useEntitiesTableState({
  defaultSearch,
  defaultOffset,
  defaultLimit,
  defaultSort,
}: UseEntitiesTableStateProps = {}): UseEntitiesTableStateResult {
  const [search, setSearch] = useState(defaultSearch || '');
  const [sorting, setSorting] = useState(defaultSort);
  const [offset, setOffset] = useState(defaultOffset || 0);
  const [limit, setLimit] = useState(defaultLimit || DEFAULT_PAGINATION_LIMIT);

  const onChangePage = useCallback((newOffset: number, newLimit: number) => {
    setOffset(newOffset);
    setLimit(newLimit);
  }, []);

  const onSearchChange = useCallback((value: string) => {
    setSearch(value);
    setOffset(0);
  }, []);

  const onReset = useCallback(() => {
    setSearch(defaultSearch || '');
    setSorting(defaultSort);
    setOffset(defaultOffset || 0);
    setLimit(defaultLimit || DEFAULT_PAGINATION_LIMIT);
  }, [defaultLimit, defaultOffset, defaultSearch, defaultSort]);

  const onSortChange = useCallback((state: UseEntitiesTableStateResult['sorting']) => {
    setSorting(state);
  }, []);

  const paginationParams = useMemo(
    () => buildPaginationParams({ offset, limit, search, sorting }),
    [limit, offset, search, sorting],
  );

  return useMemo(
    () => ({
      search,
      offset,
      limit,
      sorting,
      onChangePage,
      onSearchChange,
      onSortChange,
      onReset,
      paginationParams,
    }),
    [limit, offset, onChangePage, onReset, onSearchChange, onSortChange, paginationParams, search, sorting],
  );
}
