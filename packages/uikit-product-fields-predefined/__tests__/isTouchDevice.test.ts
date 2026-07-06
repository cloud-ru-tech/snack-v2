// Импорт напрямую из src, минуя entry @ds/uikit-product-fields-predefined:
// entry тянет CSS-модули, ломает node-окружение vitest.
import { describe, expect, it } from 'vitest';

import { isTouchDevice } from '../src/helpers/isTouchDevice';

describe('isTouchDevice', () => {
  it('returns true for mobile layout', () => {
    expect(isTouchDevice('mobile')).toBe(true);
  });

  it('returns true for tablet layout', () => {
    expect(isTouchDevice('tablet')).toBe(true);
  });

  it('returns false for desktop layout', () => {
    expect(isTouchDevice('desktop')).toBe(false);
  });
});
