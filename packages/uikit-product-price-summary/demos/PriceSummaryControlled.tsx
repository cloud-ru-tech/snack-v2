import { PriceSummary, type PriceSummaryProps } from '@ds/uikit-product-price-summary';
import { useEffect, useState } from 'react';

export function PriceSummaryControlled({ period: periodProp, onPeriodChanged, ...rest }: PriceSummaryProps) {
  const [period, setPeriod] = useState(periodProp);

  useEffect(() => {
    setPeriod(periodProp);
  }, [periodProp]);

  return (
    <PriceSummary
      {...rest}
      period={period}
      onPeriodChanged={next => {
        setPeriod(next);
        onPeriodChanged?.(next);
      }}
    />
  );
}
