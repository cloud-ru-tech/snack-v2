import { AiButtonGigaOutline, APPEARANCE, ICON_POSITION, SIZE } from '@ds/ai-button-giga';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';
export function AiButtonGigaOutlineDemo() {
  return (
    <Canvas
      component={AiButtonGigaOutline}
      componentName='AiButtonGigaOutline'
      componentDoc={doc.AiButtonGigaOutline}
      defaultProps={{
        label: 'Создать ресурс',
        appearance: APPEARANCE.Primary,
        loading: false,
        disabled: false,
        size: SIZE.S,
        iconPosition: ICON_POSITION.Before,
      }}
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
