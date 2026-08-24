import { HeaderLayout } from '@ds/uikit-product-header';

function Slot({ label }: { label: string }) {
  return <div style={{ padding: '4px 8px', fontSize: 12 }}>{label}</div>;
}

export function Basic() {
  return (
    <HeaderLayout
      menu={<Slot label='Menu' />}
      logo={<Slot label='Logo' />}
      select={<Slot label='Select' />}
      breadcrumbs={<Slot label='Breadcrumbs' />}
      toolbar={<Slot label='Toolbar' />}
      data-test-id='header-layout-basic'
    />
  );
}
