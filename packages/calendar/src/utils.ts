import { Lang } from '@ds/locale';
import { isBrowser } from '@ds/utils';
import { getWeekStartByLocale } from 'weekstart';

import { RANGE_POSITION, VIEW_MODE } from './constants';
import { DateAndTime, Range, RangePosition, TimeValue, ViewMode } from './types';

export const isTheSameDecade = (date1: Date, date2: Date) =>
  Math.floor(date1.getFullYear() / 10) === Math.floor(date2.getFullYear() / 10);

export const isTheSameYear = (date1: Date, date2: Date): boolean => date1.getFullYear() === date2.getFullYear();

export const isTheSameMonth = (date1: Date, date2: Date): boolean =>
  isTheSameYear(date1, date2) && date1.getMonth() === date2.getMonth();

export function isTheSameDate(date1: Date, date2: Date): boolean {
  return isTheSameMonth(date1, date2) && date1.getDate() === date2.getDate();
}

export function timeValuesEqual(current: TimeValue | undefined, next: TimeValue): boolean {
  if (current === undefined) {
    return false;
  }

  return (
    (current.hours ?? 0) === (next.hours ?? 0) &&
    (current.minutes ?? 0) === (next.minutes ?? 0) &&
    (current.seconds ?? 0) === (next.seconds ?? 0)
  );
}

export const capitalize = (str: string) => str.substring(0, 1).toUpperCase() + str.substring(1);

export const getMonthName = (date: Date, locale?: Intl.Locale): string => {
  const monthName = date.toLocaleString(locale, { month: 'long' });
  return capitalize(monthName);
};

export const getDateLabel = (date: Date) => date.getDate().toString();

export const getYearLabel = (date: Date) => date.getFullYear().toString();

export const getMonthShift = (today: Date, targetDate: Date) => {
  const overYearDiff = (targetDate.getFullYear() - today.getFullYear()) * 12;
  const monthsDiff = targetDate.getMonth() - today.getMonth();
  return overYearDiff + monthsDiff;
};

export const getYearShift = (today: Date, targetDate: Date) => targetDate.getFullYear() - today.getFullYear();

export const getDecadeShift = (today: Date, targetDate: Date) =>
  Math.trunc((targetDate.getFullYear() - today.getFullYear()) / 10);

export const isTheSameItem = (viewMode: ViewMode, date1: Date, date2: Date): boolean => {
  switch (viewMode) {
    case VIEW_MODE.Month:
      return isTheSameDate(date1, date2);
    case VIEW_MODE.Year:
      return isTheSameMonth(date1, date2);
    case VIEW_MODE.Decade:
      return isTheSameYear(date1, date2);
    default:
      return false;
  }
};

export const sortDates = (dates: Date[]): Date[] => [...dates].sort((d1, d2) => d1.valueOf() - d2.valueOf());

export const getInRangePosition = (date: Date, viewMode: ViewMode, range?: Range): RangePosition => {
  if (!range) {
    return RANGE_POSITION.Out;
  }

  const [startDate, endDate] = sortDates(range);

  const isStart = isTheSameItem(viewMode, date, startDate);
  const isEnd = isTheSameItem(viewMode, date, endDate);

  if (isStart && isEnd) {
    return RANGE_POSITION.StartEnd;
  }

  if (isStart) {
    return RANGE_POSITION.Start;
  }

  if (isEnd) {
    return RANGE_POSITION.End;
  }

  const [start, end] = [startDate.valueOf(), endDate.valueOf()];

  return date.valueOf() >= start && date.valueOf() <= end ? RANGE_POSITION.In : RANGE_POSITION.Out;
};

export const getEndOfTheDay = (date: Date) =>
  new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).valueOf() - 1);

export const getStartOfTheMonth = (date: Date) => new Date(new Date(date.getFullYear(), date.getMonth(), 1).valueOf());

export const getEndOfTheMonth = (date: Date) =>
  new Date(new Date(date.getFullYear(), date.getMonth() + 1, 1).valueOf() - 1);

export const getStartOfTheYear = (date: Date) => new Date(new Date(date.getFullYear(), 0, 1).valueOf());

export const getEndOfTheYear = (date: Date) => new Date(new Date(date.getFullYear() + 1, 0, 1).valueOf() - 1);

export const getTestIdBuilder = (testId?: string) => (prefix: string) => (testId ? `${prefix}-${testId}` : undefined);

const getNavigatorLocale = () => (isBrowser() ? (navigator?.language ?? 'ru-RU') : 'ru-RU');

export const getLocale = ({ localeProp, ctxLang }: { localeProp?: Intl.Locale; ctxLang?: Lang } = {}) =>
  localeProp || new Intl.Locale(ctxLang ? ctxLang.replace('_', '-') : getNavigatorLocale());

export const getStartOfWeek = (locale: Intl.Locale) => getWeekStartByLocale(locale.language);

export const isWeekend = (date: Date, viewMode: ViewMode) => {
  if (viewMode === 'month') {
    return date.getDay() === 0 || date.getDay() === 6;
  }
  return false;
};

export function isTimePortionComplete(
  dateAndTime: Pick<DateAndTime, 'hours' | 'minutes' | 'seconds'>,
  showSeconds?: boolean,
): boolean {
  const { hours, minutes, seconds } = dateAndTime;
  return [hours, minutes, ...(showSeconds ? [seconds] : [])].every(v => v !== undefined);
}

export const stringifyAddress = (address: [number, number]): string => address.join('-');
