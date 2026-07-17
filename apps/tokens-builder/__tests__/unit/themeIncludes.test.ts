import { describe, expect, it } from 'vitest';

import { collectThemeIncludes } from '../../src/utils/themeIncludes.js';
import { toTokenSet } from '../../src/utils/tokenSets.js';

describe('collectThemeIncludes', () => {
  it('should return empty array when themes is empty', async () => {
    const tokenSets = [toTokenSet('01_primitive/primitive', '/tokens')].filter(
      (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
    );
    const result = await collectThemeIncludes(tokenSets, [], async () => null);
    expect(result).toEqual([]);
  });

  it('should return paths when theme has selectedTokenSets with source and getFilePath resolves', async () => {
    const tokenSets = [toTokenSet('01_primitive/primitive', '/tokens')].filter(
      (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
    );
    const themes = [
      {
        group: '01_primitive',
        name: 'primitive',
        selectedTokenSets: { '01_primitive/primitive': 'source' },
      },
    ];
    const getFilePath = async (path: string) =>
      path.includes('primitive') ? '/tokens/01_primitive/primitive.json' : null;
    const result = await collectThemeIncludes(
      tokenSets,
      themes as Parameters<typeof collectThemeIncludes>[1],
      getFilePath,
    );
    expect(result).toContain('/tokens/01_primitive/primitive.json');
  });
});
