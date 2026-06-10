import { defineLocale, defineMessages } from '@ds/locale';

const PRICE_SUMMARY_MESSAGES = defineMessages({
  'en-GB': {
    total: 'Total',
    vat: 'VAT included',
    vatExcluded: 'VAT excluded',
    docsLink: 'Calculation details',
    costLink: 'Cost',
    dataError: 'Failed to load data',
    basePrice: 'Base price',
    discount: 'Discount',
    orderDetails: 'Order breakdown',
    price: 'Cost',
    notAvailable: 'N/A',
    pricePeriodYear: 'per year',
    pricePeriodMonth: 'per month',
    pricePeriodDay: 'per day',
    pricePeriodHour: 'per hour',
    pricePeriodMinute: 'per minute',
    totalSumFromPrefix: 'from',
    increasedPrice: 'Increased by',
    decreasedPrice: 'Decreased by',
    coveredByGrant: 'Covered by grants',
    notCoveredByGrant: 'Not covered by grant',
    coveredByGrantTooltip: 'Amount is covered by grant',
    notCoveredByGrantTooltip: 'Amount is not covered by grant',
  },
  'ru-RU': {
    total: 'Итого',
    vat: 'с НДС',
    vatExcluded: 'без НДС',
    docsLink: 'Подробнее о расчёте',
    costLink: 'Стоимость',
    dataError: 'Не удалось загрузить данные',
    basePrice: 'Базовая цена',
    discount: 'Скидка',
    orderDetails: 'Детализация заказа',
    price: 'Стоимость',
    notAvailable: 'н/д',
    pricePeriodYear: 'в год',
    pricePeriodMonth: 'в месяц',
    pricePeriodDay: 'в день',
    pricePeriodHour: 'в час',
    pricePeriodMinute: 'в минуту',
    totalSumFromPrefix: 'от',
    increasedPrice: 'Повышение на',
    decreasedPrice: 'Снижение на',
    coveredByGrant: 'Покрывается грантами',
    notCoveredByGrant: 'Не покрыто грантом',
    coveredByGrantTooltip: 'Сумма покрыта грантом',
    notCoveredByGrantTooltip: 'Сумма не покрыта грантом',
  },
});

export type PriceSummaryMessages = (typeof PRICE_SUMMARY_MESSAGES)['en-GB'];

/** locale компонента PriceSummary: `priceSummaryLocale.useTranslations()` в коде, `priceSummaryLocale.extend(...)` в сервисе. */
export const priceSummaryLocale = defineLocale('@ds/uikit-product-price-summary', PRICE_SUMMARY_MESSAGES);
