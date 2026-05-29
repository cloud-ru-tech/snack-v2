export const TEST_IDS = {
  priceSummary: 'price-summary',
  priceSummarySmall: 'price-summary-small',
  periodDropdown: 'price-summary-period-dropdown',
  periodOptionYear: 'price-summary-period-option-year',
  periodOptionMonth: 'price-summary-period-option-month',
  periodOptionDay: 'price-summary-period-option-day',
  periodOptionHour: 'price-summary-period-option-hour',
  periodOptionMinute: 'price-summary-period-option-minute',
  contentBlockRetry: 'price-summary-content-block-retry',
  loadingBlock: 'price-summary-loading-block',
  orderDetails: 'price-summary-order-details',
  orderDetailsContent: 'price-summary-order-details-content',
} as const;

export const APPEARANCE_STATE = {
  Default: 'default',
  UserError: 'userError',
  SystemError: 'systemError',
  Warning: 'warning',
} as const;

export const PRICE_PERIOD = {
  Year: 'year',
  Month: 'month',
  Day: 'day',
  Hour: 'hour',
  Minute: 'minute',
} as const;

export const PERIOD_OPTION_TEST_IDS = {
  [PRICE_PERIOD.Year]: TEST_IDS.periodOptionYear,
  [PRICE_PERIOD.Month]: TEST_IDS.periodOptionMonth,
  [PRICE_PERIOD.Day]: TEST_IDS.periodOptionDay,
  [PRICE_PERIOD.Hour]: TEST_IDS.periodOptionHour,
  [PRICE_PERIOD.Minute]: TEST_IDS.periodOptionMinute,
} as const;
