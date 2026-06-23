import { defineLocale, defineMessages } from '@ds/locale';

const CALENDAR_MESSAGES = defineMessages({
  'en-GB': {
    current: 'Current',
    apply: 'Apply',
    time: 'Time',
    presets: 'Presets',
    prevPeriodMonth: 'Previous month',
    nextPeriodMonth: 'Next month',
    prevPeriodYear: 'Previous year',
    nextPeriodYear: 'Next year',
    prevPeriodDecade: 'Previous decade',
    nextPeriodDecade: 'Next decade',
    defaultPresets: {
      lastWeek: 'Last 7 days',
      lastTwoWeeks: 'Last 14 days',
      lastMonth: 'Last 30 days',
      lastQuarter: 'Last 90 days',
      lastThird: 'Last 120 days',
      lastYear: 'Last 1 year',
      lastTwoYears: 'Last 2 years',
    },
  },
  'ru-RU': {
    current: 'Сейчас',
    apply: 'Применить',
    time: 'Время',
    presets: 'Пресеты',
    prevPeriodMonth: 'Предыдущий месяц',
    nextPeriodMonth: 'Следующий месяц',
    prevPeriodYear: 'Предыдущий год',
    nextPeriodYear: 'Следующий год',
    prevPeriodDecade: 'Предыдущее десятилетие',
    nextPeriodDecade: 'Следующее десятилетие',
    defaultPresets: {
      lastWeek: 'Последние 7 дней',
      lastTwoWeeks: 'Последние 14 дней',
      lastMonth: 'Последние 30 дней',
      lastQuarter: 'Последние 90 дней',
      lastThird: 'Последние 120 дней',
      lastYear: 'Последний 1 год',
      lastTwoYears: 'Последние 2 года',
    },
  },
});

export type CalendarMessages = (typeof CALENDAR_MESSAGES)['en-GB'];

/** locale компонента Calendar: `calendarLocale.useTranslations()` в коде, `calendarLocale.extend(...)` в сервисе. */
export const calendarLocale = defineLocale('@ds/calendar', CALENDAR_MESSAGES);
