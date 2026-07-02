import { CALENDAR_MODE } from '../../constants';
import { CalendarMode, DateAndTime, Range } from '../../types';

const DATE_FMT: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
const MONTH_FMT: Intl.DateTimeFormatOptions = { month: '2-digit', year: 'numeric' };
const YEAR_FMT: Intl.DateTimeFormatOptions = { year: 'numeric' };

const formatDate = (date: Date, locale?: string) => date.toLocaleDateString(locale, DATE_FMT);
const formatMonth = (date: Date, locale?: string) => date.toLocaleDateString(locale, MONTH_FMT);
const formatYear = (date: Date, locale?: string) => date.toLocaleDateString(locale, YEAR_FMT);
const formatTime = (date: Date, showSeconds: boolean, locale?: string) =>
  date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    ...(showSeconds ? { second: '2-digit' } : {}),
  });

export type FormatSelectedValueParams = {
  mode: CalendarMode | 'time';
  value?: Range;
  dateAndTime?: DateAndTime;
  showSeconds: boolean;
  locale?: Intl.Locale;
};

/** Текст выбранного значения для строки «Выбрано:» в мобильном футере (зависит от режима, локализован). */
export function formatSelectedValue({
  mode,
  value,
  dateAndTime,
  showSeconds,
  locale,
}: FormatSelectedValueParams): string {
  const tag = locale?.toString();

  if (mode === CALENDAR_MODE.DateTime) {
    // Показываем то, что уже выбрано, даже частично: время видно сразу, не дожидаясь даты (и наоборот),
    // а строка целиком скрывается только когда не выбрано ничего (FF-8654, #note_3706918).
    if (!dateAndTime) {
      return '';
    }
    const { year, month, day, hours, minutes, seconds } = dateAndTime;
    const dateFilled = year != null && month != null && day != null;
    const timeFilled = hours != null && minutes != null && (!showSeconds || seconds != null);
    if (!dateFilled && !timeFilled) {
      return '';
    }
    const parts: string[] = [];
    if (dateFilled) {
      parts.push(formatDate(new Date(year ?? 0, month ?? 0, day ?? 0), tag));
    }
    if (timeFilled) {
      parts.push(
        formatTime(new Date(2000, 0, 1, hours ?? 0, minutes ?? 0, showSeconds ? (seconds ?? 0) : 0), showSeconds, tag),
      );
    }
    return parts.join(' ');
  }

  if (!value) {
    return '';
  }

  const [start, end] = value;

  switch (mode) {
    case CALENDAR_MODE.Date:
      return formatDate(start, tag);
    case CALENDAR_MODE.Month:
      return formatMonth(start, tag);
    case CALENDAR_MODE.Year:
      return formatYear(start, tag);
    case CALENDAR_MODE.DateRange:
      return `${formatDate(start, tag)} – ${formatDate(end, tag)}`;
    case CALENDAR_MODE.MonthRange:
      return `${formatMonth(start, tag)} – ${formatMonth(end, tag)}`;
    case CALENDAR_MODE.YearRange:
      return `${formatYear(start, tag)} – ${formatYear(end, tag)}`;
    default:
      return '';
  }
}
