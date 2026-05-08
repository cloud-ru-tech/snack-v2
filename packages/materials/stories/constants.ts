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
  ActivatedFilled: 'activatedFilled',
  ActivatedBorder: 'activatedBorder',
  OnColorFilled: 'onColorFilled',
  OnAccentFilled: 'onAccentFilled',
  TextOpacity: 'textOpacity',
} as const;
