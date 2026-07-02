import { VIEW_MODE } from '../../constants';
import { BaseGrid, ViewMode } from '../../types';
import {
  getDateLabel,
  getMonthName,
  getYearLabel,
  isTheSameDate,
  isTheSameDecade,
  isTheSameMonth,
  isTheSameYear,
} from '../../utils';
import { buildDecadeGrid } from '../DecadeView/utils';
import { buildMonthGrid } from '../MonthView/utils';
import { buildYearGrid } from '../YearView/utils';

/**
 * Конфиг уровня скролла периодов (`month` / `year` / `decade`): индекс ↔ дата от фиксированного
 * `origin` (симметричный диапазон ±radius, без bidirectional-prepend), сетка, колонки, предикаты, подписи.
 */
export type LevelConfig = {
  /** Полное число периодов в виртуальном списке. */
  count: number;
  /** Индекс периода, соответствующего `origin`. */
  centerIndex: number;
  /** Дата периода по индексу. */
  dateAt(index: number): Date;
  /** Индекс периода, содержащего дату. */
  indexAt(date: Date): number;
  /** Сетка периода (`BaseGrid`). */
  buildGrid(date: Date): BaseGrid;
  /** Число колонок CSS-grid'а блока. */
  columns: number;
  /** Совпадение ячейки с выбранным значением на гранулярности уровня. */
  isTheSameItem(date1: Date, date2: Date): boolean;
  /** Принадлежит ли ячейка периоду блока (иначе `another` — скрывается на mobile). */
  isInPeriod(viewDate: Date, date: Date): boolean;
  /** Подпись ячейки (день / месяц / год). */
  getItemLabel(date: Date): string;
  /** Подпись периода (шапка блока и дропдаун уровня). */
  label(date: Date): string;
  /** Рисовать ли строку дней недели (только `month`). */
  showWeekRow: boolean;
};

// ±периодов от origin: широкие (±150 лет на месяцах), чтобы навигация почти не упиралась в край.
const RADIUS: Record<ViewMode, number> = {
  [VIEW_MODE.Month]: 1800,
  [VIEW_MODE.Year]: 200,
  [VIEW_MODE.Decade]: 200,
};

const decadeStart = (year: number) => Math.floor(year / 10) * 10;

export function getLevelConfig(level: ViewMode, origin: Date, locale: Intl.Locale): LevelConfig {
  const centerIndex = RADIUS[level];
  const count = centerIndex * 2 + 1;

  switch (level) {
    case VIEW_MODE.Year:
      return {
        count,
        centerIndex,
        dateAt: index => new Date(origin.getFullYear() + (index - centerIndex), 0, 1),
        indexAt: date => centerIndex + (date.getFullYear() - origin.getFullYear()),
        buildGrid: buildYearGrid,
        columns: 3,
        isTheSameItem: isTheSameMonth,
        isInPeriod: isTheSameYear,
        getItemLabel: date => getMonthName(date, locale),
        label: date => date.getFullYear().toString(),
        showWeekRow: false,
      };
    case VIEW_MODE.Decade: {
      const originDecade = decadeStart(origin.getFullYear());
      return {
        count,
        centerIndex,
        dateAt: index => new Date(originDecade + (index - centerIndex) * 10, 0, 1),
        indexAt: date => centerIndex + (decadeStart(date.getFullYear()) - originDecade) / 10,
        buildGrid: buildDecadeGrid,
        columns: 3,
        isTheSameItem: isTheSameYear,
        isInPeriod: isTheSameDecade,
        getItemLabel: getYearLabel,
        label: date => {
          const start = decadeStart(date.getFullYear());
          return `${start}-${start + 9}`;
        },
        showWeekRow: false,
      };
    }
    case VIEW_MODE.Month:
    default:
      return {
        count,
        centerIndex,
        dateAt: index => new Date(origin.getFullYear(), origin.getMonth() + (index - centerIndex), 1),
        indexAt: date =>
          centerIndex + (date.getFullYear() - origin.getFullYear()) * 12 + (date.getMonth() - origin.getMonth()),
        buildGrid: date => buildMonthGrid(date, locale),
        columns: 7,
        isTheSameItem: isTheSameDate,
        isInPeriod: isTheSameMonth,
        getItemLabel: getDateLabel,
        label: date => `${getMonthName(date, locale)} ${date.getFullYear()}`,
        showWeekRow: true,
      };
  }
}
