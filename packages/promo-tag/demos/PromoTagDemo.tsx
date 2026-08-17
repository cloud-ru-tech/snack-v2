import { PromoTag } from '@ds/promo-tag';

import { Canvas } from '#docs/components/Canvas';

import promoTagDoc from '../docs/props.json';

export function PromoTagDemo() {
  return (
    <Canvas
      component={PromoTag}
      componentName='PromoTag'
      componentDoc={promoTagDoc.PromoTag}
      defaultProps={{
        label: 'Promo tag',
        appearance: 'primary',
        roleAppearance: 'accent',
        size: 'xs',
      }}
      controls={{
        label: { type: 'text' },
        appearance: {
          type: 'select',
          options: ['neutral', 'primary', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink'],
        },
        roleAppearance: { type: 'radio', options: ['accent', 'decor'] },
        size: { type: 'select', options: ['xs', 's', 'm'] },
      }}
      excludeProps={['beforeContent', 'afterContent', 'onClick', 'className']}
    />
  );
}
