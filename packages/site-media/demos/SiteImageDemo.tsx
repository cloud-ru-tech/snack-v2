import { SiteImage } from '@ds/site-media';

import { Canvas } from '#docs/components/Canvas';

import mediaDoc from '../docs/props.json';
import { POSTER } from './fixtures';

export function SiteImageDemo() {
  return (
    <Canvas
      component={SiteImage}
      componentName='SiteImage'
      componentDoc={mediaDoc.SiteImage}
      defaultProps={{ src: POSTER, alt: 'Интерфейс сервиса', width: 720 }}
      controls={{ src: { type: 'text' }, alt: { type: 'text' } }}
      excludeProps={['className', 'style']}
    />
  );
}
