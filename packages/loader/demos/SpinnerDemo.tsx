import { Spinner } from '@ds/loader'

import loaderDoc from '../docs/props.json'

import { Canvas } from '~docs/components/Canvas'

export function SpinnerDemo() {
  return (
    <Canvas
      component={Spinner}
      componentDoc={loaderDoc.Spinner}
      defaultProps={{ size: 's' }}
    />
  )
}
