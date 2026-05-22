export const APPEARANCE = {
  Neutral: 'neutral',
  Primary: 'primary',
  Red: 'red',
  Orange: 'orange',
  Yellow: 'yellow',
  Green: 'green',
  Blue: 'blue',
  Violet: 'violet',
  Pink: 'pink',
} as const;

export const PROGRESS_BAR_SIZE = {
  S: 's',
  XS: 'xs',
} as const;

export const PROGRESS_BAR_CIRCLE_SIZE = {
  S: 's',
  XS: 'xs',
} as const;

export const TEST_IDS = {
  progressBar: {
    root: 'progress-bar',
    filler: 'progress-bar__filler',
  },
  progressBarCircle: {
    root: 'progress-bar-circle',
  },
  progressBarPage: {
    root: 'progress-bar-page',
  },
} as const;
