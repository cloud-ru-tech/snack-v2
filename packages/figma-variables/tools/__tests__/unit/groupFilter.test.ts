import type { TransformedToken } from 'style-dictionary';
import { describe, expect, it } from 'vitest';

import { createGroupFilter } from '../../filters/GroupFilter.js';

describe('createGroupFilter', () => {
  it('should return filter that accepts token from given group', () => {
    const filter = createGroupFilter('02_adaptive');
    const token = {
      path: ['sn', '02_adaptive', 'desktop', 'size', 'xs'],
      isSource: true,
    } as TransformedToken;
    expect(filter.filter(token)).toBe(true);
  });

  it('should return filter that rejects token from other group', () => {
    const filter = createGroupFilter('02_adaptive');
    const token = {
      path: ['sn', 'button', 'primary', 'color'],
      isSource: true,
    } as TransformedToken;
    expect(filter.filter(token)).toBe(false);
  });

  it('should reject token when path has less than 2 segments', () => {
    const filter = createGroupFilter('02_adaptive');
    const token = { path: ['sn'], isSource: true } as TransformedToken;
    expect(filter.filter(token)).toBe(false);
  });

  it('should filter by tokenSetName when provided', () => {
    const filter = createGroupFilter('99_styles', 'typography');
    const matchingToken = {
      path: ['sn', '99_styles', 'typography', 'body', 'm'],
      isSource: true,
    } as TransformedToken;
    const nonMatchingToken = {
      path: ['sn', '99_styles', 'effect', 'shadow', 's'],
      isSource: true,
    } as TransformedToken;
    expect(filter.filter(matchingToken)).toBe(true);
    expect(filter.filter(nonMatchingToken)).toBe(false);
  });
});
