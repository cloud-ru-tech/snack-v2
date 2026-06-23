import { Link, LinkProps } from '@ds/link';
import { BACKGROUND_PREDEFINED_FILL, backgroundPredefinedFillToAcrylic } from '@ds/materials';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import { priceSummaryLocale } from '../../locale';
import { DiscountDetails, InvoiceDetails } from '../../types';
import { ContentBlock, ContentBlockProps } from '../ContentBlock';
import { DiscountBlock } from './components/DiscountBlock';
import { HeaderBlock, HeaderBlockProps } from './components/HeaderBlock';
import { InvoiceBlock } from './components/InvoiceBlock';
import { TotalValueBlock, TotalValueBlockProps } from './components/TotalValueBlock';
import styles from './styles.module.scss';

export type PriceSummaryProps = WithLayoutType<
  WithSupportProps<
    TotalValueBlockProps &
      HeaderBlockProps &
      ContentBlockProps & {
        /** Блок базовой цены и скидок. */
        discount?: DiscountDetails;
        /** Секции детализации заказа в аккордеоне. */
        invoice?: InvoiceDetails[];
        /** Начальное состояние раскрытия аккордеона invoice. */
        invoiceExpandedDefault?: boolean;
        /** Ссылка «Подробнее о расчёте». */
        docsLink?: {
          href?: LinkProps['href'];
          text?: LinkProps['text'];
        };
        /** Дополнительный класс корневого контейнера. */
        className?: string;
      }
  >
>;

export function PriceSummary({
  value,
  totalSumType,
  hint,
  period,
  onPeriodChanged,
  periodOptions,
  promoBadge,
  loading,
  dataError,
  onRetry,
  discount,
  invoice,
  invoiceExpandedDefault = true,
  docsLink,
  className,
  layoutType,
  hintAppearance,
  showHintTooltip = false,
  hintTooltipText,
  hintLink,
  showHintLink,
  valueDelta,
  ...rest
}: PriceSummaryProps) {
  const { t } = priceSummaryLocale.useTranslations();
  const { appearance, level } = backgroundPredefinedFillToAcrylic(BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level);

  return (
    <div
      className={cn(styles.priceSummary, className)}
      data-acrylic-appearance={appearance}
      data-acrylic-level={level}
      {...extractSupportProps(rest)}
    >
      <span className={styles.acrylic} aria-hidden data-acrylic-background />

      <div className={styles.content}>
        <HeaderBlock
          period={period}
          onPeriodChanged={onPeriodChanged}
          periodOptions={periodOptions}
          promoBadge={promoBadge}
          layoutType={layoutType}
        />

        <ContentBlock loading={loading} dataError={dataError} onRetry={onRetry}>
          {discount && <DiscountBlock value={discount} layoutType={layoutType} />}

          <TotalValueBlock
            value={value}
            totalSumType={totalSumType}
            hint={hint}
            hintAppearance={hintAppearance}
            showHintTooltip={showHintTooltip}
            hintTooltipText={hintTooltipText}
            hintLink={hintLink}
            showHintLink={showHintLink}
            valueDelta={valueDelta}
          />

          {invoice && invoice.length > 0 && (
            <InvoiceBlock invoice={invoice} invoiceExpandedDefault={invoiceExpandedDefault} layoutType={layoutType} />
          )}

          {docsLink?.href && <Link text={docsLink.text || t('docsLink')} href={docsLink.href} target='_blank' />}
        </ContentBlock>
      </div>
    </div>
  );
}
