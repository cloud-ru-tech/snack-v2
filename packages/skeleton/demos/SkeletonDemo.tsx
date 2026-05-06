import { Skeleton, SkeletonProps } from '@ds/skeleton';

import { Canvas } from '#docs/components/Canvas';

import skeletonDoc from '../docs/props.json';

/**
 * Canvas text controls всегда возвращают строку. Skeleton применяет
 * width/height/borderRadius как inline-CSS — поэтому "240" должен стать 240px.
 * Пропускаем через адаптер: чистые числа → number, иначе оставляем строку как CSS-value.
 */
function toCssSize(value: SkeletonProps['width']): SkeletonProps['width'] {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (trimmed === '') return undefined;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

function SkeletonAdapter({ width, height, borderRadius, ...rest }: SkeletonProps) {
  return (
    <Skeleton {...rest} width={toCssSize(width)} height={toCssSize(height)} borderRadius={toCssSize(borderRadius)} />
  );
}

export function SkeletonDemo() {
  return (
    <Canvas
      component={SkeletonAdapter}
      componentName='Skeleton'
      componentDoc={skeletonDoc.Skeleton}
      defaultProps={{
        loading: true,
        width: 240,
        height: 24,
        borderRadius: 4,
      }}
      controls={{
        loading: { type: 'boolean' },
        width: { type: 'text' },
        height: { type: 'text' },
        borderRadius: { type: 'text' },
      }}
      excludeProps={['className', 'children']}
    />
  );
}
