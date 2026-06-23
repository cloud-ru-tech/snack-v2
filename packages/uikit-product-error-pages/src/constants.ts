export const ERROR_TYPE = {
  FrontendError: 'FrontendError',
  PageUnavailable: 'PageUnavailable',
  PageNotFound: 'PageNotFound',
  Offline: 'Offline',
  Redirect: 'Redirect',
  Custom: 'Custom',
} as const;

export const LOGO_VARIANT = {
  Cloud: 'Cloud',
  None: 'None',
  Custom: 'Custom',
} as const;

/**
 * Канонические `data-test-id` слотов, которые компонент ставит на свои внутренние
 * элементы (не получаются от потребителя через `...rest`). Реэкспортируются из
 * `src/index.ts`, чтобы потребитель и e2e helpers брали строки из одного источника.
 */
export const TEST_IDS = {
  root: 'error-page',
  title: 'error-page__title',
  statusCode: 'error-page__status-code',
  mainButton: 'error-page__main-button',
  supportButton: 'error-page__support-button',
  mainPageLink: 'error-page__main-page-link',
  backLink: 'error-page__back-link',
  logo: 'error-page__logo',
  illustration: 'error-page__illustration',
} as const;
