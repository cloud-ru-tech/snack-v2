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

export const FOCUS_APPEARANCE = {
  Regular: 'regular',
  Primary: 'primary',
  Destructive: 'destructive',
  Warning: 'warning',
  Success: 'success',
  RegularInversion: 'regularInversion',
} as const;

export const FOCUS_POSITION = {
  Inside: 'inside',
  Outside: 'outside',
  OutsideOffset: 'outsideOffset',
} as const;

export const STATE = {
  EmptyNeutralOnBackground: 'emptyNeutralOnBackground',
  BorderOnBackground: 'borderOnBackground',
  ActivatedOnBackground: 'activatedOnBackground',
  VersionOnColor: 'versionOnColor',
  EmptyVersionOnColor: 'emptyVersionOnColor',
  InversionOnColor: 'inversionOnColor',
  EmptyInversionOnColor: 'emptyInversionOnColor',
  EmptyDarkOnAccent: 'emptyDarkOnAccent',
  TextOpacity: 'textOpacity',
} as const;
