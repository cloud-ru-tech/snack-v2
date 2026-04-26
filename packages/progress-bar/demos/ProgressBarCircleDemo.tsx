import { ProgressBarCircle } from '@ds/progress-bar';

import progressBarDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function ProgressBarCircleDemo() {
  return (
    <Canvas
      component={ProgressBarCircle}
      componentDoc={progressBarDoc.ProgressBarCircle}
      defaultProps={{ progress: 50 }}
      controls={{}}
    />
  );
}
