import { type DiscountDetails, type InvoiceDetails, PRICE_PERIOD } from '@ds/uikit-product-price-summary';

export const FIGMA_SHOWCASE_PRICE = 9_999_999.99;

export const FIGMA_SHOWCASE_DISCOUNT: DiscountDetails = {
  price: FIGMA_SHOWCASE_PRICE,
  discounts: [
    { value: 1000, percent: 9 },
    { value: 1000, percent: 9 },
  ],
};

export const FIGMA_SHOWCASE_INVOICE: InvoiceDetails[] = [
  {
    title: 'Сервис',
    quantity: 1,
    price: FIGMA_SHOWCASE_PRICE,
    items: [
      { label: 'Ресурс', price: FIGMA_SHOWCASE_PRICE, quantity: 1, primary: true, coveredByGrant: true },
      {
        label: 'Ресурс',
        price: FIGMA_SHOWCASE_PRICE,
        quantity: 1,
        discount: { value: 2_999_999.99, percent: 30 },
      },
      { label: 'Ресурс', price: FIGMA_SHOWCASE_PRICE, quantity: 1 },
      {
        label: 'Ресурс',
        price: FIGMA_SHOWCASE_PRICE,
        quantity: 1,
        discount: { value: 2_999_999.99, percent: 30 },
      },
      { label: 'Ресурс', price: FIGMA_SHOWCASE_PRICE, quantity: 1 },
    ],
  },
  {
    title: 'Стоимость',
    price: FIGMA_SHOWCASE_PRICE,
    items: [
      { label: 'Ресурс', price: FIGMA_SHOWCASE_PRICE, quantity: 1, coveredByGrant: true, primary: true },
      {
        label: 'Ресурс',
        price: FIGMA_SHOWCASE_PRICE,
        quantity: 1,
        discount: { value: 2_999_999.99, percent: 30 },
      },
      { label: 'Ресурс', price: FIGMA_SHOWCASE_PRICE, quantity: 1 },
      {
        label: 'Ресурс',
        price: FIGMA_SHOWCASE_PRICE,
        quantity: 1,
        discount: { value: 2_999_999.99, percent: 30 },
      },
      { label: 'Ресурс', price: FIGMA_SHOWCASE_PRICE, quantity: 1 },
    ],
  },
];

/** Полное наполнение blockSecondary из Figma `2909:5733`. */
export const FIGMA_SHOWCASE_ARGS = {
  value: FIGMA_SHOWCASE_PRICE,
  period: PRICE_PERIOD.Month,
  periodOptions: [PRICE_PERIOD.Month, PRICE_PERIOD.Year],
  loading: false,
  dataError: false,
  invoiceExpandedDefault: true,
  promoBadge: { text: '−9%' },
  discount: FIGMA_SHOWCASE_DISCOUNT,
  hint: 'Дополнительная информация',
  invoice: FIGMA_SHOWCASE_INVOICE,
  docsLink: {
    href: 'https://example.com',
    text: 'Подробнее о тарифах и ценах',
  },
} as const;

/** Showcase `size=small, loading=false` из Figma `2909:8947`. */
export const FIGMA_SHOWCASE_SMALL_ARGS = {
  value: FIGMA_SHOWCASE_PRICE,
  loading: false,
  dataError: false,
  docsLink: {
    href: 'https://example.com',
    text: 'Подробнее о стоимости',
  },
} as const;

export const DEFAULT_PERIOD_OPTIONS = [PRICE_PERIOD.Month, PRICE_PERIOD.Year, PRICE_PERIOD.Day] as const;

export const DEFAULT_DISCOUNT: DiscountDetails = {
  price: 12000,
  discounts: [
    { value: 1200, percent: 10, tooltip: 'Promo discount' },
    { value: 600, percent: 5 },
  ],
};

export const DEFAULT_INVOICE: InvoiceDetails[] = [
  {
    title: 'Compute',
    quantity: 2,
    price: 8000,
    items: [
      { label: 'vCPU', price: 4000, primary: true },
      { label: 'RAM', price: 4000, quantity: '16 GB' },
      { label: 'Volume discount', discount: { value: 500, percent: 5 } },
    ],
  },
  {
    title: 'Storage',
    items: [
      { label: 'SSD', price: 2000, coveredByGrant: true, primary: true },
      { label: 'Backup', price: 500 },
    ],
  },
];

/** Playground / docs: наполнение как в Figma `2909:5733`. */
export const PLAYGROUND_DEFAULT_ARGS = {
  ...FIGMA_SHOWCASE_ARGS,
  periodOptions: [...FIGMA_SHOWCASE_ARGS.periodOptions],
};
