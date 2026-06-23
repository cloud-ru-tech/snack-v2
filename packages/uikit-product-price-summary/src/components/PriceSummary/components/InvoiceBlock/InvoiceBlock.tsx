import { Accordion } from '@ds/accordion';
import { WithLayoutType } from '@ds/utils';
import { useId } from 'react';

import { TEST_IDS } from '../../../../constants';
import { priceSummaryLocale } from '../../../../locale';
import { InvoiceDetails } from '../../../../types';
import { InvoiceDetailsBlock } from '../InvoiceDetailsBlock';
import styles from './styles.module.scss';

export type InvoiceBlockProps = WithLayoutType<{
  invoice: InvoiceDetails[];
  invoiceExpandedDefault?: boolean;
}>;

export function InvoiceBlock({ invoice, invoiceExpandedDefault, layoutType }: InvoiceBlockProps) {
  const { t } = priceSummaryLocale.useTranslations();

  const invoiceBlockId = useId();

  return (
    <div className={styles.accordion}>
      <Accordion expandedDefault={invoiceExpandedDefault ? invoiceBlockId : undefined}>
        <Accordion.CollapseBlockTertiary
          id={invoiceBlockId}
          title={t('orderDetails')}
          data-test-id={TEST_IDS.orderDetails}
        >
          <div className={styles.accordionContent} data-test-id={TEST_IDS.orderDetailsContent}>
            {invoice.map((invoice, index) => (
              <InvoiceDetailsBlock key={index} invoice={invoice} layoutType={layoutType} />
            ))}
          </div>
        </Accordion.CollapseBlockTertiary>
      </Accordion>
    </div>
  );
}
