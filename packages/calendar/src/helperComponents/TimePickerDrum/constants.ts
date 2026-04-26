export const TEST_IDS = {
  root: 'time-picker-drum',
  selectedDate: 'time-picker-drum__selected-date',
  selectedTime: 'time-picker-drum__selected-time',
  drum: 'time-picker-drum__drum',
  hoursColumn: 'time-picker-drum__hours',
  minutesColumn: 'time-picker-drum__minutes',
  secondsColumn: 'time-picker-drum__seconds',
} as const;

export const ROW_REL = [-2, -1, 0, 1, 2] as const;

export const noop = () => {};
