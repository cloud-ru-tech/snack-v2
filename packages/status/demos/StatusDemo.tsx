import { Status } from '@ds/status';

import statusDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function StatusDemo() {
  return (
    <Canvas
      component={Status}
      componentName='Status'
      componentDoc={statusDoc.Status}
      defaultProps={{
        label: 'Active',
        size: 'xs',
        appearance: 'green',
        hasBackground: false,
        loading: false,
      }}
      controls={{
        label: { type: 'text' },
        size: { type: 'radio', options: ['xs', 's'] },
        appearance: {
          type: 'select',
          options: ['neutral', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink'],
        },
        hasBackground: { type: 'boolean' },
        loading: { type: 'boolean' },
      }}
      excludeProps={['progress', 'className']}
    />
  );
}
