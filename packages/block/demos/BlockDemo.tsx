import { Block } from '@ds/block';

import { Canvas } from '#docs/components/Canvas';

import blockDoc from '../docs/props.json';

export function BlockDemo() {
  return (
    <Canvas
      component={Block}
      componentDoc={blockDoc.Block}
      defaultProps={{
        variant: 'simple',
        size: 'l',
        children: '# slot content',
      }}
      controls={{
        variant: { type: 'select', options: ['simple', 'outline', 'shadow', 'transparent'] },
        size: { type: 'select', options: ['s', 'm', 'l'] },
        children: { type: 'text' },
      }}
    />
  );
}
