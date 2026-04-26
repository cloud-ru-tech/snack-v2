import { PromoTag } from '@ds/promo-tag';

import promoTagDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function PromoTagDemo() {
  return (
    <Canvas
      component={PromoTag}
      componentName='PromoTag'
      componentDoc={promoTagDoc.PromoTag}
      defaultProps={{
        text: 'Promo tag',
        appearance: 'primary',
        role: 'accent',
        size: 'xs',
      }}
      controls={{
        text: { type: 'text' },
        appearance: {
          type: 'select',
          options: ['neutral', 'primary', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink'],
        },
        role: { type: 'radio', options: ['accent', 'decor'] },
        size: { type: 'select', options: ['xs', 's', 'm'] },
      }}
      excludeProps={['beforeContent', 'afterContent', 'onClick', 'className']}
    />
  );
}
