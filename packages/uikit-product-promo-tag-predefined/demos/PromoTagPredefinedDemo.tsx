import { PREVIEW_CONTEXT, PromoTagPredefined, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';

import { Canvas } from '#docs/components/Canvas';

import promoTagPredefinedDoc from '../docs/props.json';

export function PromoTagPredefinedDemo() {
  return (
    <Canvas
      component={PromoTagPredefined}
      componentDoc={promoTagPredefinedDoc.PromoTagPredefined}
      defaultProps={{
        variant: VARIANTS.Preview,
        context: PREVIEW_CONTEXT.Service,
      }}
      controls={{
        variant: {
          type: 'select',
          options: Object.values(VARIANTS),
        },
        context: {
          type: 'select',
          options: Object.values(PREVIEW_CONTEXT),
        },
      }}
      excludeProps={['className', 'tooltip', 'onClick']}
    />
  );
}
