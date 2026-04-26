import { Sun } from '@ds/loader'

import loaderDoc from '../docs/props.json'

import { Canvas } from '~docs/components/Canvas'

export function SunDemo() {
  return (
    <Canvas
      component={Sun}
      componentDoc={loaderDoc.Sun}
      defaultProps={{ size: 's' }}
    />
  )
}
