import { Timeline } from '@ds/timeline';

import { Canvas } from '#docs/components/Canvas';

import timelineDoc from '../docs/props.json';

const items = [
  { content: 'Заявка создана' },
  { content: 'Обработка' },
  { content: 'Выполнено', dotAppearance: 'green' as const },
];

export function TimelineDemo() {
  return (
    <Canvas
      component={Timeline}
      componentName='Timeline'
      componentDoc={timelineDoc.Timeline}
      defaultProps={{
        items,
        contentPosition: 'right',
        alternate: false,
        fullWidth: false,
      }}
      controls={{
        contentPosition: { type: 'radio', options: ['left', 'right'] },
        alternate: { type: 'boolean' },
        fullWidth: { type: 'boolean' },
      }}
      excludeProps={['items', 'className']}
    />
  );
}
