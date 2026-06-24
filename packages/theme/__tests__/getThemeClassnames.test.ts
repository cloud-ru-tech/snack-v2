import { describe, expect, it } from 'vitest';

import { getThemeClassnames } from '../src/utils/getThemeClassnames';

describe('getThemeClassnames', () => {
  it('всегда эмитит базовые слои + sn-no по умолчанию', () => {
    const classes = getThemeClassnames().split(' ');

    expect(classes).toEqual(
      expect.arrayContaining(['sn-primitive', 'sn-base-styles', 'sn-figmaStyles', 'sn-components', 'sn-no']),
    );
    expect(classes).not.toContain('sn-yes');
    expect(classes.some(c => c === 'sn-light' || c === 'sn-dark')).toBe(false);
  });

  it('добавляет классы только для заданных осей', () => {
    const classes = getThemeClassnames({
      colorScheme: 'dark',
      brand: 'brandC',
      brandRole: 'alter2',
      density: 'comfort',
    }).split(' ');

    expect(classes).toEqual(expect.arrayContaining(['sn-dark', 'sn-brandC', 'sn-alter2', 'sn-comfort']));
  });

  it('acrylic=true → sn-yes, иначе sn-no', () => {
    expect(getThemeClassnames({ acrylic: true }).split(' ')).toContain('sn-yes');
    expect(getThemeClassnames({ acrylic: false }).split(' ')).toContain('sn-no');
  });
});
