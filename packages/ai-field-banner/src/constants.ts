export const VARIANT = {
  Information: 'information',
  Security: 'security',
  Critical: 'critical',
  Help: 'help',
  Warning: 'warning',
  Agentic: 'agentic',
} as const;

export const VARIANT_ORDER = [
  VARIANT.Information,
  VARIANT.Security,
  VARIANT.Help,
  VARIANT.Agentic,
  VARIANT.Warning,
  VARIANT.Critical,
] as const;

export const SIZE = {
  S: 's',
  M: 'm',
} as const;

export const TEST_IDS = {
  root: 'ai-field-banner',
  mainLine: 'ai-field-banner__main-line',
  icon: 'ai-field-banner__icon',
  content: 'ai-field-banner__content',
  action: 'ai-field-banner__action',
  close: 'ai-field-banner__close',
  bottomContent: 'ai-field-banner__bottom-content',
} as const;
