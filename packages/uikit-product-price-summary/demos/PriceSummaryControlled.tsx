import { PortalContextProvider } from '@ds/portal-context';
import { PriceSummary, type PriceSummaryProps } from '@ds/uikit-product-price-summary';
import { useEffect, useRef, useState } from 'react';

export function PriceSummaryControlled({ period: periodProp, onPeriodChanged, ...rest }: PriceSummaryProps) {
  const [period, setPeriod] = useState(periodProp);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPeriod(periodProp);
  }, [periodProp]);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <PriceSummary
          {...rest}
          period={period}
          onPeriodChanged={next => {
            setPeriod(next);
            onPeriodChanged?.(next);
          }}
        />
      </div>
    </PortalContextProvider>
  );
}
