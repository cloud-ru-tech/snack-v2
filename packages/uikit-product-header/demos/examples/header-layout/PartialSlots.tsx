import { HeaderLayout } from '@ds/uikit-product-header';

function Slot({ label }: { label: string }) {
  return <div style={{ padding: '4px 8px', fontSize: 12 }}>{label}</div>;
}

export function PartialSlots() {
  return (
    <HeaderLayout
      menu={<Slot label='Menu' />}
      logo={<Slot label='Logo' />}
      breadcrumbs={<Slot label='Breadcrumbs' />}
      data-test-id='header-layout-partial'
    />
  );
}
