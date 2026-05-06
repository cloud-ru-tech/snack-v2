import { ProgressBarCircle } from '@ds/progress-bar';

import { Canvas } from '#docs/components/Canvas';

import progressBarDoc from '../docs/props.json';

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
