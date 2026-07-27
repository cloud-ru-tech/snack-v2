export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export const VALIDATION_STATE = {
  Default: 'default',
  Error: 'error',
  Warning: 'warning',
  Success: 'success',
  Valid: 'valid',
} as const;

export const TEST_IDS = {
  fieldDecorator: 'field-decorator',
  label: 'field-decorator__label',
  required: 'field-decorator__required-sign',
  labelTooltip: 'field-decorator__label-tooltip',
  caption: 'field-decorator__caption',
  hint: 'field-decorator__hint',
  counter: 'field-decorator__counter',
} as const;
