import { describe, expect, it } from 'vitest';

import { prepareTSConfigs } from '../../src/builders/pipeline/prepareTSConfigs.js';
import { toTokenSet } from '../../src/utils/tokenSets.js';

describe('prepareTSConfigs', () => {
  it('should return empty array when tokenSets produce no TS config', () => {
    const systemLayers = [toTokenSet('01_primitive/primitive'), toTokenSet('02_adaptive/desktop')].filter(
      (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
    );
    const tokenSets = systemLayers;
    const result = prepareTSConfigs({ tokenSets, systemLayers }, { excludeGroups: [] }, '/build/');
    expect(result).toEqual([]);
  });

  it('should return one config when tokenSets have filePath', () => {
    const primitiveSet = toTokenSet('01_primitive/primitive', '/tokens');
    const adaptiveSet = toTokenSet('02_adaptive/desktop', '/tokens');
    const tokenSets = [primitiveSet, adaptiveSet].filter(
      (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
    );
    const systemLayers = tokenSets;
    const result = prepareTSConfigs({ tokenSets, systemLayers }, { excludeGroups: [] }, '/build/');
    expect(result).toHaveLength(1);
    expect(result[0]?.platforms?.css?.buildPath).toBe('/build/ts/');
  });
});
