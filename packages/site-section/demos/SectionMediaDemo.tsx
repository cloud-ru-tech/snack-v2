import { SectionMedia } from '@ds/site-section';

import { Canvas } from '#docs/components/Canvas';

import mediaDoc from '../docs/props.json';
import { TITLE, VIDEO } from './mediaFixtures';

export function SectionMediaDemo() {
  return (
    <Canvas
      component={SectionMedia}
      componentName='SectionMedia'
      componentDoc={mediaDoc.SectionMedia}
      defaultProps={{ container: 'new', title: TITLE, media: { type: 'video', ...VIDEO } }}
      controls={{
        title: { type: 'text' },
        description: { type: 'text' },
        container: { type: 'select', options: ['new', 'old'] },
      }}
      excludeProps={['media', 'background', 'containerBackground', 'className', 'onPlay', 'onError']}
    />
  );
}
