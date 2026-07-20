import { describe, expect, it, vi } from 'vitest';

import { deleteFiles } from '../../utils/deleteFiles.js';

vi.mock('../../utils/logger.js', () => ({
  logger: { debug: vi.fn() },
}));

vi.mock('fs/promises', () => ({
  default: {
    unlink: vi.fn().mockResolvedValue(undefined),
  },
}));

describe('deleteFiles', () => {
  it('should call unlink for single path', async () => {
    const fs = await import('fs/promises');
    await deleteFiles('/tmp/some-file.ts');
    expect(fs.default.unlink).toHaveBeenCalledWith('/tmp/some-file.ts');
  });

  it('should call unlink for each path when given array', async () => {
    const fs = await import('fs/promises');
    await deleteFiles(['/tmp/a.ts', '/tmp/b.ts']);
    expect(fs.default.unlink).toHaveBeenCalledWith('/tmp/a.ts');
    expect(fs.default.unlink).toHaveBeenCalledWith('/tmp/b.ts');
  });
});
