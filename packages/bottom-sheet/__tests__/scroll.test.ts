import { describe, expect, it } from 'vitest';

import { isScrolledToBottom, isScrolledToTop } from '../src/components/BottomSheetCustom/utils/scroll';

// Чистые предикаты читают только scrollTop/scrollHeight/clientHeight — мокаем их объектом.
// `findScrollableAncestor` зависит от реального DOM-layout (getComputedStyle + scrollHeight),
// поэтому покрывается e2e (swipe.spec «drag started inside a scrolled body yields to scroll»).
const el = (scrollTop: number, scrollHeight: number, clientHeight: number): HTMLElement =>
  ({ scrollTop, scrollHeight, clientHeight }) as unknown as HTMLElement;

describe('isScrolledToTop', () => {
  it('true at the very top', () => {
    expect(isScrolledToTop(el(0, 1000, 200))).toBe(true);
  });

  it('true for negative overscroll (iOS rubber-band)', () => {
    expect(isScrolledToTop(el(-5, 1000, 200))).toBe(true);
  });

  it('false once scrolled down', () => {
    expect(isScrolledToTop(el(1, 1000, 200))).toBe(false);
    expect(isScrolledToTop(el(120, 1000, 200))).toBe(false);
  });
});

describe('isScrolledToBottom', () => {
  it('true at the very bottom', () => {
    expect(isScrolledToBottom(el(800, 1000, 200))).toBe(true);
  });

  it('true within a 1px subpixel tolerance', () => {
    expect(isScrolledToBottom(el(799, 1000, 200))).toBe(true);
  });

  it('false in the middle', () => {
    expect(isScrolledToBottom(el(400, 1000, 200))).toBe(false);
  });

  it('true when the element is not scrollable', () => {
    expect(isScrolledToBottom(el(0, 200, 200))).toBe(true);
  });
});
