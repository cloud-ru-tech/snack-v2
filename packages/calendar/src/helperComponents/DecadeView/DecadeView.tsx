import { useCallback } from 'react';

import { CALENDAR_MODE, VIEW_MODE } from '../../constants';
import { useCalendarContext, useGrid } from '../../hooks';
import { getYearLabel, getYearShift, isTheSameDecade, isTheSameYear } from '../../utils';
import { Grid } from '../Grid';
import { buildDecadeGrid } from './utils';

export function DecadeView() {
  const {
    referenceDate,
    setViewMode,
    setViewShift,
    preselectedRange,
    continuePreselect,
    restartPreselect,
    mode,
    setValue,
    startPreselect,
    completePreselect,
  } = useCalendarContext();

  const onSelect = useCallback(
    (date: Date) => {
      if (mode === CALENDAR_MODE.YearRange) {
        preselectedRange ? completePreselect(date) : startPreselect(date);
        return;
      }

      if (mode === CALENDAR_MODE.Year) {
        setValue([date, date]);
        return;
      }

      setViewShift(getYearShift(referenceDate, date));
      setViewMode(VIEW_MODE.Year);
    },
    [completePreselect, mode, preselectedRange, referenceDate, setValue, setViewMode, setViewShift, startPreselect],
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
    buildGrid: buildDecadeGrid,
    isTheSameItem: isTheSameYear,
    isInPeriod: isTheSameDecade,
    getItemLabel: getYearLabel,

    onSelect,
    onPreselect,
    onLeave,
  });

  return <Grid grid={grid} />;
}
