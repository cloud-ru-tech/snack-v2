import { COLUMN_SETTINGS_MODE } from '../../../../../constants';
import { ColumnDefinition, FilterableColumnDefinition } from '../../../../../types';
import { getColumnSettingsMode, isServiceColumn } from './getColumnSettingsMode';

/**
 * Проверка на то, должна ли колонка отображаться в таблице
 * @function isFilterableColumn
 */
export function isFilterableColumn<TData extends object>(
  colDef: ColumnDefinition<TData>,
): colDef is FilterableColumnDefinition<TData> {
  return (
    ('id' in colDef || 'accessorKey' in colDef) &&
    !isServiceColumn(colDef) &&
    getColumnSettingsMode(colDef) !== COLUMN_SETTINGS_MODE.Locked
  );
}
