import { QuotaWidget, QuotaWidgetProps } from '@ds/uikit-product-quota';

/** Кнопка квот с адаптивным виджетом. */
export type ButtonQuotaProps = QuotaWidgetProps;

export function ButtonQuota({ buttonProps, ...props }: ButtonQuotaProps) {
  return <QuotaWidget {...props} buttonProps={{ size: 's', ...buttonProps }} />;
}
