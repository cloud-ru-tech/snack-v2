import { FiltersState } from '@ds/chips';
import { useMemo } from 'react';

import { ServerTableProps } from '../../components/types';
import { toEntitiesTableProps } from './toEntitiesTableProps';
import { EntityListQueryResult, ToEntitiesTablePropsInput, UseEntitiesTableStateResult } from './types';

type UseEntitiesTablePropsArgs<T extends object, P extends FiltersState = Record<string, unknown>> = {
  input: ToEntitiesTablePropsInput<T, P>;
  tableState: UseEntitiesTableStateResult;
  query: EntityListQueryResult<T>;
  filtersValue?: FiltersState;
  setFiltersValue?: (value: FiltersState | undefined) => void;
};

/** Возвращает готовые пропсы для `ServerTable` из EntitiesTable state + query result */
export function useEntitiesTableProps<T extends object, P extends FiltersState = Record<string, unknown>>({
  input,
  tableState,
  query,
  filtersValue,
  setFiltersValue,
}: UseEntitiesTablePropsArgs<T, P>): ServerTableProps<T, P> {
  return useMemo(
    () => toEntitiesTableProps({ input, tableState, query, filtersValue, setFiltersValue }),
    [filtersValue, input, query, setFiltersValue, tableState],
  );
}
