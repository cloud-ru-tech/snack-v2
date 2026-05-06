import { Card } from '@ds/card';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';

import { Canvas } from '#docs/components/Canvas';

import cardDoc from '../docs/props.json';

const BACKGROUND_OPTIONS = Object.values(BACKGROUND_PREDEFINED_FILL);

export function CardDemo() {
  return (
    <Canvas
      component={Card}
      componentName='Card'
      componentDoc={cardDoc.Card}
      defaultProps={{
        radius: 'm',
        view: 'simple',
        disabled: false,
        backgroundPredefined: BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level,
        children: 'Card content',
      }}
      controls={{
        radius: { type: 'select', options: ['s', 'm', 'l'] },
        view: { type: 'select', options: ['simple', 'outline', 'shadow'] },
        backgroundPredefined: { type: 'select', options: BACKGROUND_OPTIONS },
        disabled: { type: 'boolean' },
        checked: { type: 'boolean' },
        multiSelect: { type: 'boolean' },
      }}
      excludeProps={['className']}
    />
  );
}
