import { useMemo } from 'react';

import { defineColumns } from '../../columnUtils';
import { ServerTableProps } from '../../components/types';
import { DEFAULT_PRESET_PAGINATION_OPTIONS } from '../constants';
import { wrapGetRowId } from '../wrapGetRowId';
import { ServerSimpleTableInput, toServerSimpleTableProps } from './toServerSimpleTableProps';

/** Возвращает готовые пропсы для `ServerTable` из упрощённого API */
export function useServerSimpleTableProps<TData extends object>(
  input: ServerSimpleTableInput<TData>,
): ServerTableProps<TData> {
  const { columns, getRowId, pagination } = input;

  const columnDefinitions = useMemo(() => defineColumns(columns), [columns]);

  const wrappedGetRowId = useMemo(() => wrapGetRowId(getRowId), [getRowId]);

  const defaultPagination = useMemo(() => ({ options: [...DEFAULT_PRESET_PAGINATION_OPTIONS] }), []);

  return {
    ...toServerSimpleTableProps(input),
    columnDefinitions,
    getRowId: wrappedGetRowId,
    pagination: pagination ?? defaultPagination,
  };
}
