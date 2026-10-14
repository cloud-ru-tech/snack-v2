import { AiButtonGigaFunction, APPEARANCE, SIZE } from '@ds/ai-button-giga';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';
export function AiButtonGigaFunctionDemo() {
  return (
    <Canvas
      component={AiButtonGigaFunction}
      componentName='AiButtonGigaFunction'
      componentDoc={doc.AiButtonGigaFunction}
      defaultProps={{ label: 'Создать ресурс', appearance: APPEARANCE.Primary, loading: false, disabled: false }}
      controls={{
        label: { type: 'text' },
        appearance: { type: 'select', options: Object.values(APPEARANCE) },
        loading: { type: 'boolean' },
        disabled: { type: 'boolean' },
        size: { type: 'select', options: Object.values(SIZE) },
      }}
      excludeProps={['className', 'innerRef']}
    />
  );
}
