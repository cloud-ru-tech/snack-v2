import { ensureArray } from './ensureArray.js';

export type ShadowItem = {
  x: string;
  y: string;
  blur: string;
  spread: string;
  color: string;
  type: 'innerShadow' | 'dropShadow';
};

export function formatBoxShadowValue(value: ShadowItem | ShadowItem[]): string {
  return ensureArray(value)
    .map(
      ({ x, y, blur, spread, color, type }) =>
        `${type === 'innerShadow' ? 'inset ' : ''}${x} ${y} ${blur} ${spread} ${color}`,
    )
    .join(', ');
}
