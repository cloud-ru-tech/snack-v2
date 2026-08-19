import { COLUMN_SETTINGS_MODE } from '../../../../../constants';
import { ColumnDefinition } from '../../../../../types';
import { getColumnSettingsMode } from './getColumnSettingsMode';

/**
 * Проверка на то, должна ли колонка быть включена по умолчанию
 * @function isColumnEnabledInitially
 */
export function isColumnEnabledInitially<TData extends object>(colDef: ColumnDefinition<TData>): boolean {
  return getColumnSettingsMode(colDef) !== COLUMN_SETTINGS_MODE.DefaultHidden;
}
