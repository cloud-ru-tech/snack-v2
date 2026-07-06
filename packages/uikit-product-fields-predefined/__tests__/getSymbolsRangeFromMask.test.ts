// Импорт напрямую из src, минуя entry @ds/uikit-product-fields-predefined:
// entry тянет CSS-модули, ломает node-окружение vitest.
import { describe, expect, it } from 'vitest';

import { getSymbolsRangeFromMask } from '../src/helpers/getSymbolsRangeFromMask';

describe('getSymbolsRangeFromMask', () => {
  it('returns zeros for an empty / undefined mask', () => {
    expect(getSymbolsRangeFromMask()).toEqual({ minNumberLength: 0, maxNumberLength: 0 });
    expect(getSymbolsRangeFromMask('')).toEqual({ minNumberLength: 0, maxNumberLength: 0 });
  });

  it('counts X placeholders', () => {
    expect(getSymbolsRangeFromMask('XXX-XX')).toEqual({ minNumberLength: 5, maxNumberLength: 5 });
  });

  it('counts digits in the mask as part of the length', () => {
    expect(getSymbolsRangeFromMask('+7 XXX')).toEqual({ minNumberLength: 4, maxNumberLength: 4 });
  });

  it('excludes bracketed content from the minimum but includes it in the maximum', () => {
    // 3 обязательных X + 2 опциональных X в скобках.
    expect(getSymbolsRangeFromMask('XXX[XX]')).toEqual({ minNumberLength: 3, maxNumberLength: 5 });
  });

  it('ignores non-placeholder separator characters', () => {
    expect(getSymbolsRangeFromMask('XX XX-XX')).toEqual({ minNumberLength: 6, maxNumberLength: 6 });
  });
});
