import { Rating } from '@ds/rating';

import ratingDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function RatingDemo() {
  return (
    <Canvas
      component={Rating}
      componentName='Rating'
      componentDoc={ratingDoc.Rating}
      defaultProps={{
        count: 5,
        defaultValue: 3,
        size: 's',
        appearance: 'yellow',
        allowHalf: false,
        allowClear: false,
        readonly: false,
      }}
      controls={{
        count: { type: 'number' },
        defaultValue: { type: 'number' },
        size: { type: 'radio', options: ['xs', 's'] },
        appearance: {
          type: 'select',
          options: ['primary', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink'],
        },
        allowHalf: { type: 'boolean' },
        allowClear: { type: 'boolean' },
        readonly: { type: 'boolean' },
      }}
      excludeProps={['value', 'onChange', 'className']}
    />
  );
}
