import { en_GB } from './en_GB';

export const ru_RU: typeof en_GB = {
  Calendar: {
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
  Dropdown: {
    states: {
      notFound: {
        title: 'Не найдено',
        action: 'Перезагрузить',
      },
      noData: {
        title: 'Нет данных',
        action: 'Перезагрузить',
      },
      dataError: {
        title: 'Ошибка',
        action: 'Перезагрузить',
      },
    },
  },
  SearchPrivate: {
    placeholder: 'Поиск',
  },
};
