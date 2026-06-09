import { PortalContextProvider } from '@ds/portal-context';
import { QuotaWidgetCard } from '@ds/uikit-product-quota';
import { useRef, useState } from 'react';

const QUOTA = { name: 'Network', limit: 100, usage: 30, remains: 70, unitDisplayName: 'GB' };

export function QuotaCardNoData() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [noData, setNoData] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setNoData(false);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <QuotaWidgetCard quota={QUOTA} noData={noData} loading={loading} onRefresh={handleRefresh} />
      </div>
    </PortalContextProvider>
  );
}
