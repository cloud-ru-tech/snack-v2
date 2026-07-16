import { ColumnDefinition } from '../../../../../types';

/**
 * Проверка на то, должна ли колонка быть включена по умолчанию
 * @function isColumnEnabledInitially
 */
export function isColumnEnabledInitially<TData extends object>(colDef: ColumnDefinition<TData>): boolean {
  if ('columnSettings' in colDef && colDef.columnSettings !== undefined) {
    return colDef.columnSettings?.mode !== 'defaultHidden';
  }

  return true;
}
