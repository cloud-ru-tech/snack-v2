import { Skeleton } from '@ds/skeleton';

import skeletonDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function SkeletonDemo() {
  return (
    <Canvas
      component={Skeleton}
      componentName='Skeleton'
      componentDoc={skeletonDoc.Skeleton}
      defaultProps={{
        loading: true,
        width: 240,
        height: 24,
        borderRadius: 4,
      }}
      controls={{
        loading: { type: 'boolean' },
        width: { type: 'text' },
        height: { type: 'text' },
        borderRadius: { type: 'text' },
      }}
      excludeProps={['className', 'children']}
    />
  );
}
