import { QuotaItem, QuotaWidget } from '@ds/uikit-product-quota';
import { useState } from 'react';

const QUOTAS: QuotaItem[] = [
  { name: 'vCPU', limit: 100, usage: 42, remains: 58, unitDisplayName: 'cores' },
  { name: 'RAM', limit: 256, usage: 230, remains: 26, unitDisplayName: 'GB' },
  { name: 'SSD', limit: 1000, usage: 1000, remains: 0, unitDisplayName: 'GB' },
  { name: 'Public IP', limit: 10, usage: 9, remains: 1, unitDisplayName: 'pcs' },
];

export function QuotaWidgetBasic() {
  const [loading, setLoading] = useState(false);

  const reload = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    // В продукте виджет живёт у правого края страницы — dropdown прижат к правому краю триггера
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      <QuotaWidget
        quotas={QUOTAS}
        projectName='ml-platform-production'
        quotasUrl='#'
        canEditQuota={false}
        loading={loading}
        isError={false}
        onRefresh={reload}
      />
    </div>
  );
}
