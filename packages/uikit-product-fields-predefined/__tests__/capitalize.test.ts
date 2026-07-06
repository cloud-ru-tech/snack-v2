// Импорт напрямую из src, минуя entry @ds/uikit-product-fields-predefined:
// entry тянет CSS-модули, ломает node-окружение vitest.
import { describe, expect, it } from 'vitest';

import { capitalize } from '../src/components/FieldSelectCreate/utils';

describe('capitalize', () => {
  it('uppercases the first letter of a lowercase word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('keeps the rest of the word untouched', () => {
    expect(capitalize('hELLO')).toBe('HELLO');
  });

  it('leaves an already-capitalized word unchanged', () => {
    expect(capitalize('World')).toBe('World');
  });

  it('handles a single character', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('returns an empty string for empty input', () => {
    expect(capitalize('')).toBe('');
  });

  it('does not alter a leading non-letter character', () => {
    expect(capitalize('1abc')).toBe('1abc');
  });
});
