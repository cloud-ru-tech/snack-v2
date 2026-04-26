import { ProgressBarPage } from '@ds/progress-bar';

import progressBarDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function ProgressBarPageDemo() {
  return (
    <Canvas
      component={ProgressBarPage}
      componentDoc={progressBarDoc.ProgressBarPage}
      defaultProps={{ inProgress: true }}
      controls={{}}
    />
  );
}
