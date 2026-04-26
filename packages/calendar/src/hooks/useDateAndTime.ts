import { useCallback, useEffect, useRef, useState } from 'react';

import { DateAndTime, Range, TimeValue } from '../types';
import { isTimePortionComplete } from '../utils';

export function useDateAndTime({
  showSeconds,
  value,
}: {
  showSeconds?: boolean;
  value: Range | TimeValue | undefined;
}) {
  const [dateAndTime, setDateAndTime] = useState<DateAndTime>(() => {
    if (Array.isArray(value)) {
      const initialValue = value[0];

      return {
        year: initialValue.getFullYear(),
        month: initialValue.getMonth(),
        day: initialValue.getDate(),
        hours: initialValue.getHours(),
        minutes: initialValue.getMinutes(),
        seconds: initialValue.getSeconds(),
      };
    }

    return {
      year: undefined,
      month: undefined,
      day: undefined,
      hours: value?.hours,
      minutes: value?.minutes,
      seconds: value?.seconds,
    };
  });

  const isDateFilled = useCallback(() => {
    const { year, month, day } = dateAndTime;
    return [year, month, day].every(value => value !== undefined);
  }, [dateAndTime]);

  const isTimeFilled = useCallback(() => isTimePortionComplete(dateAndTime, showSeconds), [dateAndTime, showSeconds]);

  const isDateAndTimeFilled = useCallback(() => isTimeFilled() && isDateFilled(), [isDateFilled, isTimeFilled]);

  const onDateChange = useCallback((value: Pick<DateAndTime, 'year' | 'month' | 'day'> | Date) => {
    if (value instanceof Date) {
      setDateAndTime(prevDate => ({
        ...prevDate,
        year: value.getFullYear(),
        month: value.getMonth(),
        day: value.getDate(),
      }));
    } else {
      setDateAndTime(prevDate => ({ ...prevDate, ...value }));
    }
  }, []);

  const onTimeChange = useCallback((value: TimeValue | Date) => {
    if (value instanceof Date) {
      setDateAndTime(prevDate => ({
        ...prevDate,
        hours: value.getHours(),
        minutes: value.getMinutes(),
        seconds: value.getSeconds(),
      }));
    } else {
      setDateAndTime(prevDate => ({ ...prevDate, ...value }));
    }
  }, []);

  const onDateAndTimeChange = useCallback((value: DateAndTime | Date) => {
    if (value instanceof Date) {
      setDateAndTime({
        year: value.getFullYear(),
        month: value.getMonth(),
        day: value.getDate(),
        hours: value.getHours(),
        minutes: value.getMinutes(),
        seconds: value.getSeconds(),
      });
    } else {
      setDateAndTime(value);
    }
  }, []);

  /** Левый конец Range из пропа: полный sync только при новом instant, иначе не затираем время до onChange. */
  const lastSyncedRangeStartMs = useRef<number | null>(null);
  const lastSyncedTimeValueKey = useRef<string | null>(null);

  useEffect(() => {
    if (!value) {
      lastSyncedRangeStartMs.current = null;
      lastSyncedTimeValueKey.current = null;
      setDateAndTime({});
      return;
    }

    if (Array.isArray(value)) {
      lastSyncedTimeValueKey.current = null;
      const rangeStartMs = value[0].getTime();

      if (lastSyncedRangeStartMs.current !== rangeStartMs) {
        lastSyncedRangeStartMs.current = rangeStartMs;
        onDateAndTimeChange(value[0]);
      }

      return;
    }

    lastSyncedRangeStartMs.current = null;
    const timeKey = `${value.hours ?? ''}:${value.minutes ?? ''}:${value.seconds ?? ''}`;

    if (lastSyncedTimeValueKey.current !== timeKey) {
      lastSyncedTimeValueKey.current = timeKey;
      onTimeChange(value);
    }
  }, [onDateAndTimeChange, onTimeChange, value]);

  return {
    dateAndTime,
    setDateAndTime,
    isDateAndTimeFilled,
    isTimeFilled,
    isDateFilled,
    onDateChange,
    onTimeChange,
    onDateAndTimeChange,
  };
}
