import { QuestionTooltipProps } from '@ds/tooltip';
import { ValueOf } from '@ds/utils';

import { APPEARANCE_STATE, PRICE_PERIOD } from './constants';

export type PricePeriod = ValueOf<typeof PRICE_PERIOD>;

/** Префикс перед итоговой суммой: без префикса (`equal`) или «от» (`from`). */
export type TotalSumType = 'equal' | 'from';

/** Визуальное состояние подсказки и дельты общей суммы. */
export type AppearanceState = ValueOf<typeof APPEARANCE_STATE>;

export type DiscountItem = {
  /** Сумма скидки в валюте (в UI выводится со знаком «−»). */
  value: number;
  /** Процент скидки для бейджа `−N%`. */
  percent?: number;
  /** Контент тултипа-пояснения к скидке. */
  tooltip?: QuestionTooltipProps['tip'];
};

export type DiscountDetails = {
  /** Базовая цена до применения скидок. */
  price: number;
  /** Список применённых скидок. */
  discounts: DiscountItem[];
};

export type PriceInvoiceItem = {
  /** Подпись строки детализации. */
  label: string;
  /** Скидка для строки с ценой. */
  discount?: DiscountItem;
};

export type DiscountInvoiceItem = {
  /** Скидка без собственной цены. */
  discount: DiscountItem;
};

export type BaseInvoiceItem = (PriceInvoiceItem | DiscountInvoiceItem) & {
  /** Тултип для label строки детализации. */
  labelTooltip?: QuestionTooltipProps['tip'];
  /** Цена строки в валюте. */
  price?: number;
  /** Цвет цены: обычный или акцент изменения. */
  priceColor?: 'default' | 'changed';
  /** Скрыть колонку цены вне зависимости от значения `price`. */
  hidePrice?: boolean;
  /** Ограничение количества строк в label. */
  labelMaxLines?: number;
  /** Количество рядом с title/label (например, `×2`). */
  quantity?: string | number;
  /** Показать верхний разделитель перед строкой. */
  topDivider?: boolean;
  /** Показать нижний разделитель после строки. */
  bottomDivider?: boolean;
};

export type PrimaryInvoiceItem = BaseInvoiceItem & {
  /** Явная отметка основной строки. */
  primary: true;
  /** Флаг покрытия позиции грантом (только для primary-строк). */
  coveredByGrant?: boolean;
};

export type SecondaryInvoiceItem = BaseInvoiceItem & {
  /** Secondary-строка (по умолчанию, если `primary` не задан). */
  primary?: false;
  coveredByGrant?: never;
};

/** Строка детализации заказа. */
export type InvoiceItem = PrimaryInvoiceItem | SecondaryInvoiceItem;

export type InvoiceDetails = {
  /** Заголовок секции детализации. */
  title?: string;
  /** Количество рядом с заголовком секции. */
  quantity?: string | number;
  /** Цена секции детализации. */
  price?: number;
  /** Строки секции детализации. */
  items: InvoiceItem[];
};

export type PriceDeltaDetails = {
  /** Величина изменения цены. */
  value: number;
  /** Тип изменения: повышение или снижение. */
  type: 'increased' | 'decreased';
};
