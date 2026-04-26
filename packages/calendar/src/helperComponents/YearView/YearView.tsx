import { useCallback } from 'react';

import { AUTOFOCUS, CALENDAR_MODE, VIEW_MODE } from '../../constants';
import { useCalendarContext, useGrid } from '../../hooks';
import { getMonthName, getMonthShift, isTheSameMonth, isTheSameYear } from '../../utils';
import { Grid } from '../Grid';
import { buildYearGrid } from './utils';

export function YearView() {
  const {
    referenceDate,
    setViewMode,
    setViewShift,
    setFocus,
    preselectedRange,
    continuePreselect,
    restartPreselect,
    locale,
    setValue,
    mode,
    startPreselect,
    completePreselect,
  } = useCalendarContext();

  const getItemLabel = useCallback((date: Date) => getMonthName(date, locale), [locale]);

  const onSelect = useCallback(
    (date: Date) => {
      if (mode === CALENDAR_MODE.Month) {
        setValue([date, date]);
        return;
      }

      if (mode === CALENDAR_MODE.MonthRange) {
        preselectedRange ? completePreselect(date) : startPreselect(date);
        return;
      }

      setFocus(AUTOFOCUS);
      setViewShift(getMonthShift(referenceDate, date));
      setViewMode(VIEW_MODE.Month);
    },
    [
      completePreselect,
      mode,
      preselectedRange,
      referenceDate,
      setFocus,
      setValue,
      setViewMode,
      setViewShift,
      startPreselect,
    ],
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
    buildGrid: buildYearGrid,
    isTheSameItem: isTheSameMonth,
    isInPeriod: isTheSameYear,
    getItemLabel,

    onSelect,
    onPreselect,
    onLeave,
  });

  return <Grid grid={grid} />;
}
