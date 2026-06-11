import { SkeletonText } from '@ds/skeleton';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type NotificationCardSkeletonProps = WithSupportProps<{
  /** CSS-класс */
  className?: string;
}>;

/** Скелетон карточки уведомления для состояния загрузки */
export function NotificationCardSkeleton({ className, ...rest }: NotificationCardSkeletonProps = {}) {
  return (
    <div
      className={cn(styles.notificationCard, className)}
      data-test-id={TEST_IDS.card.skeleton}
      {...extractSupportProps(rest)}
    >
      <SkeletonText width={140} variant='label' size='s' lines={1} />

      <div className={styles.notificationCardTitle}>
        <div className={styles.notificationCardTitleIcon}>
          <SkeletonText width={16} variant='title' size='s' lines={1} />
        </div>
        <SkeletonText width={140} variant='title' size='s' lines={1} />
      </div>

      <div className={styles.notificationCardContent}>
        <SkeletonText lines={3} variant='body' size='s' />
      </div>

      <div className={styles.notificationCardFooter}>
        <SkeletonText width={140} variant='body' size='s' lines={1} />
        <SkeletonText width={140} variant='label' size='s' lines={1} />
      </div>
    </div>
  );
}
