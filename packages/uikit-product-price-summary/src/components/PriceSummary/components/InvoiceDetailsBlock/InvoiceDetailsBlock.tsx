import { useLocale } from '@ds/locale';
import { SIZE, Typography, VARIANT } from '@ds/typography';
import { WithLayoutType } from '@ds/utils';

import { formatCurrency, formatQuantity } from '../../../../helpers';
import { InvoiceDetails } from '../../../../types';
import { CoveredByGrantLabel } from '../CoveredByGrantLabel';
import { Divider } from '../Divider';
import { InvoiceItemBlock } from '../InvoiceItemBlock';
import styles from './styles.module.scss';

export type InvoiceDetailsBlockProps = WithLayoutType<{
  invoice: InvoiceDetails;
}>;

export function InvoiceDetailsBlock({ invoice, layoutType }: InvoiceDetailsBlockProps) {
  const { t } = useLocale('PriceSummary');

  const primaryItems = invoice.items.filter(item => item.primary);
  const firstValue = primaryItems[0]?.coveredByGrant;
  const allSameValue = primaryItems.length > 0 && primaryItems.every(item => item.coveredByGrant === firstValue);

  const showBlockLabel = allSameValue && firstValue !== undefined;
  const showItemLabels = !showBlockLabel;

  return (
    <div className={styles.main}>
      {showBlockLabel && <CoveredByGrantLabel covered={firstValue} />}

      {invoice.title && (
        <>
          <div className={styles.header}>
            <Typography variant={VARIANT.label} size={SIZE.m}>
              {invoice.title}
            </Typography>
            {invoice.quantity && (
              <Typography variant={VARIANT.label} size={SIZE.m}>
                {formatQuantity(invoice.quantity)}
              </Typography>
            )}
          </div>

          <Divider />
        </>
      )}

      {invoice.items.map((item, index) => (
        <InvoiceItemBlock
          key={index}
          item={item}
          index={index}
          layoutType={layoutType}
          showCoveredByGrantLabel={showItemLabels}
        />
      ))}

      {invoice.price !== undefined && (
        <>
          <Divider />

          <div className={styles.footer}>
            <Typography variant={VARIANT.label} size={SIZE.m}>
              {t('price')}: {formatCurrency(invoice.price)}
            </Typography>
          </div>
        </>
      )}
    </div>
  );
}
