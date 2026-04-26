import { StatusIndicator } from '@ds/status';

import statusDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function StatusIndicatorDemo() {
  return (
    <Canvas
      component={StatusIndicator}
      componentName='StatusIndicator'
      componentDoc={statusDoc.StatusIndicator}
      defaultProps={{
        size: 's',
        appearance: 'green',
      }}
      controls={{
        size: { type: 'select', options: ['4xs', '3xs', '2xs', 'xs', 's'] },
        appearance: {
          type: 'select',
          options: ['neutral', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink'],
        },
      }}
      excludeProps={['className']}
    />
  );
}
