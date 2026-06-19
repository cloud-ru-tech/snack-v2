import { PortalContextProvider } from '@ds/portal-context';
import { PREVIEW_CONTEXT, PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

type MockLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { to: string };

const MockLink = forwardRef<HTMLAnchorElement, MockLinkProps>(({ to, onClick, children, ...rest }, ref) => (
  <a ref={ref} href={to} onClick={onClick} {...rest}>
    {children}
  </a>
));
MockLink.displayName = 'MockLink';

export function Polymorphic() {
  return (
    <PortalContextProvider>
      <PromoTagPredefined
        as={MockLink}
        to='https://example.com'
        variant={VARIANTS.Preview}
        context={PREVIEW_CONTEXT.Service}
      />
    </PortalContextProvider>
  );
}
