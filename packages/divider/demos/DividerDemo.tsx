import { Divider } from '@ds/divider';

import dividerDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function DividerDemo() {
  return (
    <Canvas
      component={Divider}
      componentDoc={dividerDoc.Divider}
      defaultProps={{
        variant: 'regular',
        orientation: 'horizontal',
      }}
      controls={{
        variant: { type: 'select', options: ['regular', 'thin'] },
        orientation: { type: 'select', options: ['horizontal', 'vertical'] },
      }}
      excludeProps={['className']}
    />
  );
}
