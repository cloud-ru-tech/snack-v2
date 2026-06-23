import { PromoTag, PromoTagProps } from '@ds/promo-tag';
import { SIZE, Typography, VARIANT } from '@ds/typography';

import { priceSummaryLocale } from '../../../../locale';
import { PeriodDropdown, PeriodDropdownProps } from '../PeriodDropdown';
import styles from './styles.module.scss';

export type HeaderBlockProps = PeriodDropdownProps & {
  promoBadge?: Pick<PromoTagProps, 'text' | 'appearance'> | string;
};

export function HeaderBlock({ period, onPeriodChanged, periodOptions, promoBadge, layoutType }: HeaderBlockProps) {
  const { t } = priceSummaryLocale.useTranslations();

  return (
    <>
      {promoBadge && (
        <div className={styles.promoBadge}>
          <PromoTag {...(typeof promoBadge === 'string' ? { text: promoBadge } : promoBadge)} />
        </div>
      )}

      <div className={styles.headline}>
        <PeriodDropdown
          period={period}
          onPeriodChanged={onPeriodChanged}
          periodOptions={periodOptions}
          layoutType={layoutType}
        />

        <Typography variant={VARIANT.body} size={SIZE.m} className={styles.vat}>
          {t('vat')}
        </Typography>
      </div>
    </>
  );
}
