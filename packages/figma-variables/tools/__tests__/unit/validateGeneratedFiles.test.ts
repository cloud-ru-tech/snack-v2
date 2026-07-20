import { describe, expect, it } from 'vitest';

import { validateGeneratedFiles } from '../../utils/validateFiles.js';

describe('validateGeneratedFiles', () => {
  it('should return empty result when validateMode is off', async () => {
    const result = await validateGeneratedFiles(['/any/file.css'], 'off');
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
    expect(result.errorsByFile.size).toBe(0);
    expect(result.warningsByFile.size).toBe(0);
  });

  it('should return empty result when files array is empty', async () => {
    const result = await validateGeneratedFiles([], 'strict');
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });
});
