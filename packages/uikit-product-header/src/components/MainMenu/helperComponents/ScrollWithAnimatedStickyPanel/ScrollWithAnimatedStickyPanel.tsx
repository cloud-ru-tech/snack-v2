import { Scroll } from '@ds/scroll';
import { PropsWithChildren, ReactNode, useCallback, useRef, useState } from 'react';

import styles from './styles.module.scss';

type ScrollWithAnimatedStickyPanelProps = PropsWithChildren<{
  panel: ReactNode;
}>;

// Упругая прокрутка у верхней границы (touch-скролл на мобильных не "упирается" жёстко в 0 —
// контент можно немного "оттянуть" дальше) даёт scrollTop, не совпадающий с реальным положением
// контента в этот момент. Диапазон запаса — единицы пикселей; двух хватает с большим запасом.
const TOP_OVERSCROLL_EPSILON_PX = 2;

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

    // У верхней границы панель всегда полностью видна — не доверяем накопленному diff. Иначе
    // "лишний" ход упругой прокрутки у самого верха читается как скролл вниз и на возврате к
    // началу списка панель может остаться скрытой, хотя пользователь как раз скроллит наверх.
    if (target.scrollTop <= TOP_OVERSCROLL_EPSILON_PX) {
      setPositions({ panelTopShift: 0, containerScroll: target.scrollTop });
      return;
    }

    setPositions(prev => {
      const diff = prev.containerScroll - target.scrollTop;

      return {
        panelTopShift: Math.max(-panelHeight, Math.min(0, prev.panelTopShift + diff)),
        containerScroll: target.scrollTop,
      };
    });
  }, []);

  const setPanelRef = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      setPanelHeight(element.offsetHeight);
      panelRef.current = element;
    }
  }, []);

  return (
    <div className={styles.container} style={{ '--snack-autohide-panel-height': `${panelHeight}px` }}>
      <Scroll barHideStrategy='never' overflow={{ x: 'hidden' }} onScroll={handleScroll}>
        {children}
      </Scroll>
      <div className={styles.panel} ref={setPanelRef} style={{ top: positions.panelTopShift }}>
        {panel}
      </div>
    </div>
  );
}
