import { KeyboardEventHandler, useCallback, useEffect, useRef } from 'react';

import { getDefaultItemId } from '@snack-uikit/list';

import { CALENDAR_MODE } from '../../constants';
import { useCalendarContext, useGrid } from '../../hooks';
import { getDateLabel, isTheSameDate, isTheSameMonth } from '../../utils';
import { Grid } from '../Grid';
import { buildMonthGrid } from './utils';

export function MonthView() {
  const {
    mode,
    viewMode,
    dateAndTime,
    setValue,
    preselectedRange,
    startPreselect,
    continuePreselect,
    completePreselect,
    restartPreselect,
    onDateChange,
    locale,
    hoursKeyboardNavigationRef,
  } = useCalendarContext();

  const enterFocusTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(enterFocusTimeoutRef.current);
    },
    [],
  );

  const onDayKeyDown: KeyboardEventHandler = useCallback(
    e => {
      if (mode !== CALENDAR_MODE.DateTime || viewMode !== 'month') {
        return;
      }

      switch (e.key) {
        case 'Tab':
          if (!e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();
            hoursKeyboardNavigationRef.current?.focusItem(getDefaultItemId(dateAndTime?.hours ?? 0));
          }

          break;
        case 'Enter':
          window.clearTimeout(enterFocusTimeoutRef.current);
          enterFocusTimeoutRef.current = setTimeout(() => {
            enterFocusTimeoutRef.current = undefined;
            hoursKeyboardNavigationRef.current?.focusItem(getDefaultItemId(dateAndTime?.hours ?? 0));
          }, 0);
          break;
        default:
          break;
      }
    },
    [dateAndTime?.hours, hoursKeyboardNavigationRef, mode, viewMode],
  );

  const buildGrid = useCallback((date: Date) => buildMonthGrid(date, locale), [locale]);

  const onSelect = useCallback(
    (date: Date) => {
      if (mode === CALENDAR_MODE.DateTime) {
        onDateChange(date);
        return;
      }

      if (mode === CALENDAR_MODE.DateRange) {
        preselectedRange ? completePreselect(date) : startPreselect(date);
        return;
      }

      if (mode === CALENDAR_MODE.Date) {
        setValue([date, date]);
      }
    },
    [completePreselect, mode, onDateChange, preselectedRange, setValue, startPreselect],
  );

  const onPreselect = useCallback(
    (date: Date) => {
      if (preselectedRange) {
        continuePreselect(date);
      }
    },
    [continuePreselect, preselectedRange],
  );

  const onLeave = useCallback(() => {
    if (preselectedRange) {
      restartPreselect();
    }
  }, [preselectedRange, restartPreselect]);

  const grid = useGrid({
    buildGrid,
    isTheSameItem: isTheSameDate,
    isInPeriod: isTheSameMonth,
    getItemLabel: getDateLabel,

    onSelect,
    onPreselect,
    onLeave,

    onKeyDown: onDayKeyDown,
  });

  return <Grid grid={grid} />;
}
