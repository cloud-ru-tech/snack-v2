import { Spinner } from '@ds/loader';

import { Canvas } from '#docs/components/Canvas';

import loaderDoc from '../docs/props.json';

export function SpinnerDemo() {
  return <Canvas component={Spinner} componentDoc={loaderDoc.Spinner} defaultProps={{ size: 's' }} />;
}
