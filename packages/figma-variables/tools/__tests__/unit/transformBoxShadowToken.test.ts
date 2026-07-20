import type { TransformedToken } from 'style-dictionary';
import { describe, expect, it } from 'vitest';

import { transformBoxShadowToken } from '../../transforms/toCSSVariable/helpers/transformBoxShadowToken.js';

describe('transformBoxShadowToken', () => {
  it('should return CSS custom property line for boxShadow token', () => {
    const token = {
      path: ['sn', 'theme', 'effect', 'shadow', 's'],
      name: 'sn-theme-effect-shadow-s',
      $value: [
        {
          x: 0,
          y: '2px',
          blur: 4,
          spread: 0,
          color: '#000000',
          type: 'dropShadow',
        },
      ],
      original: { $value: [] },
    } as Partial<TransformedToken>;

    const result = transformBoxShadowToken(token);
    expect(result).toMatch(/^--sn-theme-effect-shadow-s:/);
    expect(result).toContain(';');
  });
});
