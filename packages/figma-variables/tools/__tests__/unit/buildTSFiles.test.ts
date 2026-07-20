import { describe, expect, it, vi } from 'vitest';

import { buildTSFiles } from '../../builders/buildTSFiles.js';
import { toTokenSet } from '../../utils/tokenSets.js';

vi.mock('../../utils/logger.js', () => ({
  logger: {
    subsection: vi.fn(),
    debug: vi.fn(),
    fileList: vi.fn(),
    success: vi.fn(),
    warn: vi.fn(),
  },
}));

vi.mock('../../builders/pipeline/runTokenReferenceValidation.js', () => ({
  runTokenReferenceValidation: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../builders/pipeline/prepareTokenData.js', () => ({
  prepareTokenData: vi.fn().mockImplementation(async () => {
    const primitiveSet = toTokenSet('01_primitive/primitive', '/tokens');
    const adaptiveSet = toTokenSet('02_adaptive/desktop', '/tokens');
    const tokenSets = [primitiveSet, adaptiveSet].filter(
      (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
    );
    return {
      tokenSets,
      themes: [],
      systemLayers: tokenSets,
      fallbackIncludePaths: [],
    };
  }),
}));

vi.mock('../../utils/compileTs.js', () => ({
  compileTs: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../utils/deleteFiles.js', () => ({
  deleteFiles: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../builders/pipeline/generateFiles.js', () => ({
  generateFiles: vi.fn().mockResolvedValue([]),
}));

describe('buildTSFiles', () => {
  it('should run pipeline and generate TS configs', async () => {
    const adapter = {
      readTokens: vi.fn().mockResolvedValue([]),
      readThemes: vi.fn().mockResolvedValue([]),
    };
    await expect(
      buildTSFiles(
        adapter as Parameters<typeof buildTSFiles>[0],
        {
          excludeGroups: [],
          validate: 'off',
        } as Parameters<typeof buildTSFiles>[1],
        '/build/',
      ),
    ).resolves.toBeUndefined();
  });
});
