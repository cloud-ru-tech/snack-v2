import { Counter } from '@ds/counter';

import { Canvas } from '#docs/components/Canvas';

import counterDoc from '../docs/props.json';

export function CounterDemo() {
  return (
    <Canvas
      component={Counter}
      componentDoc={counterDoc.Counter}
      defaultProps={{
        value: 9,
        appearance: 'primary',
        variant: 'count',
        size: 'xs',
        color: 'accent',
      }}
      controls={{
        value: { type: 'number' },
        appearance: { type: 'select', options: ['primary', 'neutral', 'critical'] },
        variant: { type: 'select', options: ['count', 'count-plus', 'count-k'] },
        size: { type: 'select', options: ['xs', 's'] },
        color: { type: 'select', options: ['accent', 'decor'] },
        plusLimit: { type: 'number' },
      }}
      excludeProps={['className']}
    />
  );
}
