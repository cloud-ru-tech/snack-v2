export const STATUS_SIZE = {
  XS: 'xs',
  S: 's',
} as const;

export const STATUS_INDICATOR_SIZE = {
  XXXXS: '4xs',
  XXXS: '3xs',
  XXS: '2xs',
  XS: 'xs',
  S: 's',
} as const;

export const TEST_IDS = {
  status: {
    root: 'status',
    label: 'status__label',
  },
  statusIndicator: {
    root: 'status-indicator',
  },
} as const;

export const APPEARANCE = {
  Neutral: 'neutral',
  Red: 'red',
  Orange: 'orange',
  Yellow: 'yellow',
  Green: 'green',
  Blue: 'blue',
  Violet: 'violet',
  Pink: 'pink',
} as const;
