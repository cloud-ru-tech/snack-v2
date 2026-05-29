import { TruncateString } from '@ds/truncate-string';
import { SIZE, Typography, VARIANT } from '@ds/typography';
import { WithLayoutType } from '@ds/utils';

import { formatQuantity } from '../../../../helpers';
import { InvoiceItem } from '../../../../types';
import { AdaptiveQuestionTooltip } from '../../../AdaptiveQuestionTooltip';
import styles from './styles.module.scss';

export type InvoiceItemLabelCellProps = WithLayoutType<{
  item: InvoiceItem;
}>;

export function InvoiceItemLabelCell({ item, layoutType }: InvoiceItemLabelCellProps) {
  const isLabelVisible = 'label' in item && item.label !== undefined;

  if (!isLabelVisible) {
    return;
  }

  return (
    <>
      <div className={styles.labelCell}>
        <Typography variant={VARIANT.body} size={SIZE.s} className={styles.label}>
          {item.labelMaxLines ? <TruncateString text={item.label} maxLines={item.labelMaxLines} /> : item.label}
        </Typography>

        {item.labelTooltip && (
          <AdaptiveQuestionTooltip
            layoutType={layoutType}
            tip={item.labelTooltip}
            trigger={layoutType === 'mobile' ? 'click' : 'hover'}
          />
        )}
      </div>

      {item.quantity && (
        <Typography variant={VARIANT.body} size={SIZE.s} className={styles.quantity}>
          {formatQuantity(item.quantity)}
        </Typography>
      )}
    </>
  );
}
