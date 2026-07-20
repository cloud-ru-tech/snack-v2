import { describe, expect, it } from 'vitest';

import { formatBoxShadowValue, type ShadowItem } from '../../utils/formatBoxShadowValue.js';

describe('formatBoxShadowValue', () => {
  it('should format single dropShadow item', () => {
    const item: ShadowItem = {
      x: '0',
      y: '2px',
      blur: '4px',
      spread: '0',
      color: '#000000',
      type: 'dropShadow',
    };
    expect(formatBoxShadowValue(item)).toBe('0 2px 4px 0 #000000');
  });

  it('should format single innerShadow item with inset prefix', () => {
    const item: ShadowItem = {
      x: '0',
      y: '1px',
      blur: '2px',
      spread: '0',
      color: 'rgba(0,0,0,0.1)',
      type: 'innerShadow',
    };
    expect(formatBoxShadowValue(item)).toBe('inset 0 1px 2px 0 rgba(0,0,0,0.1)');
  });

  it('should join multiple items with comma', () => {
    const items: ShadowItem[] = [
      {
        x: '0',
        y: '1px',
        blur: '2px',
        spread: '0',
        color: '#000',
        type: 'dropShadow',
      },
      {
        x: '0',
        y: '4px',
        blur: '8px',
        spread: '0',
        color: '#333',
        type: 'innerShadow',
      },
    ];
    expect(formatBoxShadowValue(items)).toBe('0 1px 2px 0 #000, inset 0 4px 8px 0 #333');
  });
});
