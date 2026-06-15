export const DATE_MODE = {
  Date: 'date',
  DateTime: 'date-time',
  DateRange: 'date-range',
} as const;

/** Дефолтные aria-label'ы полей периода (RU — паритет с языком компонента по умолчанию). */
export const DATE_RANGE_LABELS = {
  from: 'Начало периода',
  to: 'Конец периода',
} as const;
