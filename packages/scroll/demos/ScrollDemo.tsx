import { Scroll } from '@ds/scroll';

import scrollDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function ScrollDemo() {
  return <Canvas component={Scroll} componentDoc={scrollDoc.Scroll} defaultProps={{}} controls={{}} />;
}
