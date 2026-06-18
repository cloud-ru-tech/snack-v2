import { ColumnDefinition } from '../../../types';

export function getColumnIdentifier<TData extends object>(colDef: ColumnDefinition<TData>): string {
  if ('id' in colDef && colDef.id) {
    return colDef.id;
  }

  return (colDef as { accessorKey?: string }).accessorKey ?? '';
}
