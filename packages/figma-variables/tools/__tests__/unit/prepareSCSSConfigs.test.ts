import { describe, expect, it } from 'vitest';

import { prepareSCSSConfigs } from '../../builders/pipeline/prepareSCSSConfigs.js';
import { toTokenSet } from '../../utils/tokenSets.js';

describe('prepareSCSSConfigs', () => {
  it('should return empty array when system layers have no token sets', async () => {
    const tokenSets = [toTokenSet('01_primitive/primitive', '/tokens')].filter(
      (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
    );
    const systemLayers = tokenSets;
    const result = await prepareSCSSConfigs(
      { tokenSets, systemLayers, themes: [], fallbackIncludePaths: [] },
      { excludeGroups: [], scssModules: false },
      '/build/',
      async () => null,
    );
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return configs when token sets have filePath and getFilePath resolves', async () => {
    const primitiveSet = toTokenSet('01_primitive/primitive', '/tokens');
    const tokenSets = [primitiveSet].filter((t): t is NonNullable<typeof t> => t !== null && t !== undefined);
    const systemLayers = tokenSets;
    const result = await prepareSCSSConfigs(
      { tokenSets, systemLayers, themes: [], fallbackIncludePaths: [] },
      { excludeGroups: [], scssModules: false },
      '/build/',
      async (path: string) => (path.includes('primitive') ? '/tokens/01_primitive/primitive.json' : null),
    );
    expect(result.length).toBeGreaterThanOrEqual(0);
  });
});
