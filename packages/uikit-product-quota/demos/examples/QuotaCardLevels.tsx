import { PortalContextProvider } from '@ds/portal-context';
import { QuotaWidgetCard } from '@ds/uikit-product-quota';
import { useRef } from 'react';

export function QuotaCardLevels() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div
        ref={hostRef}
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', position: 'relative' }}
      >
        <QuotaWidgetCard quota={{ name: 'Network', limit: 100, usage: 30, remains: 70, unitDisplayName: 'GB' }} />
        <QuotaWidgetCard quota={{ name: 'RAM', limit: 100, usage: 75, remains: 25, unitDisplayName: 'GB' }} />
        <QuotaWidgetCard quota={{ name: 'vCPU', limit: 100, usage: 95, remains: 5, unitDisplayName: 'cores' }} />
        <QuotaWidgetCard quota={{ name: 'SSD', limit: 100, usage: 100, remains: 0, unitDisplayName: 'GB' }} />
      </div>
    </PortalContextProvider>
  );
}
