import { defineLocale, defineMessages } from '@ds/locale';

const HEADER_LEGACY_MESSAGES = defineMessages({
  'en-GB': {
    close: 'Close',
    mainMenu: {
      navigation: 'Navigation',
      favorite: 'Favorites',
      noData: 'No services',
      noDataFound: 'Nothing found',
      searchFuzzy: 'With synonyms',
      searchPrecise: 'Exact',
    },
    navigationSearch: {
      placeholder: 'Search services',
      mobileTitle: 'Services',
      settingsTitle: 'Search settings',
    },
    platformLogo: {
      avatarName: {
        partner: 'Partner Cabinet',
        marketplace: 'Marketplace Account',
      },
    },
  },
  'ru-RU': {
    close: 'Закрыть',
    mainMenu: {
      navigation: 'Навигация',
      favorite: 'Избранное',
      noData: 'Нет сервисов',
      noDataFound: 'Ничего не найдено',
      searchFuzzy: 'С синонимами',
      searchPrecise: 'Точный',
    },
    navigationSearch: {
      placeholder: 'Поиск по сервисам',
      mobileTitle: 'Сервисы',
      settingsTitle: 'Настройки поиска',
    },
    platformLogo: {
      avatarName: {
        partner: 'Партнерский Кабинет',
        marketplace: 'Маркетплейс Аккаунт',
      },
    },
  },
});

export type HeaderLegacyMessages = (typeof HEADER_LEGACY_MESSAGES)['en-GB'];

/** locale пакета header-legacy: `headerLegacyLocale.useTranslations()` в коде, `headerLegacyLocale.extend(...)` в сервисе. */
export const headerLegacyLocale = defineLocale('@ds/uikit-product-header-legacy', HEADER_LEGACY_MESSAGES);
