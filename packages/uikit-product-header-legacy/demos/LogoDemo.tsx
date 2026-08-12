import { HEADER_LOGO_MODE, Logo } from '@ds/uikit-product-header-legacy';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';

export function LogoDemo() {
  return (
    <Canvas
      component={Logo}
      componentDoc={doc.Logo}
      defaultProps={{
        href: '#',
        mode: HEADER_LOGO_MODE.Prod,
        loading: false,
      }}
      controls={{
        mode: { type: 'select', options: Object.values(HEADER_LOGO_MODE) },
        path: { type: 'text' },
        href: { type: 'text' },
        loading: { type: 'boolean' },
      }}
    />
  );
}
