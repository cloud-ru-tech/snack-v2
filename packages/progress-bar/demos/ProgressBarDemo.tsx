import { ProgressBar } from '@ds/progress-bar';

import progressBarDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function ProgressBarDemo() {
  return <Canvas component={ProgressBar} componentDoc={progressBarDoc.ProgressBar} defaultProps={{}} controls={{}} />;
}
