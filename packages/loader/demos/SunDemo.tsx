import { Sun } from '@ds/loader';

import { Canvas } from '#docs/components/Canvas';

import loaderDoc from '../docs/props.json';

export function SunDemo() {
  return <Canvas component={Sun} componentDoc={loaderDoc.Sun} defaultProps={{ size: 's' }} />;
}
