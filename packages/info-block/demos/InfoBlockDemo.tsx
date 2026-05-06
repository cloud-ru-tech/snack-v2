import { InfoBlock } from '@ds/info-block';

import { Canvas } from '#docs/components/Canvas';

import infoBlockDoc from '../docs/props.json';

export function InfoBlockDemo() {
  return (
    <Canvas
      component={InfoBlock}
      componentName='InfoBlock'
      componentDoc={infoBlockDoc.InfoBlock}
      defaultProps={{
        title: 'Заголовок блока',
        description: 'Пояснительный текст, который помогает пользователю понять контекст.',
        size: 's',
        align: 'vertical',
      }}
      controls={{
        title: { type: 'text' },
        description: { type: 'text' },
        size: { type: 'select', options: ['s', 'm', 'l'] },
        align: { type: 'radio', options: ['vertical', 'horizontal'] },
      }}
      excludeProps={['icon', 'footer', 'className']}
    />
  );
}
