import { QuotaItem, QuotaWidget } from '@ds/uikit-product-quota';
import { useState } from 'react';

const QUOTAS: QuotaItem[] = [
  { name: 'vCPU', limit: 100, usage: 42, remains: 58, unitDisplayName: 'cores' },
  { name: 'RAM', limit: 256, usage: 230, remains: 26, unitDisplayName: 'GB' },
];

export function QuotaWidgetError() {
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError(false);
    }, 800);
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
        error={error}
        onRefresh={handleRefresh}
      />
    </div>
  );
}
