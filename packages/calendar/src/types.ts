import { ValueOf } from '@ds/utils';
import { KeyboardEventHandler } from 'react';

import { CALENDAR_MODE, RANGE_POSITION, SIZE, VIEW_MODE } from './constants';

export type RangePosition = ValueOf<typeof RANGE_POSITION>;

export type ViewMode = ValueOf<typeof VIEW_MODE>;

export type Size = ValueOf<typeof SIZE>;

export type CalendarMode = ValueOf<typeof CALENDAR_MODE>;

export type Range = [Date, Date];

export type BaseGridItem = { date: Date; address: [number, number] };

export type BaseGrid = BaseGridItem[][];

export type Cell = {
  /** Дата ячейки (для колбэков выбора) */
  date: Date;
  /** Адрес ячейки в сетке — синхронизация фокуса и клавиатуры */
  address: [number, number];
  /** Значение */
  label: string;
  /** Является ли сегодняшним днем */
  current: boolean;
  /** Выбран ли элемент */
  checked: boolean;
  /** Деактивирован ли */
  disabled?: boolean;
  /** Является ли выходным/праздником */
  holiday?: boolean;
  /**
   * Относится ли к иному периоду (не к просматриваемому в данный момент)
   */
  another: boolean;
  /**
   * Является ли частью range
   * @default out
   */
  rangePosition: RangePosition;
  /** Индекс фокуса кнопки */
  tabIndex: -1 | 0;
  onSelect?(date: Date): void;
  onPreselect?(date: Date): void;
  onLeave?(): void;
  onKeyDown?: KeyboardEventHandler;
};

export type FocusDirection = 'prev' | 'next';

export type BuildCellProps = { isDisabled?: boolean; isHoliday?: boolean };
export type BuildCellPropsFunction = (date: Date, viewMode: ViewMode) => BuildCellProps;

export type TimeValue = {
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export type DateAndTime = TimeValue & {
  year?: number;
  month?: number;
  day?: number;
};

export type PresetItem = {
  /** Лейбл пресета */
  label: string;
  /** ID периода */
  id: string;
  /** Период */
  range: Range;
};

export type PresetsOptions = {
  /**
   * Включение отображения секции с пресетами
   * @default false
   */
  enabled?: boolean;
  /** Кастомные пресеты быстрого выбора периода относительно текущего момента */
  items?: PresetItem[];
};

export type OnKeyDownGetter = (id: number) => KeyboardEventHandler;
