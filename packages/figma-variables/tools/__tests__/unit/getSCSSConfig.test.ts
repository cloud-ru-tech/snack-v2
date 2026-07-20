import { describe, expect, it } from 'vitest';

import { getSCSSConfig } from '../../configs/getSCSSConfig.js';
import { toTokenSet } from '../../utils/tokenSets.js';

describe('getSCSSConfig', () => {
  it('should return null when tokenSets have no file paths', async () => {
    const tokenSets = [toTokenSet('01_primitive/primitive')].filter(
      (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
    );
    const config = await getSCSSConfig({
      tokenSets,
      fileName: 'base',
      buildPath: '/build/scss/',
      scssModules: false,
      getFilePath: async () => null,
    });
    expect(config).toBeNull();
  });

  it('should return config with source when tokenSets have filePath', async () => {
    const tokenSets = [toTokenSet('01_primitive/primitive', '/tokens')].filter(
      (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
    );
    const config = await getSCSSConfig({
      tokenSets,
      fileName: 'primitive',
      directory: 'primitive',
      buildPath: '/build/scss/',
      scssModules: false,
      getFilePath: async () => null,
      skipThemeIncludes: true,
    });
    expect(config).not.toBeNull();
    expect(config?.source).toContain('/tokens/01_primitive/primitive.json');
    expect(config?.platforms?.css?.buildPath).toBe('/build/scss/');
    expect(config?.platforms?.css?.files?.[0]?.destination).toBe('primitive/primitive.scss');
  });
});
