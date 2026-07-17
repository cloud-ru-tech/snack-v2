import type { TransformedToken } from 'style-dictionary';
import { describe, expect, it } from 'vitest';

import { createExcludeGroupsFilter } from '../../src/filters/ExcludeGroupsFilter.js';

describe('createExcludeGroupsFilter', () => {
  it('should pass all tokens when excludeGroups is empty', () => {
    const filter = createExcludeGroupsFilter([]);
    const token = {
      path: ['sn', '06_acrylic', 'no'],
      filePath: '/tokens/06_acrylic/no.json',
    } as TransformedToken;
    expect(filter.filter(token)).toBe(true);
  });

  it('should exclude token when filePath contains excluded group', () => {
    const filter = createExcludeGroupsFilter(['06_acrylic']);
    const token = {
      path: ['sn', 'acrylic', 'opacity'],
      filePath: '/tokens/06_acrylic/no.json',
    } as TransformedToken;
    expect(filter.filter(token)).toBe(false);
  });

  it('should exclude token when path second segment is excluded group', () => {
    const filter = createExcludeGroupsFilter(['06_acrylic']);
    const token = {
      path: ['sn', '06_acrylic', 'no', 'opacity'],
    } as TransformedToken;
    expect(filter.filter(token)).toBe(false);
  });

  it('should pass token when path is not in excluded groups', () => {
    const filter = createExcludeGroupsFilter(['06_acrylic']);
    const token = {
      path: ['sn', '01_primitive', 'dimension', '16'],
    } as TransformedToken;
    expect(filter.filter(token)).toBe(true);
  });
});
