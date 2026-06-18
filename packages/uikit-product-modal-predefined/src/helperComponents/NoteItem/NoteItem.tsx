import { Markdown } from '@ds/markdown';
import { BAR_HIDE_STRATEGY, Scroll } from '@ds/scroll';
import { Typography } from '@ds/typography';
import { useState } from 'react';

import { TEST_IDS } from '../../constants';
import { NoteItemProps } from '../../types';
import styles from './styles.module.scss';

type NoteItemComponentProps = NoteItemProps & {
  surface?: 'modal' | 'bottomSheet';
};

export function NoteItem({ title, description, image, video, surface = 'modal' }: NoteItemComponentProps) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const shouldShowVideo = Boolean(video && !hasVideoError);

  return (
    <article className={styles.root} data-surface={surface} data-test-id={TEST_IDS.releaseNotesItem}>
      <div className={styles.media} data-test-id={TEST_IDS.releaseNotesMedia}>
        {shouldShowVideo && (
          <>
            <video
              className={styles.video}
              src={video}
              muted
              loop
              playsInline
              autoPlay
              onLoadedData={() => setIsVideoReady(true)}
              onError={() => setHasVideoError(true)}
              data-test-id={TEST_IDS.releaseNotesVideo}
            />
            {!isVideoReady && <div className={styles.videoSkeleton} aria-hidden />}
          </>
        )}

        {!shouldShowVideo && <img className={styles.image} src={image.src} alt={image.alt} />}
      </div>

      <div className={styles.content}>
        <Typography variant='headline' size='s'>
          {title}
        </Typography>

        <Scroll className={styles.description} barHideStrategy={BAR_HIDE_STRATEGY.Leave}>
          <Markdown value={description} />
        </Scroll>
      </div>
    </article>
  );
}
