import { QuotaItem, QuotaWidgetProps } from '../src';

export const MOCK_QUOTAS: QuotaItem[] = [
  { name: 'SSD', limit: 1000, usage: 1000, remains: 0, unitDisplayName: 'GB' },
  { name: 'Public IP', limit: 10, usage: 9, remains: 1, unitDisplayName: 'pcs' },
  { name: 'RAM', limit: 256, usage: 230, remains: 26, unitDisplayName: 'GB' },
  { name: 'GPU A100', limit: 8, usage: 5, remains: 3, unitDisplayName: 'pcs' },
  { name: 'S3 Storage', limit: 5000, usage: 2500, remains: 2500, unitDisplayName: 'GB' },
  { name: 'vCPU', limit: 100, usage: 42, remains: 58, unitDisplayName: 'cores' },
];

export const MOCK_QUOTA_GREEN: QuotaItem = {
  name: 'Network',
  limit: 100,
  usage: 30,
  remains: 70,
  unitDisplayName: 'GB',
};

export const MOCK_QUOTA_ORANGE: QuotaItem = {
  name: 'Network',
  limit: 100,
  usage: 75,
  remains: 25,
  unitDisplayName: 'GB',
};

export const MOCK_QUOTA_RED: QuotaItem = {
  name: 'Network',
  limit: 100,
  usage: 95,
  remains: 5,
  unitDisplayName: 'GB',
};

export const MOCK_QUOTA_EXHAUSTED: QuotaItem = {
  name: 'Network',
  limit: 100,
  usage: 100,
  remains: 0,
  unitDisplayName: 'GB',
};

export const MOCK_QUOTA_OVERUSE: QuotaItem = {
  name: 'Network',
  limit: 100,
  usage: 105,
  remains: -5,
  unitDisplayName: 'GB',
};

export const BASE_QUOTA_WIDGET_PROPS: Omit<QuotaWidgetProps, 'buttonProps'> = {
  quotas: MOCK_QUOTAS,
  isLoading: false,
  isError: false,
  onRefresh: () => undefined,
  projectName: 'Демо-проект',
  canEditQuota: true,
  quotasUrl: 'https://example.com/quotas',
};

export const BASE_QUOTA_WIDGET_MINI_PROPS = {
  ...BASE_QUOTA_WIDGET_PROPS,
};
