import { defineLocale, defineMessages } from '@ds/locale';

const TABLE_MESSAGES = defineMessages({
  'en-GB': {
    searchPlaceholder: 'Search',
    rowsOptionsLabel: 'Rows volume',
    settingsHeaderLabel: 'Columns settings',
    sort: 'Sort',
    clearSort: 'Clear sorting',
    export: 'Export',
    loadMore: 'Load more',
    groupSelectButton: {
      show: 'Show all',
      hide: 'Hide all',
    },
    noData: {
      title: 'No data',
    },
    noResults: {
      title: 'Nothing found',
      description: 'Try changing your search query or filters',
    },
    errorData: {
      title: 'Failed to load data',
      description: 'Try again later',
    },
  },
  'ru-RU': {
    searchPlaceholder: 'Поиск',
    rowsOptionsLabel: 'Строк на странице',
    settingsHeaderLabel: 'Настройки колонок',
    sort: 'Сортировка',
    clearSort: 'Сбросить сортировку',
    export: 'Экспорт',
    loadMore: 'Загрузить ещё',
    groupSelectButton: {
      show: 'Показать все',
      hide: 'Скрыть все',
    },
    noData: {
      title: 'Нет данных',
    },
    noResults: {
      title: 'Ничего не найдено',
      description: 'Измените поисковый запрос или фильтры',
    },
    errorData: {
      title: 'Не удалось загрузить данные',
      description: 'Попробуйте позже',
    },
  },
});

export type TableMessages = (typeof TABLE_MESSAGES)['en-GB'];

/** locale компонента Table: `tableLocale.useTranslations()` в коде, `tableLocale.extend(...)` в сервисе. */
export const tableLocale = defineLocale('@ds/table', TABLE_MESSAGES);
