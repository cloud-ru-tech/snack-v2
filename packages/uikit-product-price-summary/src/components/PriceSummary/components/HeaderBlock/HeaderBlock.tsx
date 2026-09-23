import { APPEARANCE, PromoTag, PromoTagProps, SIZE as SIZE_PROMO_TAG } from '@ds/promo-tag';
import { SIZE, Typography, VARIANT } from '@ds/typography';

import { priceSummaryLocale } from '../../../../locale';
import { PeriodDropdown, PeriodDropdownProps } from '../PeriodDropdown';
import { VAT_TYPE } from './constants';
import styles from './styles.module.scss';
import { VatType } from './types';

export type HeaderBlockProps = PeriodDropdownProps & {
  vatType?: VatType;
  promoBadge?: Pick<PromoTagProps, 'label' | 'appearance'> | string;
};

export function HeaderBlock({
  period,
  onPeriodChanged,
  periodOptions,
  promoBadge,
  vatType = VAT_TYPE.Including,
}: HeaderBlockProps) {
  const { t } = priceSummaryLocale.useTranslations();

  return (
    <>
      {promoBadge && (
        <div className={styles.promoBadge}>
          <PromoTag
            appearance={APPEARANCE.Green}
            {...(typeof promoBadge === 'string' ? { label: promoBadge } : promoBadge)}
            size={SIZE_PROMO_TAG.Xs}
          />
        </div>
      )}

      <div className={styles.headline}>
        <PeriodDropdown period={period} onPeriodChanged={onPeriodChanged} periodOptions={periodOptions} />

        <Typography variant={VARIANT.body} size={SIZE.m} className={styles.vat}>
          {t(vatType === VAT_TYPE.Including ? 'vat' : 'vatExcluded')}
        </Typography>
      </div>
    </>
  );
}
