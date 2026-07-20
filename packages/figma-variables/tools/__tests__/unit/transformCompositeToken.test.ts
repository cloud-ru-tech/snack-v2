import type { TransformedToken } from 'style-dictionary';
import { describe, expect, it } from 'vitest';

import { transformCompositeToken } from '../../transforms/toCSSVariable/helpers/transformCompositeToken.js';

describe('transformCompositeToken', () => {
  it('should format composite token without dictionary as fallback values', () => {
    const token = {
      path: ['sn', 'theme', 'typography', 'body', 'm'],
      name: 'sn-theme-typography-body-m',
      $value: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: 400,
      },
      original: {
        $value: {
          fontFamily: 'Inter',
          fontSize: 16,
          fontWeight: 400,
        },
      },
    } as Partial<TransformedToken>;

    const result = transformCompositeToken(token);
    expect(result).toContain('/* sn-theme-typography-body-m */');
    expect(result).toContain('fontFamily');
    expect(result).toContain('fontSize');
    expect(result).toContain('16px');
  });

  it('should quote string value that is not numeric', () => {
    const token = {
      path: ['sn', 'typography', 'font'],
      $value: { fontFamily: 'Inter, sans-serif' },
      original: { $value: { fontFamily: 'Inter, sans-serif' } },
    } as Partial<TransformedToken>;

    const result = transformCompositeToken(token);
    expect(result).toContain('"Inter, sans-serif"');
  });
});
