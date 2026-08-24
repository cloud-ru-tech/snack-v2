import { Logo } from '@ds/uikit-product-header';

export function WithMode() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Logo href='/' mode='develop' data-test-id='header-logo-develop' />
      <Logo href='/' mode='stage' data-test-id='header-logo-stage' />
      <Logo href='/' mode='hybrid' data-test-id='header-logo-hybrid' />
    </div>
  );
}
