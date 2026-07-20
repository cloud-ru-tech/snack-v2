import { describe, expect, it, vi } from 'vitest';

import { buildSCSSFiles } from '../../builders/buildSCSSFiles.js';
import { toTokenSet } from '../../utils/tokenSets.js';

vi.mock('../../utils/logger.js', () => ({
  logger: {
    subsection: vi.fn(),
    fileList: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock('../../builders/pipeline/runTokenReferenceValidation.js', () => ({
  runTokenReferenceValidation: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../builders/pipeline/prepareTokenData.js', () => ({
  prepareTokenData: vi.fn().mockImplementation(async () => {
    const primitiveSet = toTokenSet('01_primitive/primitive', '/tokens');
    const tokenSets = [primitiveSet].filter((t): t is NonNullable<typeof t> => t !== null && t !== undefined);
    return {
      tokenSets,
      themes: [],
      systemLayers: tokenSets,
      fallbackIncludePaths: [],
    };
  }),
}));

vi.mock('../../builders/pipeline/validateFiles.js', () => ({
  validateGeneratedFilesStep: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../builders/pipeline/generateFiles.js', () => ({
  generateFiles: vi.fn().mockResolvedValue([]),
}));

describe('buildSCSSFiles', () => {
  it('should run pipeline and generate SCSS configs', async () => {
    const adapter = {
      readTokens: vi.fn().mockResolvedValue([]),
      readThemes: vi.fn().mockResolvedValue([]),
    };
    const getFilePath = vi.fn().mockResolvedValue(null);
    await expect(
      buildSCSSFiles(
        adapter as Parameters<typeof buildSCSSFiles>[0],
        { excludeGroups: [], validate: 'off', scssModules: false } as Parameters<typeof buildSCSSFiles>[1],
        '/build/',
        getFilePath,
      ),
    ).resolves.toBeUndefined();
  });
});
