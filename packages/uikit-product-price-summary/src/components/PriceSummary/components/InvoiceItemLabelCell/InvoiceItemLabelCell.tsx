import { QuestionTooltip } from '@ds/tooltip';
import { TruncateString } from '@ds/truncate-string';
import { SIZE, Typography, VARIANT } from '@ds/typography';

import { formatQuantity } from '../../../../helpers';
import { InvoiceItem } from '../../../../types';
import styles from './styles.module.scss';

export type InvoiceItemLabelCellProps = {
  item: InvoiceItem;
};

export function InvoiceItemLabelCell({ item }: InvoiceItemLabelCellProps) {
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

        {item.labelTooltip && <QuestionTooltip tip={item.labelTooltip} />}
      </div>

      {item.quantity && (
        <Typography variant={VARIANT.body} size={SIZE.s} className={styles.quantity}>
          {formatQuantity(item.quantity)}
        </Typography>
      )}
    </>
  );
}
