import { Avatar } from '@ds/avatar';

import { Canvas } from '#docs/components/Canvas';

import avatarDoc from '../docs/props.json';

export function AvatarDemo() {
  return (
    <Canvas
      component={Avatar}
      componentDoc={avatarDoc.Avatar}
      defaultProps={{
        name: 'Jane Doe',
        size: 's',
        shape: 'rounded',
        appearance: 'neutral',
        showTwoSymbols: false,
      }}
      controls={{
        name: { type: 'text' },
        src: { type: 'text' },
        size: { type: 'select', options: ['xs', 's', 'm', 'l', '3xl', '6xl', '9xl'] },
        shape: { type: 'select', options: ['rounded', 'squared'] },
        appearance: {
          type: 'select',
          options: ['neutral', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'pink'],
        },
        showTwoSymbols: { type: 'boolean' },
      }}
      excludeProps={['className']}
    />
  );
}
