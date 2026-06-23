import { defineLocale, defineMessages } from '@ds/locale';

const SEARCH_PRIVATE_MESSAGES = defineMessages({
  'en-GB': {
    placeholder: 'Search',
  },
  'ru-RU': {
    placeholder: 'Поиск',
  },
});

export type SearchPrivateMessages = (typeof SEARCH_PRIVATE_MESSAGES)['en-GB'];

/** locale компонента SearchPrivate: `searchPrivateLocale.useTranslations()` в коде, `searchPrivateLocale.extend(...)` в сервисе. */
export const searchPrivateLocale = defineLocale('@ds/search-private', SEARCH_PRIVATE_MESSAGES);
