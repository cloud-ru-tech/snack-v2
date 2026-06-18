import { getStatusColumnDef, MapStatusToAppearanceFnType } from '../helperComponents/Cells/StatusCell/StatusCell';
import { ColumnDefinition } from '../types';

export type StatusColumnConfig<T extends object> = {
  /** Ключ поля со значением статуса */
  key: keyof T & string;
  /** Маппинг значения статуса на цвет */
  mapStatusToAppearance: MapStatusToAppearanceFnType;
  /** Заголовок колонки */
  header?: string;
  /** Подпись рядом с индикатором */
  renderDescription?: (value: string, row: T) => string;
  /** Ширина колонки */
  width?: number;
  /** Включить сортировку */
  sortable?: boolean;
};

/** Упрощённая обёртка над `getStatusColumnDef` */
export function statusColumn<T extends object>({
  key,
  mapStatusToAppearance,
  header = 'Статус',
  renderDescription,
  width = 160,
  sortable = true,
}: StatusColumnConfig<T>): ColumnDefinition<T> {
  const column = renderDescription
    ? getStatusColumnDef<T>({
        accessorKey: key,
        mapStatusToAppearance,
        renderDescription,
        header,
        size: width,
        enableSorting: sortable,
      })
    : getStatusColumnDef<T>({
        accessorKey: key,
        mapStatusToAppearance,
        enableSorting: sortable,
      });

  return {
    ...column,
    columnSettings: { label: header },
  };
}
