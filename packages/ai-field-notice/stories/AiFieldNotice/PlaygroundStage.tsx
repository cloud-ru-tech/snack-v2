import { ReactElement, ReactNode } from 'react';

import styles from './stories.module.scss';

export function BackgroundSilhouettes(): ReactElement {
  return (
    <div className={styles.silhouettes} aria-hidden>
      <div className={styles.silhouetteRow}>
        <span className={styles.silhouetteAvatar} />
        <div className={styles.silhouetteBubbleWide}>
          <span className={styles.silhouetteLine} data-width='full' />
          <span className={styles.silhouetteLine} data-width='medium' />
          <span className={styles.silhouetteLine} data-width='short' />
        </div>
      </div>

      <div className={styles.silhouetteRowReverse}>
        <div className={styles.silhouetteBubble}>
          <span className={styles.silhouetteLine} data-width='full' />
          <span className={styles.silhouetteLine} data-width='short' />
        </div>
      </div>

      <div className={styles.silhouetteCodeBlock}>
        <span className={styles.silhouetteLine} data-width='full' />
        <span className={styles.silhouetteLine} data-width='medium' />
        <span className={styles.silhouetteLine} data-width='full' />
        <span className={styles.silhouetteLine} data-width='short' />
      </div>

      <div className={styles.silhouetteRow}>
        <span className={styles.silhouetteAvatar} />
        <div className={styles.silhouetteBubble}>
          <span className={styles.silhouetteLine} data-width='medium' />
          <span className={styles.silhouetteLine} data-width='full' />
        </div>
      </div>
    </div>
  );
}

type PlaygroundStageProps = {
  background?: ReactNode;
  children: ReactNode;
};

export function PlaygroundStage({ background, children }: PlaygroundStageProps): ReactElement {
  return (
    <div className={styles.playgroundStage} data-show-silhouettes='true'>
      {background ?? <BackgroundSilhouettes />}
      <div className={styles.noticeAnchor}>{children}</div>
    </div>
  );
}
