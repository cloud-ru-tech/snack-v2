import { ValueOf } from '@ds/utils';

export const APPEARANCE = {
  Neutral: 'neutral',
  Primary: 'primary',
  Error: 'error',
  Warning: 'warning',
  Success: 'success',
  Info: 'info',
} as const;

export const ALIGN = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
} as const;

export const SIZE = {
  S: 's',
  M: 'm',
} as const;

/** Ключ темы для фона/иконки inline Alert (data-color) */
export const TEST_IDS = {
  alert: {
    root: 'alert',
    title: 'alert__title',
    content: 'alert__content',
    closeButton: 'alert__close-button',
    icon: 'alert__icon',
    expandingIcon: 'alert__expanding-icon',
  },
  alertTop: {
    root: 'alert-top',
    title: 'alert-top__title',
    content: 'alert-top__content',
    closeButton: 'alert-top__close-button',
    icon: 'alert-top__icon',
    expandingIcon: 'alert-top__expanding-icon',
  },
} as const;

export const APPEARANCE_TO_THEME_COLOR: Record<
  ValueOf<typeof APPEARANCE>,
  'neutral' | 'primary' | 'red' | 'yellow' | 'green' | 'blue'
> = {
  [APPEARANCE.Neutral]: 'neutral',
  [APPEARANCE.Primary]: 'primary',
  [APPEARANCE.Error]: 'red',
  [APPEARANCE.Warning]: 'yellow',
  [APPEARANCE.Success]: 'green',
  [APPEARANCE.Info]: 'blue',
};
