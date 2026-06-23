import { ERROR_TYPE, ErrorPage, LOGO_VARIANT } from '@ds/uikit-product-error-pages';

export function Offline() {
  return <ErrorPage errorType={ERROR_TYPE.Offline} logoVariant={LOGO_VARIANT.Cloud} />;
}
