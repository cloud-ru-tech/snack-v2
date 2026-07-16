import { ColumnDefinition } from '../../../../../types';

/**
 * Проверка на то, должна ли колонка отображаться в настройках колонок
 * @function isColumnVisibilityConfigurable
 */
export function isColumnVisibilityConfigurable<TData extends object>(colDef: ColumnDefinition<TData>): boolean {
  if ('columnSettings' in colDef && colDef.columnSettings !== undefined) {
    const { mode } = colDef.columnSettings;

    if (!mode) {
      return true;
    }

    switch (mode) {
      case 'locked':
        return false;
      case 'defaultVisible':
      case 'defaultHidden':
      default:
        return true;
    }
  }

  return true;
}
