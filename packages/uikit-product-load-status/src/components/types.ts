import { Appearance } from '@ds/progress-bar';
import { ValueOf } from '@ds/utils';

import { PROGRESS_LIMIT_CONDITION } from '../constants';

export type LoadValueType = 'none' | 'percent';

export type ProgressLimitCondition = ValueOf<typeof PROGRESS_LIMIT_CONDITION>;

/** Порог смены цвета полосы прогресса */
type ProgressLimit = {
  /** Условие сравнения `progress` с `limit` */
  condition: ProgressLimitCondition;
  /** Пороговое значение progress (обычно 0–100) */
  limit: number;
  /** Цвет полосы при выполнении условия */
  appearance: Appearance;
};

export type ProgressLimitList = ProgressLimit[];
