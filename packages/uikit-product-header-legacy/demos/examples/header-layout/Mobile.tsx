import { HeaderLayout, Logo } from '@ds/uikit-product-header-legacy';

function Slot({ label }: { label: string }) {
  return <div style={{ padding: '4px 8px', border: '1px dashed #ccc', fontSize: 12 }}>{label}</div>;
}

export function Mobile() {
  return (
    <HeaderLayout
      isMobile
      menu={<Slot label='Menu' />}
      logo={<Logo href='#' />}
      select={<Slot label='Select' />}
      breadcrumbs={<Slot label='Breadcrumbs' />}
      toolbar={<Slot label='Toolbar' />}
    />
  );
}
