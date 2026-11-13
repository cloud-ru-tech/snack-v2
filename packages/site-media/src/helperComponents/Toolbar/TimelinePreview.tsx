import { Typography } from '@ds/typography';

import { TEST_IDS } from '../../constants';
import { SpriteFrame } from '../../shared/types';
import { formatTime } from '../../utils';
import styles from './styles.module.scss';
import { TimelinePosition } from './types';

type TimelinePreviewProps = { position: TimelinePosition; frame?: SpriteFrame };

export function TimelinePreview({ position, frame }: TimelinePreviewProps) {
  const width = frame?.width ?? 64;
  const left = Math.max(0, Math.min(position.offset - width / 2, position.width - width));

  return (
    <div className={styles.tip} style={{ left, width: frame?.width }} data-test-id={TEST_IDS.preview}>
      {frame && (
        <div
          className={styles.tipImage}
          style={{
            width: frame.width,
            height: frame.height,
            backgroundImage: 'url(' + JSON.stringify(frame.imageUrl) + ')',
            backgroundPosition: '-' + frame.x + 'px -' + frame.y + 'px',
          }}
        />
      )}
      <Typography as='span' variant='label' size='s' className={styles.tipTime}>
        {formatTime(position.time)}
      </Typography>
    </div>
  );
}
