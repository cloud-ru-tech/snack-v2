import { ERROR_TYPE, ErrorPage, LOGO_VARIANT } from '@ds/uikit-product-error-pages';

export function NotFound() {
  return (
    <ErrorPage
      errorType={ERROR_TYPE.PageNotFound}
      logoVariant={LOGO_VARIANT.Cloud}
      mainPageUrl='/'
      onSupportCenterClick={() => window.open('https://cloud.ru/support', '_blank')}
    />
  );
}
