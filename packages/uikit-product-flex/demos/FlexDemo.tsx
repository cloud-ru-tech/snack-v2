import { Flex, FlexProps } from '@ds/uikit-product-flex';

import { Canvas } from '#docs/components/Canvas';

import doc from '../docs/props.json';

const boxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: 8,
  background: 'var(--sn-theme-color-neutral-background1Level)',
  boxShadow: 'inset 0 0 0 1px var(--sn-theme-color-available-borderColor)',
} as const;

/**
 * В Canvas превью flex-контейнер сжимается по контенту. Оборачиваем в рамку
 * фиксированной ширины и показываем три бокса-ребёнка, чтобы были видны
 * justify / align / gap / wrap / direction.
 */
function FlexAdapter(props: FlexProps) {
  return (
    <div style={{ width: 280, height: 120, boxShadow: 'inset 0 0 0 1px var(--sn-theme-color-available-borderColor)' }}>
      <Flex {...props} fullWidth height='100%'>
        <span style={boxStyle}>1</span>
        <span style={boxStyle}>2</span>
        <span style={boxStyle}>3</span>
      </Flex>
    </div>
  );
}

export function FlexDemo() {
  return (
    <Canvas
      component={FlexAdapter}
      componentName='Flex'
      componentDoc={doc.Flex}
      defaultProps={{
        direction: 'row',
        justify: 'space-between',
        align: 'center',
        gap: '2m',
        wrap: 'nowrap',
      }}
      controls={{
        direction: { type: 'select', options: ['row', 'row-reverse', 'column', 'column-reverse'] },
        justify: {
          type: 'select',
          options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
        },
        align: { type: 'select', options: ['flex-start', 'center', 'flex-end', 'baseline', 'stretch'] },
        gap: { type: 'select', options: ['025m', '050m', '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', '10m'] },
        wrap: { type: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'] },
      }}
      excludeProps={[
        'className',
        'style',
        'as',
        'innerRef',
        'children',
        'flex',
        'width',
        'height',
        'fullWidth',
        'columnGap',
        'rowGap',
        'alignContent',
        'overflow',
        'overflowX',
        'overflowY',
      ]}
    />
  );
}
