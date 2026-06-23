import { defineLocale, defineMessages } from '@ds/locale';

const DROPDOWN_MESSAGES = defineMessages({
  'en-GB': {
    states: {
      notFound: {
        title: 'Not Found',
        action: 'Update',
      },
      noData: {
        title: 'No data',
        action: 'Update',
      },
      dataError: {
        title: 'Data error',
        action: 'Update',
      },
    },
  },
  'ru-RU': {
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
});

export type DropdownMessages = (typeof DROPDOWN_MESSAGES)['en-GB'];

/** locale компонента Dropdown: `dropdownLocale.useTranslations()` в коде, `dropdownLocale.extend(...)` в сервисе. */
export const dropdownLocale = defineLocale('@ds/dropdown', DROPDOWN_MESSAGES);
