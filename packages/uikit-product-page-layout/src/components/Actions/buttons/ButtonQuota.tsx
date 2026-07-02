import { QuotaWidget, QuotaWidgetProps } from '@ds/uikit-product-quota';

/**
 * Quota-вариант action'а. В легаси на мобиле рендерился `QuotaWidgetMobile` (bottom-sheet),
 * которого в `@ds/uikit-product-quota` нет — есть только `QuotaWidget`, самостоятельно управляющий
 * собственным dropdown'ом и кнопкой-триггером (`buttonProps`). Поэтому используем `QuotaWidget` на
 * обеих раскладках; `QuotaWidget` сам не адаптивен.
 *
 * TODO Figma-phase: на mobile легаси показывал квоты в bottom-sheet; `@ds` `QuotaWidget` всегда
 * открывает анкорный dropdown. Визуальный паритет мобильной выкладки квот — отдельная задача.
 */
export type ButtonQuotaProps = QuotaWidgetProps;

export function ButtonQuota({ buttonProps, ...props }: ButtonQuotaProps) {
  return <QuotaWidget {...props} buttonProps={{ size: 's', ...buttonProps }} />;
}
