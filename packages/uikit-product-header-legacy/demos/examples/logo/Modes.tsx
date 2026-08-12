import { HEADER_LOGO_MODE, Logo } from '@ds/uikit-product-header-legacy';

export function Modes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Logo href='#' mode={HEADER_LOGO_MODE.Prod} />
      <Logo href='#' mode={HEADER_LOGO_MODE.Develop} />
      <Logo href='#' mode={HEADER_LOGO_MODE.Stage} />
      <Logo href='#' mode={HEADER_LOGO_MODE.Hybrid} />
    </div>
  );
}
