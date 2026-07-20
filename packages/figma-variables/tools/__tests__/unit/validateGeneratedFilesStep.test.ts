import { describe, expect, it } from 'vitest';

import { validateGeneratedFilesStep } from '../../builders/pipeline/validateFiles.js';

describe('validateGeneratedFilesStep', () => {
  it('should return immediately when config.validate is off', async () => {
    await expect(
      validateGeneratedFilesStep(['/some/file.css'], 'css', { validate: 'off' } as Parameters<
        typeof validateGeneratedFilesStep
      >[2]),
    ).resolves.toBeUndefined();
  });

  it('should return immediately when collectResults is provided', async () => {
    const collectResults = () => {};
    await expect(
      validateGeneratedFilesStep(
        ['/some/file.css'],
        'css',
        { validate: 'strict' } as Parameters<typeof validateGeneratedFilesStep>[2],
        collectResults,
      ),
    ).resolves.toBeUndefined();
  });

  it('should return immediately when no files match extension', async () => {
    await expect(
      validateGeneratedFilesStep(['/some/file.txt'], 'css', { validate: 'strict' } as Parameters<
        typeof validateGeneratedFilesStep
      >[2]),
    ).resolves.toBeUndefined();
  });
});
