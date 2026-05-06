import { Divider, DividerProps } from '@ds/divider';

import { Canvas } from '#docs/components/Canvas';

import dividerDoc from '../docs/props.json';

/**
 * В Canvas превью flex-контейнер автоматически не даёт высоту вертикальному Divider.
 * Оборачиваем в фиксированный wrapper, чтобы обе ориентации были видны.
 */
function DividerAdapter(props: DividerProps) {
  const isVertical = props.orientation === 'vertical';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: isVertical ? 40 : 240,
        height: isVertical ? 40 : 'auto',
      }}
    >
      <Divider {...props} />
    </div>
  );
}

export function DividerDemo() {
  return (
    <Canvas
      component={DividerAdapter}
      componentName='Divider'
      componentDoc={dividerDoc.Divider}
      defaultProps={{
        variant: 'regular',
        orientation: 'horizontal',
      }}
      controls={{
        variant: { type: 'select', options: ['regular', 'thin'] },
        orientation: { type: 'select', options: ['horizontal', 'vertical'] },
      }}
      excludeProps={['className']}
    />
  );
}
