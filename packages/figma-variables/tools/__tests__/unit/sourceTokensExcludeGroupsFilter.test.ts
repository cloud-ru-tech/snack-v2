import type { TransformedToken } from 'style-dictionary';
import { describe, expect, it } from 'vitest';

import { createSourceTokensExcludeGroupsFilter } from '../../filters/SourceTokensExcludeGroupsFilter.js';

describe('createSourceTokensExcludeGroupsFilter', () => {
  it('should reject token when isSource is false', () => {
    const filter = createSourceTokensExcludeGroupsFilter([]);
    const token = {
      path: ['sn', '01_primitive', 'dimension'],
      isSource: false,
    } as TransformedToken;
    expect(filter.filter(token)).toBe(false);
  });

  it('should pass source token when excludeGroups is empty', () => {
    const filter = createSourceTokensExcludeGroupsFilter([]);
    const token = {
      path: ['sn', '01_primitive', 'dimension'],
      isSource: true,
    } as TransformedToken;
    expect(filter.filter(token)).toBe(true);
  });

  it('should exclude source token when path contains excluded group', () => {
    const filter = createSourceTokensExcludeGroupsFilter(['06_acrylic']);
    const token = {
      path: ['sn', '06_acrylic', 'no', 'opacity'],
      isSource: true,
    } as TransformedToken;
    expect(filter.filter(token)).toBe(false);
  });
});
