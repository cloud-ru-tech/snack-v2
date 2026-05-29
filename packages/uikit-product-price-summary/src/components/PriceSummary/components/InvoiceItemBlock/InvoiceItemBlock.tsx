import { useLocale } from '@ds/locale';
import { SIZE, Typography, VARIANT } from '@ds/typography';
import { WithLayoutType } from '@ds/utils';

import { formatCurrency } from '../../../../helpers';
import { InvoiceItem } from '../../../../types';
import { CoveredByGrantLabel } from '../CoveredByGrantLabel';
import { DiscountPercentCell } from '../DiscountPercentCell';
import { Divider } from '../Divider';
import { InvoiceItemLabelCell } from '../InvoiceItemLabelCell';
import styles from './styles.module.scss';

export type InvoiceItemBlockProps = WithLayoutType<{
  item: InvoiceItem;
  index: number;
  showCoveredByGrantLabel?: boolean;
}>;

export function InvoiceItemBlock({ item, index, layoutType, showCoveredByGrantLabel }: InvoiceItemBlockProps) {
  const { t } = useLocale('PriceSummary');
  const isEven = (index + 1) % 2 === 0;

  const isSecondary = item.primary === undefined ? isEven : !item.primary;

  const getPriceItem = () => {
    if (item.hidePrice) {
      return undefined;
    }

    return item.price !== undefined ? formatCurrency(item.price) : (t as (key: string) => string)('notAvailable');
  };

  return (
    <>
      {item.topDivider && <Divider />}

      {item.coveredByGrant !== undefined && showCoveredByGrantLabel && (
        <CoveredByGrantLabel covered={item.coveredByGrant} />
      )}

      <div className={styles.itemGrid} data-discount={Boolean(item.discount)}>
        {'label' in item && item.label !== undefined && (
          <>
            <div className={styles.labelCell} data-secondary={isSecondary}>
              <InvoiceItemLabelCell item={item} layoutType={layoutType} />
            </div>

            <Typography
              variant={VARIANT.body}
              size={SIZE.s}
              as='div'
              className={styles.priceCell}
              data-secondary={isSecondary}
              data-price-color={item.priceColor ?? 'default'}
            >
              {getPriceItem()}
            </Typography>
          </>
        )}

        {item.discount && (
          <>
            <div className={styles.percentCell} data-secondary={isSecondary}>
              <DiscountPercentCell discount={item.discount} layoutType={layoutType} />
            </div>

            <Typography
              variant={VARIANT.body}
              size={SIZE.s}
              as='div'
              className={styles.discountCell}
              data-secondary={isSecondary}
            >
              {formatCurrency(-Math.abs(item.discount.value))}
            </Typography>
          </>
        )}
      </div>

      {item.bottomDivider && <Divider />}
    </>
  );
}
