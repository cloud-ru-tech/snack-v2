export const PREVIEW_CONTEXT = {
  Service: 'service',
  Functional: 'functional',
} as const;

export const VARIANTS = {
  Preview: 'preview',
  Connecting: 'connecting',
  Partner: 'partner',
  FreeTier: 'freeTier',
  Soon: 'soon',
  Default: 'default',
  Latest: 'latest',
  Private: 'private',
  Public: 'public',
} as const;

export const HOVER_DELAY_OPEN_MS = 300;

export const TEST_IDS = {
  root: 'promo-tag-predefined',
  promoTag: 'promo-tag-predefined__promo-tag',
  tooltipContent: 'promo-tag-predefined__tooltip-content',
  supportLink: 'promo-tag-predefined__support-link',
} as const;
