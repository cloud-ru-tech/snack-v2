import { QuotaWidgetCard } from '@ds/uikit-product-quota';

export function QuotaCardLoading() {
  return (
    <QuotaWidgetCard loading quota={{ name: 'Network', limit: 100, usage: 30, remains: 70, unitDisplayName: 'GB' }} />
  );
}
