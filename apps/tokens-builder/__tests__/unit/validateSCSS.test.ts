import { describe, expect, it } from 'vitest';

import { validateSCSS } from '../../src/validators/scssValidator.js';

describe('validateSCSS', () => {
  it('should return empty errors and warnings when mode is off', async () => {
    const result = await validateSCSS('/any/path/file.scss', 'off');
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });
});
