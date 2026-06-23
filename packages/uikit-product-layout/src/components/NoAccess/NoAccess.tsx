import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Block, SIZE as BLOCK_SIZE } from '@ds/block';
import { ProductIcons } from '@ds/icons';
import { InfoBlock, SIZE as INFO_SIZE } from '@ds/info-block';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import { layoutLocale } from '../../locale';
import styles from './styles.module.scss';

export type NoAccessProps = WithSupportProps<{
  /** Заголовок над блоком (например, название сервиса) */
  serviceName?: string;
  /** Дополнительный класс */
  className?: string;
}>;

/**
 * Экран ограниченного доступа: lock-иконка и локализованное сообщение
 * на нейтральной подложке, с опциональным заголовком сервиса сверху.
 */
export function NoAccess({ serviceName, className, ...rest }: NoAccessProps) {
  const { layoutType } = useAdaptiveLayout();
  const { t } = layoutLocale.useTranslations();

  return (
    <div
      className={cn(styles.wrapper, className)}
      data-mobile={isMobileLayout(layoutType) || undefined}
      {...extractSupportProps(rest)}
    >
      {serviceName && (
        <div className={styles.serviceName} data-test-id={TEST_IDS.noAccess.serviceName}>
          {serviceName}
        </div>
      )}

      <Block size={BLOCK_SIZE.L} className={styles.block}>
        <InfoBlock
          size={INFO_SIZE.M}
          icon={{ icon: ProductIcons.LockSVG }}
          title={t('noAccessTitle')}
          description={
            <div className={styles.description}>
              <div className={styles.text}>{t('noAccessSubtitle')}</div>
              <div className={styles.text}>{t('noAccessText')}</div>
            </div>
          }
        />
      </Block>
    </div>
  );
}
