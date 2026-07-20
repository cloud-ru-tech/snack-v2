import { describe, expect, it } from 'vitest';

import { CIMODE, LANG, translate } from '../src';

const DICT = {
  apply: 'Применить',
  nested: { deep: { key: 'Значение' } },
  greeting: 'Привет {{name}}',
};

describe('cimode', () => {
  it('CIMODE / LANG.Cimode = "cimode"', () => {
    expect(CIMODE).toBe('cimode');
    expect(LANG.Cimode).toBe('cimode');
  });

  it('translate в cimode возвращает сам ключ (плоский и dotted)', () => {
    expect(translate(DICT, 'apply', CIMODE)).toBe('apply');
    expect(translate(DICT, 'nested.deep.key', CIMODE)).toBe('nested.deep.key');
  });

  it('translate в cimode не интерполирует и не резолвит значение', () => {
    expect(translate(DICT, 'greeting', CIMODE, { name: 'Аня' })).toBe('greeting');
    // Ключа нет в словаре — в cimode всё равно возвращается сам ключ, без dev-warn о ненайденном.
    expect(translate(DICT, 'missing.key', CIMODE)).toBe('missing.key');
  });

  it('обычный язык не задет cimode-гейтом', () => {
    expect(translate(DICT, 'apply', 'ru-RU')).toBe('Применить');
    expect(translate(DICT, 'greeting', 'ru-RU', { name: 'Аня' })).toBe('Привет Аня');
  });
});
