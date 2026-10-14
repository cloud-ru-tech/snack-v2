import { AiButtonGigaMama, APPEARANCE } from '@ds/ai-button-giga';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';
export function AiButtonGigaMamaDemo() {
  return (
    <Canvas
      component={AiButtonGigaMama}
      componentName='AiButtonGigaMama'
      componentDoc={doc.AiButtonGigaMama}
      defaultProps={{ label: 'Создать ресурс', appearance: APPEARANCE.Primary, loading: false, disabled: false }}
      controls={{
        label: { type: 'text' },
        appearance: { type: 'select', options: Object.values(APPEARANCE) },
        loading: { type: 'boolean' },
        disabled: { type: 'boolean' },
      }}
      excludeProps={['className', 'innerRef']}
    />
  );
}
