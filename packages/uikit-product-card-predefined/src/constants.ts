export const TEST_IDS = {
  cardBanner: 'card-banner',
  cardBannerDescription: 'card-banner__description',
  cardBannerImage: 'card-banner__image',
  cardBannerClose: 'card-banner__close',
  cardService: 'card-service',
  cardServiceDescription: 'card-service__description',
  cardServiceSmall: 'card-service-small',
  cardServiceSmallTitle: 'card-service-small__title',
  cardServiceSmallFavorite: 'card-service-small__favorite',
  cardServiceSmallPromoBadge: 'card-service-small__promo-badge',
  cardServiceLight: 'card-service-light',
  cardServiceLightTitle: 'card-service-light__title',
  cardServiceLightPromoTag: 'card-service-light__promo-tag',
  cardServiceLightFavorite: 'card-service-light__favorite',
  cardSuggest: 'card-suggest',
  cardSuggestDescription: 'card-suggest__description',
  cardSuggestPromoBadge: 'card-suggest__promo-badge',
} as const;

export const VISIBILITY_STRATEGY = {
  hover: 'hover',
  always: 'always',
} as const;

export const CARD_SUGGEST_TRUNCATE_DEFAULTS = {
  title: 2,
  description: 3,
} as const;

export const CARD_SIZE = {
  S: 's',
  M: 'm',
} as const;
