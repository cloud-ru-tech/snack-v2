import { ValueOf } from '@ds/utils';
/** Значения `data-acrylic-appearance` / `data-acrylic-level` — в паре с `_acrylic.scss`. */
const APPEARANCE = {
  Primary: 'primary',
  Neutral: 'neutral',
  Red: 'red',
  Orange: 'orange',
  Yellow: 'yellow',
  Green: 'green',
  Blue: 'blue',
  Violet: 'violet',
  Pink: 'pink',
  DecorTransparent: 'decorTransparent',
  Transparent: 'transparent',
} as const;

/** Значения `data-acrylic-level`. */
export const ACRYLIC_LEVEL = {
  Default: 'default',
  FirstLevel: '1Level',
} as const;

const LEVEL = ACRYLIC_LEVEL;

type Appearance = ValueOf<typeof APPEARANCE>;
export type AcrylicLevel = ValueOf<typeof ACRYLIC_LEVEL>;
type Level = AcrylicLevel;

const A = APPEARANCE;
const L = LEVEL;

/**
 * Preferred instance swap слота backgroundPredefined
 * Строковые значения — как полные имена материалов в Figma
 */
export const BACKGROUND_PREDEFINED_FILL = {
  Transparent: 'transparent',
  DecorTransparent: 'decorTransparent',
  PrimaryBackground: 'primaryBackground',
  NeutralBackground1Level: 'neutralBackground1Level',
  RedBackground: 'redBackground',
  OrangeBackground: 'orangeBackground',
  YellowBackground: 'yellowBackground',
  GreenBackground: 'greenBackground',
  BlueBackground: 'blueBackground',
  VioletBackground: 'violetBackground',
  PinkBackground: 'pinkBackground',
} as const;

export type BackgroundPredefinedFill = ValueOf<typeof BACKGROUND_PREDEFINED_FILL>;

export const BACKGROUND_PREDEFINED_FILL_ACRYLIC: Record<
  BackgroundPredefinedFill,
  { appearance: Appearance; level: Level }
> = {
  transparent: { appearance: A.Transparent, level: L.Default },
  decorTransparent: { appearance: A.DecorTransparent, level: L.Default },
  primaryBackground: { appearance: A.Primary, level: L.Default },
  neutralBackground1Level: { appearance: A.Neutral, level: L.FirstLevel },
  redBackground: { appearance: A.Red, level: L.Default },
  orangeBackground: { appearance: A.Orange, level: L.Default },
  yellowBackground: { appearance: A.Yellow, level: L.Default },
  greenBackground: { appearance: A.Green, level: L.Default },
  blueBackground: { appearance: A.Blue, level: L.Default },
  violetBackground: { appearance: A.Violet, level: L.Default },
  pinkBackground: { appearance: A.Pink, level: L.Default },
};

export function backgroundPredefinedFillToAcrylic(fill: BackgroundPredefinedFill) {
  return BACKGROUND_PREDEFINED_FILL_ACRYLIC[fill];
}
