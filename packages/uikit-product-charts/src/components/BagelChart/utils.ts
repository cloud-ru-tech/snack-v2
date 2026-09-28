import { ValueOf } from '@ds/utils';

import { BAGEL_LEVEL, BAGEL_LEVEL_THRESHOLDS } from './constants';

export function getBagelLevel({ value, total }: { value: number; total: number }): ValueOf<typeof BAGEL_LEVEL> {
  const occupancyPercent = (value / total) * 100;

  if (occupancyPercent > BAGEL_LEVEL_THRESHOLDS.High) {
    return BAGEL_LEVEL.High;
  }

  if (occupancyPercent > BAGEL_LEVEL_THRESHOLDS.Medium) {
    return BAGEL_LEVEL.Medium;
  }

  return BAGEL_LEVEL.Low;
}

export function devWarning(message: string, condition: boolean) {
  if (condition && process.env.NODE_ENV !== 'production') {
    console.error(message);
  }
}
