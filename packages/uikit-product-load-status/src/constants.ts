import type { ProgressLimitList } from './components/types';

export const PROGRESS_LIMIT_CONDITION = {
  Eq: 'eq',
  Gt: 'gt',
  Gte: 'gte',
  Lt: 'lt',
  Lte: 'lte',
} as const;

export const DEFAULT_APPEARANCE_BY_PROGRESS = [
  { appearance: 'green', condition: PROGRESS_LIMIT_CONDITION.Lte, limit: 70 },
  { appearance: 'yellow', condition: PROGRESS_LIMIT_CONDITION.Lte, limit: 90 },
  { appearance: 'red', condition: PROGRESS_LIMIT_CONDITION.Lte, limit: 100 },
] satisfies ProgressLimitList;

export const SYMBOL_BY_TYPE = {
  none: '',
  percent: '%',
} as const;

export const TEST_IDS = {
  root: 'load-status',
  header: 'load-status__header',
  hint: 'load-status__hint',
  errorIcon: 'load-status__error-icon',
} as const;
