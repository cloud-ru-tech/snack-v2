import { KeyboardEventHandler, useMemo } from 'react';

import { CALENDAR_MODE, RANGE_POSITION } from '../constants';
import { BaseGrid, BuildCellProps, Cell } from '../types';
import { getInRangePosition, isWeekend, stringifyAddress } from '../utils';
import { useCalendarContext } from './useCalendarContext';

export type UseGridParams = {
  buildGrid(viewDate: Date): BaseGrid;
  isTheSameItem(date1: Date, date2: Date): boolean;
  isInPeriod(viewDate: Date, date: Date): boolean;
  getItemLabel(date: Date): string;
  onSelect?(date: Date): void;
  onPreselect?(date: Date): void;
  onLeave?(): void;
  onKeyDown?: KeyboardEventHandler;
};

export function useGrid({
  onSelect,
  onPreselect,
  onLeave,
  buildGrid,
  isTheSameItem,
  getItemLabel,
  isInPeriod,
  onKeyDown,
}: UseGridParams) {
  const {
    today,
    showHolidays,
    preselectedRange,
    value,
    dateAndTime,
    mode,
    viewDate,
    viewMode,
    focus,
    buildCellProps,
    firstNotDisableCell,
    isDateFilled,
  } = useCalendarContext();

  return useMemo(() => {
    let hasFocusInGrid = false;
    let currentItem: Cell | undefined;
    let hasFoundFirstNotDisableCell = false;
    const result = buildGrid(viewDate).map(row =>
      row.map<Cell>(({ date, address }) => {
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

        if (!disabled) {
          if (firstNotDisableCell && !hasFoundFirstNotDisableCell) {
            firstNotDisableCell.current = address;
            hasFoundFirstNotDisableCell = true;
          }
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

        const tabIndex = focus && stringifyAddress(address) === focus ? 0 : -1;
        hasFocusInGrid = tabIndex === 0 || hasFocusInGrid;

        const current = isTheSameItem(today || new Date(), date);

        const cell: Cell = {
          date,
          onLeave,
          address,
          tabIndex,
          onSelect,
          current,
          disabled,
          holiday,
          onPreselect,
          rangePosition,
          label: getItemLabel(date),
          checked: isSelectedValue || isPreselected || isDateTimeValueSelected || rangePosition !== RANGE_POSITION.Out,
          another: !isInPeriod(viewDate, date),
          onKeyDown,
        };

        if (current) {
          currentItem = cell;
        }

        return cell;
      }),
    );

    if (!hasFocusInGrid) {
      (currentItem || result[0][0]).tabIndex = 0;
    }

    return result;
  }, [
    buildCellProps,
    buildGrid,
    dateAndTime?.day,
    dateAndTime?.month,
    dateAndTime?.year,
    firstNotDisableCell,
    focus,
    getItemLabel,
    isDateFilled,
    isInPeriod,
    isTheSameItem,
    mode,
    onKeyDown,
    onLeave,
    onPreselect,
    onSelect,
    preselectedRange,
    showHolidays,
    today,
    value,
    viewDate,
    viewMode,
  ]);
}
