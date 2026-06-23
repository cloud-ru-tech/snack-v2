import { SIZE, Typography, VARIANT } from '@ds/typography';
import { WithLayoutType } from '@ds/utils';

import { formatNumber } from '@cloud-ru/ft-formatters';

import { AdaptiveQuestionTooltip } from '../../../../components/AdaptiveQuestionTooltip';
import { priceSummaryLocale } from '../../../../locale';
import { DiscountItem } from '../../../../types';
import styles from './styles.module.scss';

export type DiscountPercentCellProps = WithLayoutType<{
  discount: DiscountItem;
}>;

export function DiscountPercentCell({ discount, layoutType }: DiscountPercentCellProps) {
  const { t } = priceSummaryLocale.useTranslations();

  return (
    <div className={styles.percentCell}>
      {discount.percent && (
        <>
          <Typography variant={VARIANT.body} size={SIZE.s}>
            {t('discount')} {formatNumber(-Math.abs(discount.percent))}%
          </Typography>

          {discount.tooltip && (
            <AdaptiveQuestionTooltip
              layoutType={layoutType}
              tip={discount.tooltip}
              trigger={layoutType === 'mobile' ? 'click' : 'hover'}
            />
          )}
        </>
      )}
    </div>
  );
}
