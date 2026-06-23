import { defineLocale, defineMessages } from '@ds/locale';

const LIST_MESSAGES = defineMessages({
  'en-GB': {
    noData: {
      description: 'No data',
    },
    noResults: {
      description: 'Nothing found',
    },
    errorData: {
      description: 'Error loading data',
    },
    groupSelectButton: {
      reset: 'Reset all',
      select: 'Select all',
    },
  },
  'ru-RU': {
    noData: {
      description: 'Нет данных',
    },
    noResults: {
      description: 'Не найдено',
    },
    errorData: {
      description: 'Ошибка загрузки данных',
    },
    groupSelectButton: {
      reset: 'Сбросить все',
      select: 'Выбрать все',
    },
  },
});

export type ListMessages = (typeof LIST_MESSAGES)['en-GB'];

/** locale компонента List: `listLocale.useTranslations()` в коде, `listLocale.extend(...)` в сервисе. */
export const listLocale = defineLocale('@ds/list', LIST_MESSAGES);
