import { PortalContextProvider } from '@ds/portal-context';
import { useRef } from 'react';

import { FIGMA_SHOWCASE_ARGS } from '../stories/PriceSummary/constants';
import styles from './demoSurface.module.scss';
import { PriceSummaryControlled } from './PriceSummaryControlled';

export function PriceSummaryDemo() {
  const hostRef = useRef<HTMLDivElement>(null);

  return (
    <PortalContextProvider root={hostRef}>
      <div ref={hostRef} style={{ position: 'relative' }}>
        <div className={styles.surface}>
          <PriceSummaryControlled {...FIGMA_SHOWCASE_ARGS} periodOptions={[...FIGMA_SHOWCASE_ARGS.periodOptions]} />
        </div>
      </div>
    </PortalContextProvider>
  );
}
