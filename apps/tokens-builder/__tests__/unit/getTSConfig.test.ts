import { describe, expect, it } from 'vitest';

import { getTSConfig } from '../../src/configs/getTSConfig.js';
import { toTokenSet } from '../../src/utils/tokenSets.js';

describe('getTSConfig', () => {
  it('should return null when tokenSets have no file paths', () => {
    const tokenSets = [toTokenSet('01_primitive/primitive')].filter(
      (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
    );
    expect(getTSConfig(tokenSets, '/build/', [])).toBeNull();
  });

  it('should return config with source and platforms when tokenSets have filePath', () => {
    const tokenSets = [toTokenSet('01_primitive/primitive', '/tokens')].filter(
      (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
    );
    const config = getTSConfig(tokenSets, '/build/', []);
    expect(config).not.toBeNull();
    expect(config?.source).toContain('/tokens/01_primitive/primitive.json');
    expect(config?.platforms?.css?.buildPath).toBe('/build/');
    expect(config?.platforms?.css?.files).toHaveLength(1);
    expect(config?.platforms?.css?.files?.[0]?.destination).toBe('styles.ts');
  });

  it('should register filter when excludeGroups is non-empty', () => {
    const tokenSets = [toTokenSet('01_primitive/primitive', '/tokens')].filter(
      (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
    );
    const config = getTSConfig(tokenSets, '/build/', ['06_acrylic']);
    expect(config).not.toBeNull();
    expect(config?.platforms?.css?.files?.[0]?.filter).toBeDefined();
  });
});
