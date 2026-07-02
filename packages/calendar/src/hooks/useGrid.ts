import { KeyboardEventHandler, useMemo } from 'react';

import { BaseGrid, Cell } from '../types';
import { stringifyAddress } from '../utils';
import { classifyCell } from './classifyCell';
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
        const classification = classifyCell({
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
        });

        if (!classification.disabled) {
          if (firstNotDisableCell && !hasFoundFirstNotDisableCell) {
            firstNotDisableCell.current = address;
            hasFoundFirstNotDisableCell = true;
          }
        }

        const tabIndex = focus && stringifyAddress(address) === focus ? 0 : -1;
        hasFocusInGrid = tabIndex === 0 || hasFocusInGrid;

        const cell: Cell = {
          ...classification,
          date,
          onLeave,
          address,
          tabIndex,
          onSelect,
          onPreselect,
          onKeyDown,
        };

        if (classification.current) {
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
    dateAndTime,
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
