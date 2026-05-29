export const WIDGET_STATE = {
  Default: 'default',
  Loading: 'loading',
  Error: 'error',
} as const;

export const BUTTON_TYPE = {
  Filled: 'filled',
  Outline: 'outline',
  Tonal: 'tonal',
  Function: 'function',
  Simple: 'simple',
  Droplist: 'droplist',
  Kebab: 'kebab',
} as const;

export const TEST_IDS = {
  root: 'widget',
  header: 'widget-header',
  content: 'widget-content',
  actions: 'widget-actions',
  control: 'widget-control',
  kebabButton: 'widget-kebab-button',
  kebabDroplist: 'widget-kebab-droplist',
  dropdown: 'widget-dropdown',
  errorRetry: 'widget-error-retry',
} as const;
