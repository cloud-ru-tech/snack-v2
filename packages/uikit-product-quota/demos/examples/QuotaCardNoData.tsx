import { QuotaWidgetCard } from '@ds/uikit-product-quota';
import { useState } from 'react';

const QUOTA = { name: 'Network', limit: 100, usage: 30, remains: 70, unitDisplayName: 'GB' };

export function QuotaCardNoData() {
  const [noData, setNoData] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setNoData(false);
    setTimeout(() => setLoading(false), 800);
  };

  return <QuotaWidgetCard quota={QUOTA} noData={noData} loading={loading} onRefresh={handleRefresh} />;
}
