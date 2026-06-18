import { FiltersState } from '@ds/chips';
import { OnChangeFn } from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { DEFAULT_FILTER_VISIBILITY } from '../../../../constants';
import { TableProps } from '../../../types';
import { useStateControl } from '../useStateControl';
import { getInitialColumnsFiltersOpenValue } from './utils';

type UseFiltersProps<TData extends object, TFilters extends FiltersState> = Pick<
  TableProps<TData, TFilters>,
  'columnFilters'
>;

export function useFilters<TData extends object, TFilters extends FiltersState>({
  columnFilters,
}: UseFiltersProps<TData, TFilters>): {
  filter: TFilters | undefined;
  setFilter: OnChangeFn<TFilters | undefined>;
  patchedFilter: TableProps<TData, TFilters>['columnFilters'];
  setFilterVisibility: OnChangeFn<string[]>;
} {
  const [areColumnFiltersOpen, setAreColumnFiltersOpen] = useState(() =>
    getInitialColumnsFiltersOpenValue(columnFilters),
  );

  const [filter, setFilter] = useStateControl<TFilters | undefined>(
    {
      state: columnFilters?.value,
      initialState: columnFilters?.defaultValue as TFilters | undefined,
      onChange: columnFilters?.onChange,
    },
    undefined,
  );

  const [filterVisibility, setFilterVisibility] = useStateControl<string[]>(
    {
      state: columnFilters?.visibleFilters,
      initialState: [],
      onChange: columnFilters?.onVisibleFiltersChange,
    },
    DEFAULT_FILTER_VISIBILITY,
  );

  const patchedFilter = useMemo(() => {
    if (!columnFilters) {
      return undefined;
    }

    return {
      open: areColumnFiltersOpen,
      onOpenChange: setAreColumnFiltersOpen,
      ...columnFilters,
      value: filter,
      onChange: setFilter,
      visibleFilters: filterVisibility,
      onVisibleFiltersChange: setFilterVisibility,
    };
  }, [columnFilters, areColumnFiltersOpen, filter, setFilter, filterVisibility, setFilterVisibility]);

  return {
    filter,
    setFilter,
    patchedFilter,
    setFilterVisibility,
  };
}
