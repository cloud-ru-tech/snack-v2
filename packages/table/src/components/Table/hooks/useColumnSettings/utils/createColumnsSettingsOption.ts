import { SimpleItem } from '@ds/list';

import { DefaultColumns } from '../../../../../constants';
import { ColumnDefinition } from '../../../../../types';
import { getColumnIdentifier, sortColumnDefinitions } from '../../../utils';
import { isFilterableColumn } from './isFilterableColumn';

/** Служебные колонки без пользовательского заголовка — в меню настроек не показываются. */
const SETTINGS_MENU_EXCLUDED_IDS = new Set<string>([DefaultColumns.Selection, DefaultColumns.RowActions]);

/**
 * Колонка попадает в меню настроек: есть id/accessorKey и это не selection/row-actions.
 * Включая `mode: hidden` и колонки без `columnSettings` (они рендерятся disabled).
 */
export function isColumnsSettingsMenuItem<TData extends object>(colDef: ColumnDefinition<TData>): boolean {
  if (!('id' in colDef || 'accessorKey' in colDef)) {
    return false;
  }

  const id = getColumnIdentifier(colDef);

  return Boolean(id) && !SETTINGS_MENU_EXCLUDED_IDS.has(id);
}

function getColumnsSettingsOptionLabel<TData extends object>(columnDefinition: ColumnDefinition<TData>): string {
  const settingsLabel = 'columnSettings' in columnDefinition ? columnDefinition.columnSettings?.label : undefined;

  if (settingsLabel) {
    return settingsLabel;
  }

  const { header } = columnDefinition;

  if (typeof header === 'string') {
    return header;
  }

  return getColumnIdentifier(columnDefinition);
}

/**
 * Пункт меню настроек колонок. Неактивные (нет `columnSettings` / `mode: hidden`) —
 * `disabled` + всегда включённый switch (`checked: true`); драг при этом остаётся
 * доступным. Видимость через `enabledColumns` не управляется.
 */
export function createColumnsSettingsOption<TData extends object>(
  columnDefinition: ColumnDefinition<TData>,
): SimpleItem {
  const configurable = isFilterableColumn(columnDefinition);
  const option: SimpleItem = {
    id: getColumnIdentifier(columnDefinition),
    content: {
      option: getColumnsSettingsOptionLabel(columnDefinition),
    },
    switch: true,
    showSwitchIcon: true,
    disabled: !configurable,
  };

  if (!configurable) {
    option.checked = true;
  }

  return option;
}

export function createColumnsSettingsGroupOptions<TData extends object>(
  group: ColumnDefinition<TData>[],
  columnOrder: string[],
): SimpleItem[] {
  return group
    .filter(isColumnsSettingsMenuItem)
    .sort(sortColumnDefinitions(columnOrder))
    .map(createColumnsSettingsOption);
}
