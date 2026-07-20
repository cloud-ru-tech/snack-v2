import { describe, expect, it, vi } from 'vitest';

import { validateTokenNamesStep } from '../../builders/pipeline/validateTokenNames.js';

vi.mock('../../utils/logger.js', () => ({
  logger: {
    section: vi.fn(),
    success: vi.fn(),
    separator: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
    subsection: vi.fn(),
  },
}));

describe('validateTokenNamesStep', () => {
  it('should complete without throw when token sets have valid property names', async () => {
    const adapter = {
      readTokens: vi.fn().mockResolvedValue([
        {
          group: 'button',
          name: 'button',
          path: 'button/button',
          content: {
            sn: {
              button: {
                button: {
                  borderRadius: { $type: 'number', $value: 8 },
                },
              },
            },
          },
        },
      ]),
      readThemes: vi.fn().mockResolvedValue([]),
    };
    await expect(
      validateTokenNamesStep(
        adapter as Parameters<typeof validateTokenNamesStep>[0],
        {
          excludeGroups: [],
          validate: 'warning',
        } as Parameters<typeof validateTokenNamesStep>[1],
      ),
    ).resolves.toBeUndefined();
  });
});
