import { SIZE, Typography, VARIANT } from '@ds/typography';
import { Fragment } from 'react';

import { formatCurrency } from '../../../../helpers';
import { priceSummaryLocale } from '../../../../locale';
import { DiscountDetails } from '../../../../types';
import { DiscountPercentCell } from '../DiscountPercentCell';
import styles from './styles.module.scss';

export type DiscountBlockProps = {
  value: DiscountDetails;
};

export function DiscountBlock({ value }: DiscountBlockProps) {
  const { t } = priceSummaryLocale.useTranslations();

  return (
    <>
      <div className={styles.discountGrid}>
        <Typography variant={VARIANT.body} size={SIZE.s} as='div'>
          {t('basePrice')}
        </Typography>

        <Typography variant={VARIANT.label} size={SIZE.m} as='div' className={styles.priceCell}>
          {formatCurrency(value.price)}
        </Typography>
      </div>

      <div className={styles.discountGrid}>
        {value.discounts.map((discount, index) => (
          <Fragment key={index}>
            <DiscountPercentCell discount={discount} />

            <Typography variant={VARIANT.label} size={SIZE.m} as='div' className={styles.discountCell}>
              {formatCurrency(-Math.abs(discount.value))}
            </Typography>
          </Fragment>
        ))}
      </div>
    </>
  );
}
