import type { SliderProps } from '../../src';

export const LINEAR_MARKS: NonNullable<SliderProps['marks']> = {
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
};

export const MARK_PRESETS = {
  binaryLike: {
    1: '1',
    2: '2',
    4: '4',
    8: '8',
    16: '16',
    24: '24',
    32: '32',
  },
  tens: {
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
  },
  hours24: {
    0: '0',
    4: '4',
    8: '8',
    12: '12',
    16: '16',
    20: '20',
    24: '24',
  },
  storage: {
    100: '100',
    500: '500',
    1000: '1K',
    5000: '5K',
    10000: '10K',
  },
  wide: {
    1: '1',
    10: '10',
    100: '100',
    1000: '1K',
  },
} satisfies Record<string, NonNullable<SliderProps['marks']>>;

export const VISUAL_MATRIX_COMMON: Pick<SliderProps, 'min' | 'max' | 'step' | 'marks'> = {
  min: 10,
  max: 50,
  step: 10,
  marks: LINEAR_MARKS,
};
