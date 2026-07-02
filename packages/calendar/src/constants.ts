export const VIEW_MODE = {
  Month: 'month',
  Year: 'year',
  Decade: 'decade',
} as const;

export const CALENDAR_MODE = {
  Date: 'date',
  DateTime: 'date-time',
  DateRange: 'date-range',
  Month: 'month',
  MonthRange: 'month-range',
  Year: 'year',
  YearRange: 'year-range',
} as const;

export const RANGE_POSITION = {
  Out: 'out',
  Start: 'start',
  In: 'in',
  End: 'end',
  StartEnd: 'start-end', // equals to 'out'
} as const;

export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export const GRID_SIZE = {
  [VIEW_MODE.Month]: { rows: 6, columns: 7 },
  [VIEW_MODE.Year]: { rows: 4, columns: 3 },
  [VIEW_MODE.Decade]: { rows: 4, columns: 3 },
} as const;

export const AUTOFOCUS = 'autofocus';

/** Playground / E2E — синхронизировать со stories (`data-test-id`). */
export const TEST_IDS = {
  calendarPlayground: 'calendar-playground',
  calendarValueHolder: 'calendar-value-holder',
  calendarDropdown: 'calendar-dropdown',
  calendarDropdownTrigger: 'calendar-dropdown-trigger',
  calendarDropdownContent: 'content-calendar-dropdown',
  timePickerPlayground: 'timepicker-playground',
  timePickerValueHolder: 'timepicker-value-holder',
  timePickerDropdown: 'time-picker-dropdown',
  timePickerDropdownTrigger: 'time-picker-dropdown-trigger',
  timePickerDropdownContent: 'content-time-picker-dropdown',
  timePickerDrum: 'time-picker-drum',
  calendarItem: 'calendar-item',
  // Mobile (bottom-sheet) surfaces — FF-8654.
  timePickerMobileApply: 'time-picker-mobile-apply',
  timePickerMobileCurrent: 'time-picker-mobile-current',
  calendarMobileHeaderLevel: 'calendar-mobile-header-level',
  calendarMobileTimeButton: 'calendar-mobile-time-button',
  calendarMobilePresetsButton: 'calendar-mobile-presets-button',
  calendarMobilePeriodBlock: 'calendar-mobile-period-block',
  calendarMobileApply: 'calendar-mobile-apply',
  calendarMobileCurrent: 'calendar-mobile-current',
  // Префикс для `getTestId` (даёт `selected-<testId>` на строке «Выбрано:»).
  calendarMobileSelected: 'selected',
} as const;

export const HOURS = 24;
export const MINUTES = 60;
export const SECONDS = 60;
