import { QuotaItem, QuotaWidget } from '@ds/uikit-product-quota';
import { useState } from 'react';

const QUOTAS: QuotaItem[] = [
  { name: 'vCPU', limit: 100, usage: 42, remains: 58, unitDisplayName: 'cores' },
  { name: 'RAM', limit: 256, usage: 230, remains: 26, unitDisplayName: 'GB' },
];

export function QuotaWidgetError() {
  const [isError, setIsError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsError(false);
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
        isLoading={isLoading}
        isError={isError}
        onRefresh={handleRefresh}
      />
    </div>
  );
}
