import { FiltersState } from '@ds/chips';
import { PaginationState } from '@tanstack/react-table';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { STATUS_APPEARANCE } from '../../helperComponents';
import { Table } from '../Table';
import { useStateControl } from '../Table/hooks';
import { ServerTableProps } from '../types';
import { DEFAULT_PAGINATION_LIMIT, SEARCH_DELAY } from './constants';

export function ServerTable<TData extends object, TFilters extends FiltersState = Record<string, unknown>>({
  items,
  total = DEFAULT_PAGINATION_LIMIT,
  limit = DEFAULT_PAGINATION_LIMIT,
  offset = 0,
  onChangePage,
  search: searchProp,
  pagination,
  columnFilters,
  manualSorting = true,
  manualPagination = true,
  manualFiltering = true,
  ...rest
}: ServerTableProps<TData, TFilters>) {
  const [search, setSearch] = useStateControl(searchProp, '');
  const [tempSearch, setTempSearch] = useState(search || '');

  useEffect(() => {
    if (searchProp?.state !== tempSearch) {
      setTempSearch(searchProp?.state ?? '');
    }
    // Needs update only when prop changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchProp?.state]);

  // Debounce — per-instance: module-level singleton делил таймер между инстансами
  // ServerTable и не отменялся на unmount. onChange передаётся аргументом вызова
  // (а не зависимостью useMemo), потому что setSearch из useStateControl пересоздаётся
  // на каждый рендер — debounce от lodash применяет аргументы последнего вызова.
  const onSearchDebounced = useMemo(
    () => debounce((newValue: string, onChange: (value: string) => void) => onChange(newValue), SEARCH_DELAY),
    [],
  );

  useEffect(() => () => onSearchDebounced.cancel(), [onSearchDebounced]);

  const handleSearch = useCallback(
    (newValue: string) => {
      setTempSearch(newValue);
      onSearchDebounced(newValue.trim(), setSearch);
    },
    [onSearchDebounced, setSearch],
  );

  const handlePageChange = useCallback(
    ({ pageSize, pageIndex }: PaginationState) => onChangePage(pageIndex * pageSize, pageSize),
    [onChangePage],
  );

  const pageIndex = useMemo(() => Math.floor(offset / limit), [limit, offset]);
  const pageCount = useMemo(() => Math.ceil(total / limit), [limit, total]);

  return (
    <Table
      {...rest}
      data={items || []}
      search={{
        state: tempSearch,
        onChange: handleSearch,
        loading: searchProp?.loading,
        placeholder: searchProp?.placeholder,
      }}
      columnFilters={columnFilters}
      pageCount={pageCount}
      pagination={{
        ...pagination,
        state: {
          pageIndex,
          pageSize: limit,
        },
        onChange: handlePageChange,
      }}
      pageSize={limit}
      manualSorting={manualSorting}
      manualFiltering={manualFiltering}
      manualPagination={manualPagination}
    />
  );
}

ServerTable.getRowActionsColumnDef = Table.getRowActionsColumnDef;
ServerTable.statusAppearances = STATUS_APPEARANCE;
ServerTable.getStatusColumnDef = Table.getStatusColumnDef;
