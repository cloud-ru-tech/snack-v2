import { describe, expect, it, vi } from 'vitest';

import { runTokenReferenceValidation } from '../../src/builders/pipeline/runTokenReferenceValidation.js';

vi.mock('../../src/utils/logger.js', () => ({
  logger: {
    subsection: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

describe('runTokenReferenceValidation', () => {
  it('should not throw when no errors and adapter returns token sets', async () => {
    const adapter = {
      readTokens: vi
        .fn()
        .mockResolvedValue([{ group: '01_primitive', name: 'primitive', path: '01_primitive/primitive', content: {} }]),
      readThemes: vi.fn().mockResolvedValue([]),
    };
    await expect(
      runTokenReferenceValidation(
        adapter as Parameters<typeof runTokenReferenceValidation>[0],
        {
          excludeGroups: [],
          validate: 'strict',
        } as Parameters<typeof runTokenReferenceValidation>[1],
      ),
    ).resolves.toBeUndefined();
  });

  it('should throw when validate is strict and token references excluded group', async () => {
    const adapter = {
      readTokens: vi.fn().mockResolvedValue([
        {
          group: '02_adaptive',
          name: 'desktop',
          path: '02_adaptive/desktop',
          content: {
            sn: {
              adaptive: {
                ref: { $type: 'number', $value: '{sn.06_acrylic.opacity}' },
              },
            },
          },
        },
      ]),
      readThemes: vi.fn().mockResolvedValue([]),
    };
    await expect(
      runTokenReferenceValidation(
        adapter as Parameters<typeof runTokenReferenceValidation>[0],
        {
          excludeGroups: ['06_acrylic'],
          validate: 'strict',
        } as Parameters<typeof runTokenReferenceValidation>[1],
      ),
    ).rejects.toThrow('Token reference validation failed');
  });
});
