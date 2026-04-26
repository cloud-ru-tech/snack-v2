import { CALENDAR_MODE } from '../../src/constants';
import type { BuildCellPropsFunction, CalendarMode, ViewMode } from '../../src/types';
import { ControlledValue } from './types.ts';

/** Режим колбэка ячеек для Playground (migration / E2E). */
export type CalendarStoryBuildCellPropsMode = 'none' | 'for-tests' | 'disable-past';

const disablePast: BuildCellPropsFunction = (date, viewMode: ViewMode) => {
  let isDisabled = false;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  switch (viewMode) {
    case 'month':
      if (date.valueOf() + 86400000 < Date.now()) {
        isDisabled = true;
      }
      break;
    case 'year':
      if (currentYear > date.getFullYear()) {
        isDisabled = false;
      } else if (currentYear === date.getFullYear()) {
        if (date.getMonth() < currentMonth) {
          isDisabled = true;
        }
      }
      break;
    case 'decade':
      if (date.getFullYear() < currentYear) {
        isDisabled = true;
      }
      break;
    default:
      return { isDisabled };
  }
  return { isDisabled };
};

/** Дни 1–13 месяца выключены — как в migration E2E (`modeBuildCellProps: for-tests`). */
const buildCellPropsForTests: BuildCellPropsFunction = (date, viewMode) => {
  switch (viewMode) {
    case 'month':
      if (date.getDate() >= 1 && date.getDate() < 14) {
        return { isDisabled: true };
      }
      return { isDisabled: false };

    default:
      return { isDisabled: false };
  }
};

export function getBuildCellProps(mode: CalendarStoryBuildCellPropsMode): BuildCellPropsFunction | undefined {
  switch (mode) {
    case 'disable-past':
      return disablePast;
    case 'for-tests':
      return buildCellPropsForTests;
    case 'none':
    default:
      return undefined;
  }
}

function isRangeMode(mode: CalendarMode): boolean {
  return mode === CALENDAR_MODE.DateRange || mode === CALENDAR_MODE.MonthRange || mode === CALENDAR_MODE.YearRange;
}

export function coerceStoryDate(raw: unknown): Date | undefined {
  if (raw === undefined || raw === null || raw === '') {
    return undefined;
  }

  const d = raw instanceof Date ? raw : new Date(raw as number | string);

  return Number.isNaN(d.valueOf()) ? undefined : d;
}

export function parseValueFromStory(
  mode: CalendarMode,
  dateValueRaw: unknown,
  rangeStartRaw: unknown,
  rangeEndRaw: unknown,
): ControlledValue {
  if (isRangeMode(mode)) {
    const start = coerceStoryDate(rangeStartRaw);
    const end = coerceStoryDate(rangeEndRaw);

    if (start && end) {
      return [start, end];
    }

    return undefined;
  }

  if (
    mode === CALENDAR_MODE.Date ||
    mode === CALENDAR_MODE.DateTime ||
    mode === CALENDAR_MODE.Month ||
    mode === CALENDAR_MODE.Year
  ) {
    return coerceStoryDate(dateValueRaw);
  }

  return undefined;
}

export function parseDefaultValueFromStory(
  mode: CalendarMode,
  dateDefaultRaw: unknown,
  rangeDefaultStartRaw: unknown,
  rangeDefaultEndRaw: unknown,
): ControlledValue {
  if (isRangeMode(mode)) {
    const start = coerceStoryDate(rangeDefaultStartRaw);
    const end = coerceStoryDate(rangeDefaultEndRaw);

    if (start && end) {
      return [start, end];
    }

    return undefined;
  }

  if (mode === CALENDAR_MODE.Date || mode === CALENDAR_MODE.DateTime) {
    return coerceStoryDate(dateDefaultRaw);
  }

  return undefined;
}
