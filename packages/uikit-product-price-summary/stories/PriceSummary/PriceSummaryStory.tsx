import { PriceSummary, type PriceSummaryProps } from '@ds/uikit-product-price-summary';
import { type ReactNode, useEffect, useState } from 'react';

import styles from './styles.module.scss';

export function PriceSummaryStory(props: PriceSummaryProps) {
  const [period, setPeriod] = useState(props.period);

  useEffect(() => {
    setPeriod(props.period);
  }, [props.period]);

  return (
    <PriceSummary
      {...props}
      period={period}
      onPeriodChanged={next => {
        setPeriod(next);
        props.onPeriodChanged?.(next);
      }}
    />
  );
}

type FigmaSurfaceProps = {
  children: ReactNode;
  className?: string;
};

export function PriceSummaryFigmaSurface({ children, className }: FigmaSurfaceProps) {
  return <div className={className ?? styles.figmaSurface}>{children}</div>;
}
