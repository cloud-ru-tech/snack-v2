import { describe, expect, it } from 'vitest';

import { getCSSBaseStylesConfig } from '../../src/configs/getCSSBaseStylesConfig.js';
import { toTokenSet } from '../../src/utils/tokenSets.js';

describe('getCSSBaseStylesConfig', () => {
  it('should return null when tokenSets have no file paths', () => {
    const tokenSets = [toTokenSet('01_primitive/primitive')].filter(
      (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
    );
    expect(getCSSBaseStylesConfig(tokenSets, '/build/', 'sn', false, [], [], [], true)).toBeNull();
  });

  it('should return config when tokenSets have filePath', () => {
    const tokenSets = [toTokenSet('01_primitive/primitive', '/tokens')].filter(
      (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
    );
    const config = getCSSBaseStylesConfig(tokenSets, '/build/', 'sn', false, [], [], [], true);
    expect(config).not.toBeNull();
    expect(config?.source).toContain('/tokens/01_primitive/primitive.json');
    expect(config?.platforms?.css?.files?.[0]?.destination).toContain('base');
  });
});
