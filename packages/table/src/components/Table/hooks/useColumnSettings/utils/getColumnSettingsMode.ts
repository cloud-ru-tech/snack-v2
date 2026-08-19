import { COLUMN_SETTINGS_MODE, DEFAULT_COLUMNS } from '../../../../../constants';
import { ColumnDefinition } from '../../../../../types';

type ColumnSettingsMode = (typeof COLUMN_SETTINGS_MODE)[keyof typeof COLUMN_SETTINGS_MODE];

/** Служебные колонки (`selection` / `rowActions` / `status`) видимостью не управляются. */
export function isServiceColumn<TData extends object>(colDef: ColumnDefinition<TData>): boolean {
  const id = 'id' in colDef ? colDef.id : undefined;

  return Boolean(id) && (DEFAULT_COLUMNS as string[]).includes(String(id));
}

/** Режим колонки в меню настроек; без `columnSettings.mode` — `defaultVisible`. */
export function getColumnSettingsMode<TData extends object>(colDef: ColumnDefinition<TData>): ColumnSettingsMode {
  const mode = 'columnSettings' in colDef ? colDef.columnSettings?.mode : undefined;

  return mode ?? COLUMN_SETTINGS_MODE.DefaultVisible;
}
