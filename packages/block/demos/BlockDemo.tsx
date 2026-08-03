import { Block } from '@ds/block';

import { Canvas } from '#docs/components/Canvas';

import blockDoc from '../docs/props.json';

export function BlockDemo() {
  return (
    <Canvas
      component={Block}
      componentDoc={blockDoc.Block}
      defaultProps={{
        view: 'simple',
        size: 'l',
        backgroundPredefined: 'neutralBackground1Level',
        children: '# slot content',
      }}
      controls={{
        view: { type: 'select', options: ['simple', 'outline', 'elevated'] },
        backgroundPredefined: {
          type: 'select',
          options: [
            'neutralBackground1Level',
            'primaryBackground',
            'redBackground',
            'orangeBackground',
            'yellowBackground',
            'greenBackground',
            'blueBackground',
            'violetBackground',
            'pinkBackground',
            'decorTransparent',
            'transparent',
          ],
        },
        size: { type: 'select', options: ['s', 'm', 'l'] },
        children: { type: 'text' },
      }}
    />
  );
}
