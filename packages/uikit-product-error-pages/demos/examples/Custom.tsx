import { ERROR_TYPE, ErrorPage, LOGO_VARIANT } from '@ds/uikit-product-error-pages';

export function Custom() {
  return (
    <ErrorPage
      errorType={ERROR_TYPE.Custom}
      logoVariant={LOGO_VARIANT.Custom}
      logo={<span>ACME</span>}
      mainPageUrl='/dashboard'
      custom={{
        title: 'Quota exceeded',
        text: 'Your project reached its resource limit. Upgrade the plan to continue.',
        statusCode: 429,
        mainButton: { label: 'Upgrade plan', href: '/billing' },
        showMainPageLink: true,
        showBackLink: true,
      }}
    />
  );
}
