import { useLocale } from '@ds/locale';
import { SIZE, Typography, VARIANT } from '@ds/typography';
import { WithLayoutType } from '@ds/utils';
import { Fragment } from 'react';

import { formatCurrency } from '../../../../helpers';
import { DiscountDetails } from '../../../../types';
import { DiscountPercentCell } from '../DiscountPercentCell';
import styles from './styles.module.scss';

export type DiscountBlockProps = WithLayoutType<{
  value: DiscountDetails;
}>;

export function DiscountBlock({ value, layoutType }: DiscountBlockProps) {
  const { t } = useLocale('PriceSummary');

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
            <DiscountPercentCell discount={discount} layoutType={layoutType} />

            <Typography variant={VARIANT.label} size={SIZE.m} as='div' className={styles.discountCell}>
              {formatCurrency(-Math.abs(discount.value))}
            </Typography>
          </Fragment>
        ))}
      </div>
    </>
  );
}
