import { FiltersState } from '@ds/chips';
import { useLayoutEffect, useValueControl } from '@ds/utils';
import { forwardRef, Ref, useEffect, useImperativeHandle } from 'react';

import { ServerTable } from '../../components/ServerTable';
import { EntitiesTableHandle, EntitiesTableProps } from './types';
import { useEntitiesTableProps } from './useEntitiesTableProps';
import { useEntitiesTableState } from './useEntitiesTableState';
import { createEmptyEntityListData } from './utils';

function EntitiesTableComponent<T extends object, P extends FiltersState = Record<string, unknown>>(
  props: EntitiesTableProps<T, P>,
  ref: Ref<EntitiesTableHandle<T>>,
) {
  const {
    id,
    queryFn,
    queryProps,
    onQuerySuccess,
    onPaginationOrDataChange,
    columnDefinitions,
    defaultSearch,
    defaultOffset,
    defaultLimit,
    defaultSort,
    searchPlaceholder,
    columnFilters,
    ...rest
  } = props;

  const tableState = useEntitiesTableState({
    defaultSearch,
    defaultOffset,
    defaultLimit,
    defaultSort,
  });

  const { offset, limit, onChangePage, onReset, paginationParams } = tableState;

  const [filtersValue, setFiltersValue] = useValueControl<FiltersState | undefined>({
    value: columnFilters?.value,
    defaultValue: columnFilters?.defaultValue,
    onChange: columnFilters?.onChange,
  });

  const params = {
    params: paginationParams,
    ...queryProps,
    ...filtersValue,
  } as unknown as P;

  const query = queryFn(params);
  const data = query.data ?? createEmptyEntityListData<T>();
  const { refetch, isSuccess } = query;

  useEffect(() => {
    if (data.total && !data.data.length && offset >= limit) {
      onChangePage(offset - limit, limit);
    }
  }, [onChangePage, data.total, data.data.length, offset, limit]);

  useLayoutEffect(() => {
    onPaginationOrDataChange?.(data.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChangePage, data.total, data.data.length, offset, limit]);

  useEffect(() => {
    if (isSuccess) {
      onQuerySuccess?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useImperativeHandle(
    ref,
    (): EntitiesTableHandle<T> => ({
      getParams() {
        return paginationParams;
      },
      getData() {
        return data.data;
      },
      refetchData() {
        refetch();
      },
      resetState() {
        onReset();
      },
    }),
  );

  const tableProps = useEntitiesTableProps({
    input: {
      id,
      columnDefinitions,
      searchPlaceholder,
      columnFilters,
      ...rest,
    },
    tableState,
    query,
    filtersValue,
    setFiltersValue,
  });

  return <ServerTable {...tableProps} />;
}

/** Server-driven таблица сущностей: state пагинации/поиска + queryFn + product-дефолты */
export const EntitiesTable = forwardRef(EntitiesTableComponent) as <
  T extends object,
  P extends FiltersState = Record<string, unknown>,
>(
  props: EntitiesTableProps<T, P> & { ref?: Ref<EntitiesTableHandle<T>> },
) => ReturnType<typeof EntitiesTableComponent>;
