import { ValueOf } from '@ds/utils';
import { Table } from '@tanstack/react-table';
import { createContext, useContext } from 'react';

import { TABLE_ROW_COLOR } from '../../constants';

type TableContextValue<TData> = {
  table: Table<TData>;
  getRowBackgroundColor?: (data: TData) => ValueOf<typeof TABLE_ROW_COLOR> | undefined;
  headerRowBackgroundColor?: ValueOf<typeof TABLE_ROW_COLOR>;
  /** Строка отрисована в режиме карточек (`view='cards'`). */
  isCardsView?: boolean;
  /**
   * Множество id колонок, которые должны быть видны при виртуализации колонок.
   * `null` — виртуализация колонок выключена, рендерятся все колонки.
   */
  virtualCenterColumnIds: Set<string> | null;
  /**
   * Размеры спейсеров для виртуализации колонок.
   * `null` — виртуализация колонок выключена.
   */
  columnVirtualPadding: { left: number; right: number } | null;
  /** @default true */
  fullWidth?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableContext = createContext<TableContextValue<any>>({
  // No way to initialize table in context
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  table: {},
  virtualCenterColumnIds: null,
  columnVirtualPadding: null,
  fullWidth: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTableContext = () => useContext<TableContextValue<any>>(TableContext);
