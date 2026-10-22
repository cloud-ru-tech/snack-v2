import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { AiButtonControls, DIRECTION } from '@ds/ai-button-controls';
import { BAR_HIDE_STRATEGY, Scroll, SIZE as SCROLL_SIZE } from '@ds/scroll';
import { ReactNode, useCallback, useRef } from 'react';

import { TEST_IDS } from '../../constants';
import { useScrollEdges } from './hooks';
import styles from './styles.module.scss';

export type AttachmentsProps = {
  children: ReactNode;
  scrollStep: number;
};

export function Attachments({ children, scrollStep }: AttachmentsProps) {
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);
  const trackRef = useRef<HTMLDivElement>(null);
  const { canScrollLeft, canScrollRight } = useScrollEdges(trackRef, !isMobile);

  const handlePrev = useCallback(() => {
    trackRef.current?.scrollBy({ left: -scrollStep, behavior: 'smooth' });
  }, [scrollStep]);

  const handleNext = useCallback(() => {
    trackRef.current?.scrollBy({ left: scrollStep, behavior: 'smooth' });
  }, [scrollStep]);

  return (
    <div className={styles.root} data-mobile={isMobile || undefined} data-test-id={TEST_IDS.attachments}>
      {isMobile ? (
        <Scroll size={SCROLL_SIZE.S} barHideStrategy={BAR_HIDE_STRATEGY.Scroll} overflow={{ x: 'scroll', y: 'hidden' }}>
          <div className={styles.track}>{children}</div>
        </Scroll>
      ) : (
        <div ref={trackRef} className={styles.track}>
          {children}
        </div>
      )}

      {!isMobile && canScrollLeft && (
        <AiButtonControls
          className={styles.prev}
          direction={DIRECTION.Left}
          data-test-id={TEST_IDS.attachmentsPrev}
          onClick={handlePrev}
        />
      )}

      {!isMobile && canScrollRight && (
        <AiButtonControls
          className={styles.next}
          direction={DIRECTION.Right}
          data-test-id={TEST_IDS.attachmentsNext}
          onClick={handleNext}
        />
      )}
    </div>
  );
}
