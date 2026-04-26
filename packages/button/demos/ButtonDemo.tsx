import { Button } from '@ds/button'

import buttonDoc from '../docs/props.json'

import { Canvas } from '~docs/components/Canvas'

export function ButtonDemo() {
  return (
    <Canvas
      component={Button}
      componentName='Button'
      componentDoc={buttonDoc.Button}
      defaultProps={{
        label: 'Button',
        appearance: 'primary',
        view: 'elevated',
        size: 'm',
        iconPosition: 'before',
        disabled: false,
        loading: false,
        fullWidth: false,
      }}
      controls={{
        label: { type: 'text' },
        appearance: { type: 'select', options: ['primary', 'neutral', 'critical'] },
        view: {
          type: 'select',
          options: ['filled', 'outline', 'tonal', 'simple', 'elevated', 'function'],
        },
        size: { type: 'select', options: ['s', 'm', 'l'] },
        iconPosition: { type: 'select', options: ['before', 'after'] },
        disabled: { type: 'boolean' },
        loading: { type: 'boolean' },
        fullWidth: { type: 'boolean' },
      }}
      excludeProps={['icon', 'counter', 'as', 'innerRef', 'className', 'children']}
    />
  )
}
