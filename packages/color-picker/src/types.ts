import { ValueOf } from '@ds/utils';

import { COLOR_MODE, SIZE } from './constants';

export type ColorMode = ValueOf<typeof COLOR_MODE>;

export type Size = ValueOf<typeof SIZE>;

type Alpha = { a: number };

export type RgbColor = { r: number; g: number; b: number };
export type RgbaColor = RgbColor & Alpha;

export type HslColor = { h: number; s: number; l: number };
export type HslaColor = HslColor & Alpha;

export type HsvColor = { h: number; s: number; v: number };
export type HsvaColor = HsvColor & Alpha;

export type Color = RgbColor | HslColor | HsvColor | RgbaColor | HslaColor | HsvaColor | string;

/** Текущий цвет, представленный во всех поддерживаемых моделях. Передаётся в `onChange`. */
export type RawColor = {
  /** `#rrggbb` или `#rrggbbaa` (когда альфа < 1). */
  hex: string;
  rgb: RgbColor;
  hsl: HslColor;
  hsv: HsvColor;
  rgba: RgbaColor;
  hsla: HslaColor;
  hsva: HsvaColor;
};
