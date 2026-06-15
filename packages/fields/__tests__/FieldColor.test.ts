import { describe, expect, it } from 'vitest';

// Импорт из leaf-файла, а не барреля: баррель тянет CSS-модули и ломает vitest в node.
import { normalizeHexInput } from '../src/components/FieldColor/utils';

describe('FieldColor — normalizeHexInput', () => {
  it('strips non-hex characters and always prepends a single leading hash', () => {
    expect(normalizeHexInput('#1234ffff')).toBe('#1234ffff');
    // Внутренний `#` и не-hex символы отбрасываются, ведущая `#` добавляется всегда.
    expect(normalizeHexInput('12xyz#34GH!!ffff')).toBe('#1234ffff');
  });

  it('keeps a valid #rrggbb value unchanged (round-trip)', () => {
    expect(normalizeHexInput('#ff5722')).toBe('#ff5722');
  });

  it('keeps a valid #rrggbbaa value unchanged (round-trip)', () => {
    expect(normalizeHexInput('#ff572280')).toBe('#ff572280');
  });

  it('caps the hex DIGIT count at 8 (rrggbbaa) with alpha, prepending the mandatory #', () => {
    expect(normalizeHexInput('#ff572280aa')).toBe('#ff572280');
    expect(normalizeHexInput('123456789abcdef')).toBe('#12345678');
  });

  it('caps the hex DIGIT count at 6 (rrggbb) without alpha', () => {
    expect(normalizeHexInput('#ff572280', false)).toBe('#ff5722');
    expect(normalizeHexInput('123456789abcdef', false)).toBe('#123456');
  });

  it('removes spaces, punctuation and non-hex letters', () => {
    expect(normalizeHexInput('  #ab cd ef ')).toBe('#abcdef');
    // `b` из `rgb(` — валидная hex-цифра, остаётся.
    expect(normalizeHexInput('rgb(255,0,0)')).toBe('#b25500');
  });

  it('returns an empty string for input without any hex chars (clearable field)', () => {
    expect(normalizeHexInput('')).toBe('');
    expect(normalizeHexInput('z z z')).toBe('');
    // Одинокая решётка без цифр — тоже пусто (нельзя оставить «голый» #).
    expect(normalizeHexInput('#')).toBe('');
  });

  it('collapses multiple leading hashes to a single one', () => {
    expect(normalizeHexInput('##abc')).toBe('#abc');
  });
});
