import { useLocale } from '@ds/locale';
import { useCallback } from 'react';

import { PRICE_PERIOD } from '../constants';
import { PricePeriod } from '../types';

type PeriodLabelKey =
  | 'pricePeriodYear'
  | 'pricePeriodMonth'
  | 'pricePeriodDay'
  | 'pricePeriodHour'
  | 'pricePeriodMinute';

const PERIOD_LABEL_KEYS: Record<PricePeriod, PeriodLabelKey> = {
  [PRICE_PERIOD.Year]: 'pricePeriodYear',
  [PRICE_PERIOD.Month]: 'pricePeriodMonth',
  [PRICE_PERIOD.Day]: 'pricePeriodDay',
  [PRICE_PERIOD.Hour]: 'pricePeriodHour',
  [PRICE_PERIOD.Minute]: 'pricePeriodMinute',
};

export function formatPeriodLabel(t: (key: PeriodLabelKey) => string, period: PricePeriod): string {
  return t(PERIOD_LABEL_KEYS[period]);
}

export function usePeriodFormat() {
  const { t } = useLocale('PriceSummary');

  return useCallback((period: PricePeriod) => formatPeriodLabel(t, period), [t]);
}
