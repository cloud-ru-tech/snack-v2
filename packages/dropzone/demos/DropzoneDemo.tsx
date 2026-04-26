import { Dropzone } from '@ds/dropzone';

import dropzoneDoc from '../docs/props.json';

import { Canvas } from '~docs/components/Canvas';

export function DropzoneDemo() {
  return <Canvas component={Dropzone} componentDoc={dropzoneDoc.Dropzone} defaultProps={{}} controls={{}} />;
}
