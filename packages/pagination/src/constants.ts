export const PAGINATION_SIZE = {
  S: 's',
  M: 'm',
} as const;

export const PAGINATION_SLIDER_SIZE = {
  Xs: 'xs',
  S: 's',
} as const;

export const VARIANT = {
  Link: 'link',
  Button: 'button',
} as const;

export const TEST_IDS = {
  /** Корень `Pagination` (ставится потребителем через `data-test-id`). */
  root: 'pagination',
  /** Корень `PaginationSlider` (ставится потребителем через `data-test-id`). */
  sliderRoot: 'pagination-slider',
  /** Кнопка «предыдущая страница». */
  prev: 'page-prev-button',
  /** Кнопка «следующая страница». */
  next: 'page-next-button',
  /** Префикс для кнопки конкретной страницы. Полный id — `page-number-button-${page}`. */
  pageNumberPrefix: 'page-number-button',
  /** Префикс для кнопки «многоточие» (break). Полный id — `page-more-button-${start}-${end}`. */
  pageMorePrefix: 'page-more-button',
  /** Префикс для кнопки страницы в `PaginationSlider`. Полный id — `page-button-slider-${value}`. */
  sliderItemPrefix: 'page-button-slider',
} as const;

export const getPageNumberTestId = (page: number) => `${TEST_IDS.pageNumberPrefix}-${page}`;
export const getPageMoreTestId = (start: number, end: number) => `${TEST_IDS.pageMorePrefix}-${start}-${end}`;
export const getSliderItemTestId = (value: number) => `${TEST_IDS.sliderItemPrefix}-${value}`;
