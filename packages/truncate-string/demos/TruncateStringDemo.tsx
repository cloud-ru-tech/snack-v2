import { TruncateString, TruncateStringProps } from '@ds/truncate-string';

import { Canvas } from '#docs/components/Canvas';

import truncateStringDoc from '../docs/props.json';

/**
 * Tooltip появляется только когда текст реально не помещается.
 * Оборачиваем TruncateString в узкий контейнер фиксированной ширины,
 * чтобы дефолтный текст всегда был truncated и hideTooltip имел эффект.
 */
function TruncateStringAdapter(props: TruncateStringProps) {
  return (
    <div style={{ width: 220, border: '1px dashed var(--sn-foreground-primary, #ccc)', padding: 8, borderRadius: 4 }}>
      <TruncateString {...props} />
    </div>
  );
}

export function TruncateStringDemo() {
  return (
    <Canvas
      component={TruncateStringAdapter}
      componentName='TruncateString'
      componentDoc={truncateStringDoc.TruncateString}
      defaultProps={{
        text: 'Очень длинный текст, который точно не поместится в узкий контейнер превью',
        variant: 'end',
        maxLines: 1,
        hideTooltip: false,
      }}
      controls={{
        text: { type: 'text' },
        variant: { type: 'select', options: ['end', 'middle'] },
        maxLines: { type: 'number' },
        hideTooltip: { type: 'boolean' },
      }}
      excludeProps={['placement', 'trigger', 'className']}
    />
  );
}
