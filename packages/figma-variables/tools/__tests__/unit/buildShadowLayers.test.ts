import type { TransformedToken } from 'style-dictionary';
import { describe, expect, it } from 'vitest';

import { buildShadowLayers } from '../../utils/buildShadowLayers.js';

describe('buildShadowLayers', () => {
  it('should build shadow items from token $value array', () => {
    const token = {
      $value: [
        {
          x: 0,
          y: '2px',
          blur: 4,
          spread: '0',
          color: '#000000',
          type: 'dropShadow',
        },
      ],
      original: { $value: [] },
    } as Partial<TransformedToken>;

    const result = buildShadowLayers(token);
    expect(result).toHaveLength(1);
    expect(result[0]?.type).toBe('dropShadow');
    expect(result[0]?.color).toBe('#000000');
    expect(result[0]?.y).toBe('2px');
    expect(result[0]?.blur).toBe('4px');
    expect(result[0]?.spread).toBe('0');
    expect(typeof result[0]?.x).toBe('string');
  });

  it('should map offsetX/offsetY to x/y', () => {
    const token = {
      $value: [
        {
          offsetX: 8,
          offsetY: 16,
          blur: 4,
          spread: 0,
          color: '#333',
          type: 'dropShadow',
        },
      ],
      original: { $value: [] },
    } as Partial<TransformedToken>;

    const result = buildShadowLayers(token);
    expect(result[0]?.x).toBe('8px');
    expect(result[0]?.y).toBe('16px');
  });

  it('should use innerShadow type when specified', () => {
    const token = {
      $value: [
        {
          x: 0,
          y: 1,
          blur: 2,
          spread: 0,
          color: '#000',
          type: 'innerShadow',
        },
      ],
      original: { $value: [] },
    } as Partial<TransformedToken>;

    const result = buildShadowLayers(token);
    expect(result[0]?.type).toBe('innerShadow');
  });
});
