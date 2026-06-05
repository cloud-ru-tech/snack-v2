export const TYPE = {
  Information: 'information',
  Security: 'security',
  Critical: 'critical',
  Help: 'help',
  Warning: 'warning',
  Agentic: 'agentic',
} as const;

export const TYPE_ORDER = [
  TYPE.Information,
  TYPE.Security,
  TYPE.Help,
  TYPE.Agentic,
  TYPE.Warning,
  TYPE.Critical,
] as const;

export const SIZE = {
  S: 's',
  M: 'm',
} as const;

export const TEST_IDS = {
  root: 'ai-field-banner',
  advice: 'ai-field-banner__advice',
  mainLine: 'ai-field-banner__main-line',
  icon: 'ai-field-banner__icon',
  description: 'ai-field-banner__description',
  action: 'ai-field-banner__action',
  additional: 'ai-field-banner__additional',
} as const;
