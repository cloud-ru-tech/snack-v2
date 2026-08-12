import { PlatformLogo, VARIANT } from '@ds/uikit-product-header-legacy';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';

export function PlatformLogoDemo() {
  return (
    <Canvas
      component={PlatformLogo}
      componentDoc={doc.PlatformLogo}
      defaultProps={{ variant: VARIANT.Evolution }}
      controls={{
        variant: { type: 'select', options: Object.values(VARIANT) },
      }}
    />
  );
}
