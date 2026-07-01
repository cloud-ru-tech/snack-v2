import { QuestionTooltip } from '@ds/tooltip';
import { SIZE, Typography, VARIANT } from '@ds/typography';

import { formatNumber } from '@cloud-ru/ft-formatters';

import { priceSummaryLocale } from '../../../../locale';
import { DiscountItem } from '../../../../types';
import styles from './styles.module.scss';

export type DiscountPercentCellProps = {
  discount: DiscountItem;
};

export function DiscountPercentCell({ discount }: DiscountPercentCellProps) {
  const { t } = priceSummaryLocale.useTranslations();

  return (
    <div className={styles.percentCell}>
      {discount.percent && (
        <>
          <Typography variant={VARIANT.body} size={SIZE.s}>
            {t('discount')} {formatNumber(-Math.abs(discount.percent))}%
          </Typography>

          {discount.tooltip && <QuestionTooltip tip={discount.tooltip} />}
        </>
      )}
    </div>
  );
}
