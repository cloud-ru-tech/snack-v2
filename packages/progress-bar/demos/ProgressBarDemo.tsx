import { ProgressBar } from '@ds/progress-bar';

import { Canvas } from '#docs/components/Canvas';

import progressBarDoc from '../docs/props.json';

export function ProgressBarDemo() {
  return <Canvas component={ProgressBar} componentDoc={progressBarDoc.ProgressBar} defaultProps={{}} controls={{}} />;
}
