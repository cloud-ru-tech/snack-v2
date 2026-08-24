import { defineLocale, defineMessages } from '@ds/locale';

const CARD_PREDEFINED_MESSAGES = defineMessages({
  'en-GB': {
    actions: {
      info: 'Details',
      favoriteAdd: 'Add to favourites',
      favoriteRemove: 'Remove from favourites',
      expand: 'Expand',
      collapse: 'Collapse',
    },
  },
  'ru-RU': {
    actions: {
      info: 'Подробнее',
      favoriteAdd: 'Добавить в избранное',
      favoriteRemove: 'Удалить из избранного',
      expand: 'Развернуть',
      collapse: 'Свернуть',
    },
  },
});

export type CardPredefinedMessages = (typeof CARD_PREDEFINED_MESSAGES)['en-GB'];

/** locale пакета карточек: `cardPredefinedLocale.useTranslations()` в коде, `.extend(...)` в сервисе. */
export const cardPredefinedLocale = defineLocale('@ds/uikit-product-card-predefined', CARD_PREDEFINED_MESSAGES);
