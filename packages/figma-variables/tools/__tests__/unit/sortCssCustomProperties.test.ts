import { describe, expect, it } from 'vitest';

import { sortCssCustomProperties } from '../../utils/sortCssCustomProperties.js';

describe('sortCssCustomProperties', () => {
  it('should return lines as-is when length <= 1', () => {
    expect(sortCssCustomProperties([])).toEqual([]);
    expect(sortCssCustomProperties(['--foo: 1;'])).toEqual(['--foo: 1;']);
  });

  it('should sort so that dependency is declared before dependant', () => {
    const lines = ['--b: var(--a);', '--a: 10px;'];
    const result = sortCssCustomProperties(lines);
    expect(result[0]).toBe('--a: 10px;');
    expect(result[1]).toBe('--b: var(--a);');
  });

  it('should preserve order when there are no cross-dependencies', () => {
    const lines = ['--a: 1;', '--b: 2;', '--c: 3;'];
    const result = sortCssCustomProperties(lines);
    expect(result).toEqual(lines);
  });

  it('should handle chain of dependencies', () => {
    const lines = ['--c: var(--b);', '--b: var(--a);', '--a: 0;'];
    const result = sortCssCustomProperties(lines);
    expect(result[0]).toBe('--a: 0;');
    expect(result[1]).toBe('--b: var(--a);');
    expect(result[2]).toBe('--c: var(--b);');
  });

  it('should keep non-custom-property lines in stable order', () => {
    const lines = ['.block {', '  --b: var(--a);', '  --a: 1;', '}'];
    const result = sortCssCustomProperties(lines);
    expect(result).toContain('.block {');
    expect(result).toContain('}');
    const aIndex = result.indexOf('  --a: 1;');
    const bIndex = result.indexOf('  --b: var(--a);');
    expect(aIndex).toBeLessThan(bIndex);
  });

  it('should handle cycle by appending remaining in original order', () => {
    const lines = ['--a: var(--b);', '--b: var(--a);'];
    const result = sortCssCustomProperties(lines);
    expect(result).toHaveLength(2);
    expect(result).toContain('--a: var(--b);');
    expect(result).toContain('--b: var(--a);');
  });
});
