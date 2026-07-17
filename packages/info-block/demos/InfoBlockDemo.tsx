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
        content: 'Пояснительный текст, который помогает пользователю понять контекст.',
        size: 's',
        align: 'vertical',
      }}
      controls={{
        title: { type: 'text' },
        content: { type: 'text' },
        size: { type: 'select', options: ['s', 'm', 'l'] },
        align: { type: 'radio', options: ['vertical', 'horizontal'] },
      }}
      excludeProps={['icon', 'footer', 'className']}
    />
  );
}
