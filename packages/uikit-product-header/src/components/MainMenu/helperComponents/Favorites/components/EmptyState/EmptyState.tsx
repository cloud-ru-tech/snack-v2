import { Typography } from '@ds/typography';

import { headerLocale } from '../../../../../../locale';
import { FAVORITES_TEST_IDS } from '../../constants';
import { EmptyFavoriteSVG } from './EmptyFavoriteSVG';
import { EmptyRecentSVG } from './EmptyRecentSVG';
import styles from './styles.module.scss';

type EmptyStateProps = {
  isFavoritesSegment: boolean;
  isMobile?: boolean;
};

export function EmptyState({ isFavoritesSegment, isMobile }: EmptyStateProps) {
  const { t } = headerLocale.useTranslations();

  return (
    <div className={styles.emptyState} data-test-id={FAVORITES_TEST_IDS.emptyState}>
      {isFavoritesSegment ? (
        <>
          <EmptyFavoriteSVG className={styles.emptyIcon} />
          <Typography variant='body' size='s' className={styles.emptyText}>
            {isMobile ? t('favorite.emptyMobile') : t('favorite.emptyDesktop')}
          </Typography>
        </>
      ) : (
        <>
          <EmptyRecentSVG className={styles.emptyIcon} />
          <Typography variant='body' size='s' className={styles.emptyText}>
            {t('recent.empty')}
          </Typography>
        </>
      )}
    </div>
  );
}
