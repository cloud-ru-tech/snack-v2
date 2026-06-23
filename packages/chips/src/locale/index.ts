import { defineLocale, defineMessages } from '@ds/locale';

const CHIPS_MESSAGES = defineMessages({
  'en-GB': {
    allLabel: 'All',
    apply: 'Apply',
    cancel: 'Cancel',
    add: 'Add',
    clear: 'Clear',
    addButtonDisabledTip: 'No filters available to add',
  },
  'ru-RU': {
    allLabel: 'Все',
    apply: 'Применить',
    cancel: 'Отмена',
    add: 'Добавить',
    clear: 'Сбросить',
    addButtonDisabledTip: 'Нет фильтров для добавления',
  },
});

export type ChipsMessages = (typeof CHIPS_MESSAGES)['en-GB'];

/** locale компонента Chips: `chipsLocale.useTranslations()` в коде, `chipsLocale.extend(...)` в сервисе. */
export const chipsLocale = defineLocale('@ds/chips', CHIPS_MESSAGES);
