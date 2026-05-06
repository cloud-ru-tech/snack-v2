export const APPEARANCE = {
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

export const LEVEL = {
  Default: 'default',
  FirstLevel: '1Level',
  SecondLevel: '2Level',
} as const;

export const STATE = {
  RegularFilled: 'regularFilled',
  RegularBorder: 'regularBorder',
  ActivatedBackground: 'activatedBackground',
  ActivatedBorder: 'activatedBorder',
  OnColorBackground: 'onColorBackground',
  OnAccentBackground: 'onAccentBackground',
  TextOpacity: 'textOpacity',
} as const;
