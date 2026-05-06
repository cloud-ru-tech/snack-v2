import { Canvas } from '#docs/components/Canvas'
import { {{COMPONENT_NAME}} } from '@ds/{{PKG_NAME}}'
import doc from '../docs/props.json'

export function {{COMPONENT_NAME}}Demo() {
  return (
    <Canvas
      component={{{COMPONENT_NAME}}}
      componentDoc={doc.{{COMPONENT_NAME}}}
      defaultProps={{ children: '{{DISPLAY_TITLE}}' }}
      controls={{
        children: { type: 'text' },
      }}
    />
  )
}
