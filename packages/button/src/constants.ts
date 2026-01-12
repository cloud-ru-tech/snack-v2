export const APPEARANCE = {
  Primary: 'primary',
  Neutral: 'neutral',
  Destructive: 'destructive',
} as const;

export const HTML_TYPE = {
  Button: 'button',
  Submit: 'submit',
  Reset: 'reset',
} as const;

export const TARGET = {
  Blank: '_blank',
  Self: '_self',
  Parent: '_parent',
  Top: '_top',
} as const;

export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export const ICON_POSITION = {
  Before: 'before',
  After: 'after',
} as const;

export enum Variant {
  LabelOnly = 'label-only',
  IconOnly = 'icon-only',
  IconBefore = 'icon-before',
  IconAfter = 'icon-after',
}

export const APPEARANCE_TO_COLOR_MAP = {
  [APPEARANCE.Neutral]: 'neutral',
  [APPEARANCE.Primary]: 'primary',
  [APPEARANCE.Destructive]: 'destructive',
} as const;
















