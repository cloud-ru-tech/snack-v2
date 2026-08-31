export const TEST_IDS = {
  cardBanner: 'card-banner',
  cardBannerContent: 'card-banner__content',
  cardBannerImage: 'card-banner__image',
  cardBannerClose: 'card-banner__close',
  cardCustomEmblemPicture: 'card__header__emblem-picture',
  cardCustomEmblemIcon: 'card__header__emblem-icon',
  cardCustomTitle: 'card__header__title',
  cardCustomDescription: 'card__header__description',
  cardCustomMetadata: 'card__header__metadata',
  cardCustomFunctionBadge: 'card__function-badge',
  cardCustomDroplist: 'card__function-badge-droplist',
  cardService: 'card-service',
  cardServiceContent: 'card-service__content',
  cardServiceSmall: 'card-service-small',
  cardServiceSmallTitle: 'card-service-small__title',
  cardServiceSmallFavorite: 'card-service-small__favorite',
  cardServiceSmallPromoBadge: 'card-service-small__promo-badge',
  cardServiceLight: 'card-service-light',
  cardServiceLightTitle: 'card-service-light__title',
  cardServiceLightPromoTag: 'card-service-light__promo-tag',
  cardServiceLightPromoTagTooltip: 'card-service-light__promo-tag__tooltip',
  cardServiceLightFavorite: 'card-service-light__favorite',
  cardServiceLightTooltip: 'card-service-light__tooltip',
  cardServiceInfo: 'card-service-info',
  cardServiceInfoTitle: 'card-service-info__title',
  cardServiceInfoDescription: 'card-service-info__description',
  cardServiceInfoPromoTag: 'card-service-info__promo-tag',
  cardServiceInfoPromoTagTooltip: 'card-service-info__promo-tag__tooltip',
  cardServiceInfoFavorite: 'card-service-info__favorite',
  cardSuggest: 'card-suggest',
  cardSuggestContent: 'card-suggest__content',
  cardSuggestPromoBadge: 'card-suggest__promo-badge',
} as const;

export const VISIBILITY_STRATEGY = {
  hover: 'hover',
  always: 'always',
} as const;

export const CARD_SUGGEST_TRUNCATE_DEFAULTS = {
  title: 2,
  content: 3,
} as const;

export const CARD_SIZE = {
  S: 's',
  M: 'm',
} as const;

export const TOOLTIP_HOVER_DELAY_OPEN_MS = 300;
