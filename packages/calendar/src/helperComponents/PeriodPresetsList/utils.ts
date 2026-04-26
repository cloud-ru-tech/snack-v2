import { useLocale } from '@ds/locale';

import { PresetItem, Range } from '../../types';
type TFunction = ReturnType<typeof useLocale<'Calendar'>>['t'];

const dayInMs = 24 * 60 * 60 * 1000;

export function getDefaultPresets(t: TFunction, today?: Date): PresetItem[] {
  const now = today || new Date();
  const nowInMs = now.getTime();

  const monthsAgo = (n: number): Date => {
    const d = new Date(now);
    d.setMonth(d.getMonth() - n);
    return d;
  };

  const yearsAgo = (n: number): Date => {
    const d = new Date(now);
    d.setFullYear(d.getFullYear() - n);
    return d;
  };

  const calculatePeriodUpToNow = (limit: Date): Range => (nowInMs > limit.getTime() ? [limit, now] : [now, limit]);

  return [
    {
      label: t('defaultPresets.lastWeek'),
      id: 'week',
      range: calculatePeriodUpToNow(new Date(now.getTime() + dayInMs * -7)),
    },
    {
      label: t('defaultPresets.lastTwoWeeks'),
      id: 'twoWeeks',
      range: calculatePeriodUpToNow(new Date(now.getTime() + dayInMs * -14)),
    },
    {
      label: t('defaultPresets.lastMonth'),
      id: 'month',
      range: calculatePeriodUpToNow(monthsAgo(1)),
    },
    {
      label: t('defaultPresets.lastQuarter'),
      id: 'quarter',
      range: calculatePeriodUpToNow(monthsAgo(3)),
    },
    {
      label: t('defaultPresets.lastThird'),
      id: 'fourMonths',
      range: calculatePeriodUpToNow(monthsAgo(4)),
    },
    {
      label: t('defaultPresets.lastYear'),
      id: 'year',
      range: calculatePeriodUpToNow(yearsAgo(1)),
    },
    {
      label: t('defaultPresets.lastTwoYears'),
      id: 'twoYears',
      range: calculatePeriodUpToNow(yearsAgo(2)),
    },
  ];
}
