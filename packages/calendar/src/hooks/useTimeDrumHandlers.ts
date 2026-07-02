import { useCallback } from 'react';

import { DateAndTime, TimeValue } from '../types';

type TimePart = 'hours' | 'minutes' | 'seconds';

export type TimeDrumHandlers = {
  onHoursChange(next: number): void;
  onMinutesChange(next: number): void;
  onSecondsChange(next: number): void;
};

/** Обработчики колонок `TimePickerDrum`: меняют одну часть в `dateAndTime`, остальные сохраняют. */
export function useTimeDrumHandlers(
  dateAndTime: DateAndTime | undefined,
  onTimeChange: (value: TimeValue | Date) => void,
): TimeDrumHandlers {
  const getTimeChangeHandler = useCallback(
    (part: TimePart) => (next: number) => {
      onTimeChange({
        hours: dateAndTime?.hours ?? 0,
        minutes: dateAndTime?.minutes ?? 0,
        seconds: dateAndTime?.seconds ?? 0,
        [part]: next ?? dateAndTime?.[part] ?? 0,
      });
    },
    [dateAndTime, onTimeChange],
  );

  return {
    onHoursChange: getTimeChangeHandler('hours'),
    onMinutesChange: getTimeChangeHandler('minutes'),
    onSecondsChange: getTimeChangeHandler('seconds'),
  };
}
