import { APPEARANCE, PromoTag, ROLE_APPEARANCE } from '@ds/promo-tag';
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
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <PromoTag
        as='a'
        href='https://example.com'
        target='_blank'
        text='External promo'
        appearance={APPEARANCE.Blue}
        role={ROLE_APPEARANCE.Decor}
      />
      <PromoTag
        as={MockLink}
        to='https://example.com'
        text='Preview link'
        appearance={APPEARANCE.Primary}
        role={ROLE_APPEARANCE.Accent}
      />
    </div>
  );
}
