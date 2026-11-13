import { Skeleton } from '@ds/skeleton';

import { TEST_IDS } from '../../constants';
import { siteMediaLocale } from '../../locale';
import { findSpriteFrame, formatTime } from '../../utils';
import { useTimeline } from './hooks';
import styles from './styles.module.scss';
import { TimelinePreview } from './TimelinePreview';
import type { ToolbarProps } from './Toolbar';

export function Timeline({ player, state, frames }: Pick<ToolbarProps, 'player' | 'state' | 'frames'>) {
  const { t } = siteMediaLocale.useTranslations();
  const { currentTime, duration, buffered } = state;
  const { hover, handlePointerDown, handlePointerMove, handlePointerLeave, handleKeyDown } = useTimeline(
    player,
    currentTime,
    duration,
  );

  if (duration <= 0) {
    return <Skeleton loading width='100%' height={8} />;
  }

  return (
    <>
      {hover && <TimelinePreview position={hover} frame={findSpriteFrame(frames, hover.time)} />}
      <div
        className={styles.timeline}
        role='slider'
        tabIndex={0}
        aria-label={t('seek')}
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(currentTime)}
        aria-valuetext={formatTime(currentTime)}
        data-test-id={TEST_IDS.timeline}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.track}>
          {buffered.map(([start, end]) => (
            <span
              key={start}
              className={styles.buffered}
              style={{ left: (start / duration) * 100 + '%', width: ((end - start) / duration) * 100 + '%' }}
            />
          ))}
          <span className={styles.viewed} style={{ width: (currentTime / duration) * 100 + '%' }} />
        </div>
      </div>
    </>
  );
}
