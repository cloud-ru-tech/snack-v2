import { describe, expect, it } from 'vitest';

import { mergeAppearance } from '../src/utils/mergeAppearance';

describe('mergeAppearance', () => {
  it('переопределяет заданные оси, наследует остальные', () => {
    const parent = { colorScheme: 'dark', brand: 'brandA', density: 'compact' } as const;

    expect(mergeAppearance(parent, { density: 'comfort' })).toEqual({
      colorScheme: 'dark',
      brand: 'brandA',
      brandRole: undefined,
      density: 'comfort',
      acrylic: undefined,
    });
  });

  it('не затирает унаследованную ось значением undefined', () => {
    const parent = { colorScheme: 'dark', density: 'compact' } as const;

    const merged = mergeAppearance(parent, { colorScheme: undefined, brand: 'brandC' });

    expect(merged.colorScheme).toBe('dark');
    expect(merged.brand).toBe('brandC');
  });

  it('acrylic:false как override применяется (не падает в parent)', () => {
    const merged = mergeAppearance({ acrylic: true }, { acrylic: false });

    expect(merged.acrylic).toBe(false);
  });
});
