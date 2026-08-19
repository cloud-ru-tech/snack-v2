import { COLUMN_SETTINGS_MODE } from '../../../../../constants';
import { ColumnDefinition } from '../../../../../types';
import { getColumnSettingsMode } from './getColumnSettingsMode';

/**
 * Проверка на то, должна ли колонка отображаться в настройках колонок
 * @function isColumnVisibilityConfigurable
 */
export function isColumnVisibilityConfigurable<TData extends object>(colDef: ColumnDefinition<TData>): boolean {
  return getColumnSettingsMode(colDef) !== COLUMN_SETTINGS_MODE.Locked;
}
