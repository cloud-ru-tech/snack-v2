import { describe, expect, it } from 'vitest';

import { SPECIAL_CHARS } from '../src/constants/specialChars';
import { interpolateTranslation } from '../src/utils/interpolateTranslation';

describe('interpolateTranslation', () => {
  it('replaces user placeholders (string and number)', () => {
    expect(interpolateTranslation('Hello {{who}}', { who: 'Kenobi' })).toBe('Hello Kenobi');
    expect(interpolateTranslation('{{zero}}, {{three}}', { zero: 0, three: 3 })).toBe('0, 3');
  });

  it('keeps placeholder intact when value is empty or undefined', () => {
    expect(interpolateTranslation('{{a}}/{{b}}', { a: '' })).toBe('{{a}}/{{b}}');
  });

  it('substitutes reserved special-char tokens without an interpolation object', () => {
    expect(interpolateTranslation('Итого{{nbsp}}—{{nbsp}}сумма')).toBe(
      `Итого${SPECIAL_CHARS.nbsp}—${SPECIAL_CHARS.nbsp}сумма`,
    );
    expect(interpolateTranslation('A{{mdash}}B{{hellip}}')).toBe(`A${SPECIAL_CHARS.mdash}B${SPECIAL_CHARS.hellip}`);
    expect(interpolateTranslation('line1{{newline}}line2')).toBe('line1\nline2');
  });

  it('mixes special-char tokens with user interpolation', () => {
    expect(interpolateTranslation('{{price}}{{nnbsp}}₽', { price: 100 })).toBe(`100${SPECIAL_CHARS.nnbsp}₽`);
  });

  it('reserved token wins over a user value of the same name', () => {
    expect(interpolateTranslation('{{nbsp}}', { nbsp: 'X' })).toBe(SPECIAL_CHARS.nbsp);
  });
  it('returns original text when there are no placeholders', () => {
    expect(interpolateTranslation('No placeholders here', { nothing: 'to replace' })).toBe('No placeholders here');
  });
});
