import { PortalContextProvider } from '@ds/portal-context';
import { QuotaItem, QuotaWidget } from '@ds/uikit-product-quota';
import { useRef, useState } from 'react';

const QUOTAS: QuotaItem[] = [
  { name: 'vCPU', limit: 100, usage: 42, remains: 58, unitDisplayName: 'cores' },
  { name: 'RAM', limit: 256, usage: 230, remains: 26, unitDisplayName: 'GB' },
];

export function QuotaWidgetError() {
  const hostRef = useRef<HTMLDivElement>(null);
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
    <PortalContextProvider root={hostRef}>
      {/* В продукте виджет живёт у правого края страницы — dropdown прижат к правому краю триггера */}
      <div ref={hostRef} style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', position: 'relative' }}>
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
    </PortalContextProvider>
  );
}
