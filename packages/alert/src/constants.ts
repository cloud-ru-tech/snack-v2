import type { ValueOf } from '@design-system/utils';

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
