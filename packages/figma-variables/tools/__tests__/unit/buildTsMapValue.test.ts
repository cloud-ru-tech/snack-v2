import type { Dictionary, TransformedToken } from 'style-dictionary';
import { describe, expect, it } from 'vitest';

import { buildTsMapValue } from '../../utils/buildTsMapValue.js';

function createMinimalDictionary(tokens: TransformedToken[] = []): Dictionary {
  return { tokens: {}, allTokens: tokens } as Dictionary;
}

describe('buildTsMapValue', () => {
  it('should return var() string for simple dimension token', () => {
    const dictionary = createMinimalDictionary();
    const token: TransformedToken = {
      name: 'sn-primitive-dimension-16',
      path: ['sn', 'primitive', 'dimension', '16'],
      $value: '16px',
      $type: 'dimension',
      original: { $value: 16, $type: 'dimension' },
    } as TransformedToken;

    const result = buildTsMapValue({ dictionary, token });
    expect(result).toContain('var(--sn-primitive-dimension-16');
    expect(result).toContain('16px');
  });

  it('should return object template for non-token dictionary', () => {
    const dictionary = createMinimalDictionary();
    const token = {
      dimension: {
        '16': {
          name: 'sn-primitive-dimension-16',
          path: ['sn', 'primitive', 'dimension', '16'],
          $value: '16px',
          $type: 'dimension',
        },
      },
    };

    const result = buildTsMapValue({ dictionary, token: token as Parameters<typeof buildTsMapValue>[0]['token'] });
    expect(result).toContain('{');
    expect(result).toContain('}');
  });
});
