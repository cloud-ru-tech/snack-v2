import { useMemo } from 'react';

import { defineColumns } from '../../columnUtils';
import { ClientTableProps } from '../../components/types';
import { DEFAULT_PRESET_PAGINATION_OPTIONS } from '../constants';
import { wrapGetRowId } from '../wrapGetRowId';
import { SimpleTableInput, toSimpleTableProps } from './toSimpleTableProps';

/** Возвращает готовые пропсы для `Table` из упрощённого API `SimpleTable` */
export function useSimpleTableProps<TData extends object>(input: SimpleTableInput<TData>): ClientTableProps<TData> {
  const { columns, getRowId, pagination } = input;

  const columnDefinitions = useMemo(() => defineColumns(columns), [columns]);

  const wrappedGetRowId = useMemo(() => wrapGetRowId(getRowId), [getRowId]);

  const defaultPagination = useMemo(() => ({ options: [...DEFAULT_PRESET_PAGINATION_OPTIONS] }), []);

  return {
    ...toSimpleTableProps(input),
    columnDefinitions,
    getRowId: wrappedGetRowId,
    pagination: pagination ?? defaultPagination,
  };
}
