import { defineLocale, defineMessages } from '@ds/locale';

const PROMO_TAG_PREDEFINED_MESSAGES = defineMessages({
  'en-GB': {
    connecting: 'Connecting',
    partner: 'Partner',
    preview: 'Preview',
    tooltipConnecting:
      'The service is connecting and will be available soon. If it takes too long, please contact support.',
    tooltipPartner:
      'A vendor partner service. It is subject to unique pricing conditions, the partner defines the service and support SLA.',
    tooltipPreviewService:
      'The service is in the Preview stage. It cannot be increased by quota and the pricing conditions, service and support SLA do not apply.',
    tooltipPreviewFunctional:
      'The functionality is in the Preview stage. It is not subject to pricing conditions, service and support SLA.',
  },
  'ru-RU': {
    connecting: 'Подключается',
    partner: 'Partner',
    preview: 'Preview',
    tooltipConnecting:
      'Сервис подключается и скоро будет доступен. Если это происходит слишком долго, обратитесь в поддержку.',
    tooltipPartner:
      'Сервис вендора-партнера. Для него действуют уникальные условия тарификации, партнер определяет SLA сервиса и поддержки.',
    tooltipPreviewService:
      'Сервис находится в стадии Preview. Для него недоступно увеличение квоты и не действуют условия тарификации, SLA сервиса и поддержки.',
    tooltipPreviewFunctional:
      'Функциональность находится в стадии Preview. Для нее не действуют условия тарификации, SLA сервиса и поддержки.',
  },
});

export type PromoTagPredefinedMessages = (typeof PROMO_TAG_PREDEFINED_MESSAGES)['en-GB'];

/** locale компонента PromoTagPredefined: `promoTagPredefinedLocale.useTranslations()` в коде, `.extend(...)` в сервисе. */
export const promoTagPredefinedLocale = defineLocale(
  '@ds/uikit-product-promo-tag-predefined',
  PROMO_TAG_PREDEFINED_MESSAGES,
);
