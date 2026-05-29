import { formatNumber } from '@cloud-ru/ft-formatters';

export function formatCurrency(value: number) {
  return formatNumber(value.toFixed(2), {
    precision: 2,
    type: formatNumber.types.Currency,
  });
}

export function formatQuantity(value: string | number) {
  return typeof value === 'string' ? value : `×${value}`;
}
