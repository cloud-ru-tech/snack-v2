import { HotSpot } from '@ds/hot-spot';

import hotSpotDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function HotSpotDemo() {
  return (
    <Canvas
      component={HotSpot}
      componentDoc={hotSpotDoc.HotSpot}
      defaultProps={{
        appearance: 'primary',
        pulse: true,
        placement: 'right-top',
        enabled: true,
      }}
      controls={{
        appearance: {
          type: 'select',
          options: ['primary', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink'],
        },
        placement: {
          type: 'select',
          options: [
            'left',
            'left-top',
            'left-bottom',
            'right',
            'right-top',
            'right-bottom',
            'center',
            'center-top',
            'center-bottom',
          ],
        },
        pulse: { type: 'boolean' },
        enabled: { type: 'boolean' },
      }}
      excludeProps={['children', 'dotRender', 'className', 'wrapperClassName']}
    />
  );
}
