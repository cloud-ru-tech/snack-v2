import { Tag } from '@ds/tag';

import tagDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function TagDemo() {
  return (
    <Canvas
      component={Tag}
      componentName='Tag'
      componentDoc={tagDoc.Tag}
      defaultProps={{
        label: 'Tag',
        appearance: 'neutral',
        size: 'xs',
      }}
      controls={{
        label: { type: 'text' },
        appearance: {
          type: 'select',
          options: ['neutral', 'primary', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink'],
        },
        size: { type: 'select', options: ['xs', 's', 'm'] },
      }}
      excludeProps={['onDelete', 'as', 'href', 'target', 'onClick', 'className', 'children']}
    />
  );
}
