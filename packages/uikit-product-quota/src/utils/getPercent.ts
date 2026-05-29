import { QuotaItem } from '../types';

export function getPercent(quota: QuotaItem): number {
  if (quota.limit === 0) {
    return 100;
  }

  return (quota.usage / quota.limit) * 100;
}
