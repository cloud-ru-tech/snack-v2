import { APPEARANCE, Appearance } from '@ds/progress-bar';

import { PROGRESS_LIMIT_CONDITION } from '../../constants';
import { ProgressLimitCondition, ProgressLimitList } from '../types';

type ProgressLimitMatcher = (progress: number, limit: number) => boolean;

const PROGRESS_LIMIT_MATCHERS = {
  [PROGRESS_LIMIT_CONDITION.Eq]: (progress, limit) => progress === limit,
  [PROGRESS_LIMIT_CONDITION.Gt]: (progress, limit) => progress > limit,
  [PROGRESS_LIMIT_CONDITION.Gte]: (progress, limit) => progress >= limit,
  [PROGRESS_LIMIT_CONDITION.Lt]: (progress, limit) => progress < limit,
  [PROGRESS_LIMIT_CONDITION.Lte]: (progress, limit) => progress <= limit,
} satisfies Record<ProgressLimitCondition, ProgressLimitMatcher>;

export const getProgressBarColor = (progress: number, limits: ProgressLimitList): Appearance => {
  for (const limit of limits) {
    if (!(limit.condition in PROGRESS_LIMIT_MATCHERS)) {
      return APPEARANCE.Neutral;
    }

    if (PROGRESS_LIMIT_MATCHERS[limit.condition](progress, limit.limit)) {
      return limit.appearance;
    }
  }

  return APPEARANCE.Neutral;
};
