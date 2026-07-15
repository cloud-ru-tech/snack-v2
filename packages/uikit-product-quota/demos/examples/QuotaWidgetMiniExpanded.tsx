import { QuotaItem, QuotaWidgetMini } from '@ds/uikit-product-quota';
import { useState } from 'react';

const QUOTAS: QuotaItem[] = [
  { name: 'SSD', limit: 1000, usage: 1000, remains: 0, unitDisplayName: 'GB' },
  { name: 'RAM', limit: 256, usage: 230, remains: 26, unitDisplayName: 'GB' },
  { name: 'vCPU', limit: 100, usage: 42, remains: 58, unitDisplayName: 'cores' },
];

export function QuotaWidgetMiniExpanded() {
  const [loading, setLoading] = useState(false);

  const reload = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <QuotaWidgetMini
      quotas={QUOTAS}
      projectName='ml-platform-production'
      canEditQuota={false}
      isExpandedDefault
      loading={loading}
      isError={false}
      onRefresh={reload}
    />
  );
}
