import { CALENDAR_MODE, SIZE } from '../src/constants';
import { CalendarMode } from '../src/types';

export { TEST_IDS } from '../src/constants';

type Size = (typeof SIZE)[keyof typeof SIZE];

/** Корень wrapper'а ячейки VM-матрицы TimePickerDropdown. Используется компонентом
 * как `data-test-id`, из него внутренние слоты (`content`) производят свой id через
 * `getTestIdBuilder` → `content-${root}`. */
export const getTimePickerDropdownMatrixCellTestId = (size: Size, showSeconds: boolean): string =>
  `time-picker-dropdown-cell-${size}-${showSeconds ? 'seconds' : 'no-seconds'}`;

/** `data-test-id` button-триггера внутри ячейки. */
export const getTimePickerDropdownMatrixTriggerTestId = (size: Size, showSeconds: boolean): string =>
  `time-picker-dropdown-trigger-${size}-${showSeconds ? 'seconds' : 'no-seconds'}`;

export const getCalendarDropdownMatrixCellTestId = (size: Size, mode: CalendarMode): string =>
  `calendar-dropdown-cell-${size}-${mode}`;

export const getCalendarDropdownMatrixTriggerTestId = (size: Size, mode: CalendarMode): string =>
  `calendar-dropdown-trigger-${size}-${mode}`;

const CALENDAR_MODES = [CALENDAR_MODE.Date, CALENDAR_MODE.DateTime, CALENDAR_MODE.DateRange] as const;

/** Декартова матрица size × showSeconds. Каждая ячейка несёт три id:
 * `cellTestId` (root) → автодеривация `content-${cellTestId}` (через `getTestIdBuilder`),
 * `triggerTestId` (button). Это исключает хардкод в visual.spec. */
export const TIME_PICKER_DROPDOWN_MATRIX = (Object.values(SIZE) as ReadonlyArray<Size>).flatMap(size =>
  [true, false].map(showSeconds => ({
    size,
    showSeconds,
    cellTestId: getTimePickerDropdownMatrixCellTestId(size, showSeconds),
    triggerTestId: getTimePickerDropdownMatrixTriggerTestId(size, showSeconds),
    contentTestId: `content-${getTimePickerDropdownMatrixCellTestId(size, showSeconds)}`,
  })),
);

export const CALENDAR_DROPDOWN_MATRIX = (Object.values(SIZE) as ReadonlyArray<Size>).flatMap(size =>
  CALENDAR_MODES.map(mode => ({
    size,
    mode,
    cellTestId: getCalendarDropdownMatrixCellTestId(size, mode),
    triggerTestId: getCalendarDropdownMatrixTriggerTestId(size, mode),
    contentTestId: `content-${getCalendarDropdownMatrixCellTestId(size, mode)}`,
  })),
);

/** Story-level ids для Calendar examples. */
export const CALENDAR_EXAMPLE_TEST_IDS = {
  rangeRoot: 'calendar-range-root',
  range: 'calendar-range',
  rangeValue: 'calendar-range-value',
  minMax: 'calendar-min-max',
} as const;
