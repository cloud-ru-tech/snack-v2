import { useMemo } from 'react';

import { defineColumns } from '../../columnUtils';
import { ClientTableProps } from '../../components/types';
import { wrapGetRowId } from '../wrapGetRowId';
import { SimpleTableInput, toSimpleTableProps } from './toSimpleTableProps';

/** Возвращает готовые пропсы для `Table` из упрощённого API `SimpleTable` */
export function useSimpleTableProps<TData extends object>(input: SimpleTableInput<TData>): ClientTableProps<TData> {
  const { columns, getRowId } = input;

  const columnDefinitions = useMemo(() => defineColumns(columns), [columns]);

  const wrappedGetRowId = useMemo(() => wrapGetRowId(getRowId), [getRowId]);

  return {
    ...toSimpleTableProps(input),
    columnDefinitions,
    getRowId: wrappedGetRowId,
  };
}
