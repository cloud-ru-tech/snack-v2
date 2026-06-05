import { FiltersState, hasFilterBeenApplied } from '@ds/chips';
import { LAYOUT_TYPE } from '@ds/utils';
import cn from 'classnames';
import { useMemo } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

import { FilterButtonProps } from '../../../helperComponents';
import { LayoutType } from '../../../types';
import styles from '../styles.module.scss';
import { FilterRow } from '../types';

type UseFiltersProps<TState extends FiltersState> = {
  filterRow?: FilterRow<TState>;
  layoutType?: LayoutType;
};

type UseFiltersReturnType<TState extends FiltersState> = {
  filterButton?: FilterButtonProps;
  filterRow?: FilterRow<TState>;
};

export function useFilters<TState extends FiltersState>({
  filterRow,
  layoutType = LAYOUT_TYPE.Desktop,
}: UseFiltersProps<TState>): UseFiltersReturnType<TState> {
  const defaultOpen = layoutType === LAYOUT_TYPE.Mobile ? (filterRow?.initialOpen ?? false) : false;

  const [filtersOpen, setFiltersOpen] = useUncontrolledProp<boolean>(filterRow?.open, defaultOpen, newValue => {
    const result = typeof newValue === 'function' ? newValue(filtersOpen) : newValue;
    filterRow?.onOpenChange?.(result);
  });

  const [value, setValue] = useUncontrolledProp<TState>(
    filterRow?.value,
    (filterRow?.defaultValue ?? {}) as TState,
    newValue => {
      const result = typeof newValue === 'function' ? newValue(value) : newValue;
      filterRow?.onChange?.(result);
    },
  );

  const [visibleFilters, setVisibleFilters] = useUncontrolledProp<string[]>(
    filterRow?.visibleFilters,
    Object.keys(value),
    newState => {
      const result = typeof newState === 'function' ? newState(visibleFilters) : newState;
      filterRow?.onVisibleFiltersChange?.(result);
    },
  );

  const patchedFilters = useMemo(
    () =>
      (filterRow?.filters ?? []).map(filter => {
        if (layoutType === LAYOUT_TYPE.Desktop && ['single', 'multiple'].includes(filter.type)) {
          return {
            ...filter,
            dropDownClassName: cn(filter.dropDownClassName, styles.list),
          };
        }

        return filter;
      }),
    [filterRow?.filters, layoutType],
  );

  const numberOfFilters = useMemo(
    () => Object.keys(value).reduce((result, filterKey) => result + Number(hasFilterBeenApplied(value[filterKey])), 0),
    [value],
  );

  return {
    filterButton: filterRow ? { open: filtersOpen, onOpenChange: setFiltersOpen, numberOfFilters } : undefined,
    filterRow:
      filtersOpen && filterRow
        ? {
            ...filterRow,
            open: undefined,
            onOpenChange: undefined,
            initialOpen: undefined,
            filters: patchedFilters,
            value,
            onChange: setValue,
            visibleFilters,
            onVisibleFiltersChange: setVisibleFilters,
          }
        : undefined,
  };
}
