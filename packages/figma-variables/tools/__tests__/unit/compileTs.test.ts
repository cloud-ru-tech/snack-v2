import { describe, expect, it, vi } from 'vitest';

import { compileTs } from '../../utils/compileTs.js';

vi.mock('../../utils/logger.js', () => ({
  logger: { info: vi.fn(), error: vi.fn() },
}));

vi.mock('child_process', async importOriginal => {
  const actual = (await importOriginal()) as typeof import('child_process');
  return {
    ...actual,
    default: actual,
    execSync: vi.fn(),
  };
});

vi.mock('fs', async importOriginal => {
  const actual = (await importOriginal()) as typeof import('fs');
  return {
    ...actual,
    default: actual,
    existsSync: vi.fn(() => true),
  };
});

vi.mock('fs/promises', () => ({
  default: {
    access: vi.fn().mockResolvedValue(undefined),
  },
}));

describe('compileTs', () => {
  it('should throw when file does not exist', async () => {
    const { default: fsPromises } = await import('fs/promises');
    vi.mocked(fsPromises.access).mockRejectedValueOnce(new Error('ENOENT'));

    await expect(compileTs('/nonexistent/file.ts')).rejects.toThrow('TypeScript file not found');
  });
});
