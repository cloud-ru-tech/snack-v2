import { SiteVideo } from '@ds/site-media';

import { Canvas } from '#docs/components/Canvas';

import mediaDoc from '../docs/props.json';
import { VIDEO } from './fixtures';

export function SiteVideoDemo() {
  return (
    <Canvas
      component={SiteVideo}
      componentName='SiteVideo'
      componentDoc={mediaDoc.SiteVideo}
      defaultProps={{ video: VIDEO }}
      excludeProps={['video', 'className', 'onPlay', 'onError']}
    />
  );
}
