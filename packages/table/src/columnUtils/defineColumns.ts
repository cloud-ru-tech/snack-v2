import { ReactNode } from 'react';

import { COLUMN_SETTINGS_MODE, SORT_FN } from '../constants';
import { ColumnDefinition } from '../types';

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

export type SimpleColumnDef<T extends object> = {
  /** Ключ поля в данных строки */
  key: keyof T & string;
  /** Заголовок колонки */
  header: string;
  /** Включить сортировку */
  sortable?: boolean;
  /** Выравнивание ячейки и заголовка */
  align?: 'left' | 'right';
  /** Ширина колонки, px */
  width?: number;
  /** Скрыть колонку по умолчанию (показывается в меню настроек) */
  hidden?: boolean;
  /** Ручное изменение ширины */
  resizable?: boolean;
  /** Формат значения или кастомный рендер */
  format?: 'date' | 'currency' | ((value: unknown, row: T) => ReactNode);
  /** Полное определение колонки вместо маппинга */
  column?: ColumnDefinition<T>;
};

/**
 * Преобразует декларативный массив колонок в `ColumnDefinition[]` для `Table`.
 * Всегда задаёт `id = key` — нужно для resize и savedState.
 */
export function defineColumns<T extends object>(defs: SimpleColumnDef<T>[]): ColumnDefinition<T>[] {
  return defs.map(def => {
    if (def.column) {
      return def.column;
    }

    const col = {
      id: def.key,
      accessorKey: def.key,
      header: def.header,
      size: def.width ?? 140,
      ...(def.sortable ? { enableSorting: true } : {}),
      ...(def.align ? { align: def.align, headerAlign: def.align } : {}),
      ...(def.resizable ? { enableResizing: true } : {}),
      columnSettings: def.hidden
        ? { label: def.header, mode: COLUMN_SETTINGS_MODE.DefaultHidden }
        : { label: def.header },
    } as ColumnDefinition<T>;

    const { format } = def;

    if (format === 'date') {
      col.sortingFn = SORT_FN.DateTime;
      col.cell = ctx => {
        const value = ctx.getValue();
        const date = value ? new Date(String(value)) : null;
        return date && !Number.isNaN(date.getTime()) ? dateFormatter.format(date) : '—';
      };
    } else if (format === 'currency') {
      col.cell = ctx => currencyFormatter.format(Number(ctx.getValue() ?? 0));
    } else if (typeof format === 'function') {
      col.cell = ctx => format(ctx.getValue(), ctx.row.original);
    }

    return col;
  });
}
