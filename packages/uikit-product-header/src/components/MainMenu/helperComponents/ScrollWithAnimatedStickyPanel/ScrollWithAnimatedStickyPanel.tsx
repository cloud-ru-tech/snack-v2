import { Scroll } from '@ds/scroll';
import { PropsWithChildren, ReactNode, useCallback, useRef, useState } from 'react';

import styles from './styles.module.scss';

type ScrollWithAnimatedStickyPanelProps = PropsWithChildren<{
  panel: ReactNode;
}>;

export function ScrollWithAnimatedStickyPanel({ panel, children }: ScrollWithAnimatedStickyPanelProps) {
  const [positions, setPositions] = useState({ panelTopShift: 0, containerScroll: 0 });
  const [panelHeight, setPanelHeight] = useState(0);
  const panelRef = useRef<HTMLDivElement>(undefined);

  const handleScroll = useCallback((event?: Event) => {
    if (!event || !event.target) return;

    const target = event.target as HTMLDivElement;

    if (!panelRef.current) return;

    const panelHeight = panelRef.current.offsetHeight;

    setPanelHeight(panelHeight);

    setPositions(prev => {
      const diff = prev.containerScroll - target.scrollTop;

      return {
        panelTopShift: Math.max(-panelHeight, Math.min(0, prev.panelTopShift + diff)),
        containerScroll: target.scrollTop,
      };
    });
  }, []);

  return (
    <div className={styles.container} style={{ '--snack-autohide-panel-height': `${panelHeight}px` }}>
      <Scroll barHideStrategy='never' overflow={{ x: 'hidden' }} onScroll={handleScroll}>
        {children}
      </Scroll>
      <div
        className={styles.panel}
        ref={element => {
          if (element) {
            setPanelHeight(element.offsetHeight);
            panelRef.current = element;
          }
        }}
        style={{ top: positions.panelTopShift }}
      >
        {panel}
      </div>
    </div>
  );
}
