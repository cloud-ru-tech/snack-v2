import { QuotaItem } from '../types';

export const checkIsExceeded = (quota: QuotaItem) => quota.remains <= 0;
