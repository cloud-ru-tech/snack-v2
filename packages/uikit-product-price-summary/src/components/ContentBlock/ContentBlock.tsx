import { Button } from '@ds/button';
import { UpdateSVG } from '@ds/icons';
import { Sun } from '@ds/loader';
import { useLocale } from '@ds/locale';
import { SIZE, Typography, VARIANT } from '@ds/typography';
import { PropsWithChildren } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type ContentBlockProps = {
  loading?: boolean;
  dataError?: boolean;
  onRetry?(): void;
};

export function ContentBlock({ loading, dataError, onRetry, children }: PropsWithChildren<ContentBlockProps>) {
  const { t } = useLocale('PriceSummary');

  if (loading) {
    return (
      <div className={styles.loadingBlock} data-test-id={TEST_IDS.loadingBlock}>
        <Sun size='m' />
      </div>
    );
  }

  if (dataError) {
    return (
      <div className={styles.dataErrorBlock}>
        <Button view='function' icon={<UpdateSVG />} onClick={onRetry} data-test-id={TEST_IDS.contentBlockRetry} />

        <Typography variant={VARIANT.body} size={SIZE.s}>
          {t('dataError')}
        </Typography>
      </div>
    );
  }

  return children;
}
