import { Avatar } from '@ds/avatar';

import avatarDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function AvatarDemo() {
  return (
    <Canvas
      component={Avatar}
      componentDoc={avatarDoc.Avatar}
      defaultProps={{
        name: 'Jane Doe',
        size: 's',
        shape: 'round',
        appearance: 'neutral',
        showTwoSymbols: false,
      }}
      controls={{
        name: { type: 'text' },
        src: { type: 'text' },
        size: { type: 'select', options: ['xs', 's', 'm', 'l', '3xl', '6xl', '10xl'] },
        shape: { type: 'select', options: ['round', 'square'] },
        appearance: {
          type: 'select',
          options: ['neutral', 'primary', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink'],
        },
        showTwoSymbols: { type: 'boolean' },
      }}
      excludeProps={['className']}
    />
  );
}
