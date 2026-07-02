import { CALENDAR_MODE, RANGE_POSITION } from '../constants';
import {
  BuildCellProps,
  BuildCellPropsFunction,
  CalendarMode,
  DateAndTime,
  Range,
  RangePosition,
  ViewMode,
} from '../types';
import { getInRangePosition, isWeekend } from '../utils';

/** Чистая классификация ячейки календаря (без побочных эффектов фокуса/`firstNotDisableCell`). */
export type CellClassification = {
  disabled: boolean;
  holiday: boolean;
  rangePosition: RangePosition;
  checked: boolean;
  current: boolean;
  another: boolean;
  label: string;
};

export type ClassifyCellParams = {
  date: Date;
  /** Дата периода, к которому относится сетка ячейки — определяет `another`. */
  viewDate: Date;
  viewMode: ViewMode;
  mode: CalendarMode | 'time';
  value?: Range;
  preselectedRange?: Range;
  dateAndTime?: DateAndTime;
  isDateFilled(): boolean;
  showHolidays: boolean;
  today?: Date;
  buildCellProps?: BuildCellPropsFunction;
  isTheSameItem(date1: Date, date2: Date): boolean;
  isInPeriod(viewDate: Date, date: Date): boolean;
  getItemLabel(date: Date): string;
};

/**
 * Классифицирует одну ячейку календаря (`checked` / `holiday` / `rangePosition` / `current` / `another` / `label`).
 * Date-driven и переиспользуемая: один `viewDate` на сетку, без обращения к `CalendarContext`, фокусу и
 * `firstNotDisableCell`. Используется и десктопным `useGrid`, и мобильными «стопками» сеток.
 */
export function classifyCell({
  date,
  viewDate,
  viewMode,
  mode,
  value,
  preselectedRange,
  dateAndTime,
  isDateFilled,
  showHolidays,
  today,
  buildCellProps,
  isTheSameItem,
  isInPeriod,
  getItemLabel,
}: ClassifyCellParams): CellClassification {
  let disabled = false;
  let holiday: boolean | undefined;
  let cellProps: BuildCellProps = { isDisabled: false };
  if (buildCellProps) {
    cellProps = buildCellProps(date, viewMode);
    disabled = cellProps?.isDisabled ?? false;
    holiday = cellProps.isHoliday;
  }

  if (holiday === undefined) {
    holiday = showHolidays && isWeekend(date, viewMode);
  }

  const dateTimeSelectedValue = isDateFilled()
    ? new Date(dateAndTime?.year ?? 0, dateAndTime?.month ?? 0, dateAndTime?.day ?? 0)
    : undefined;

  const isRangeMode =
    mode === CALENDAR_MODE.DateRange || mode === CALENDAR_MODE.MonthRange || mode === CALENDAR_MODE.YearRange;
  const rangePosition = isRangeMode
    ? getInRangePosition(date, viewMode, preselectedRange || value)
    : RANGE_POSITION.Out;

  const isSelectedValue =
    value && !preselectedRange && !dateTimeSelectedValue
      ? isTheSameItem(value[0], date) || isTheSameItem(value[1], date)
      : false;
  const isPreselected = preselectedRange ? isTheSameItem(preselectedRange[0], date) : false;
  const isDateTimeValueSelected = dateTimeSelectedValue ? isTheSameItem(dateTimeSelectedValue, date) : false;

  const current = isTheSameItem(today || new Date(), date);

  return {
    disabled,
    holiday: holiday ?? false,
    rangePosition,
    current,
    another: !isInPeriod(viewDate, date),
    label: getItemLabel(date),
    checked: isSelectedValue || isPreselected || isDateTimeValueSelected || rangePosition !== RANGE_POSITION.Out,
  };
}
