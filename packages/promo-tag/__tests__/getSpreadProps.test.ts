import { describe, expect, it, vi } from 'vitest';

import { getSpreadProps } from '../src/PromoTag/utils';

describe('getSpreadProps', () => {
  describe("Component === 'a'", () => {
    it('uses onClick from the argument, not from rest', () => {
      const restOnClick = vi.fn();
      const passedOnClick = vi.fn();

      const result = getSpreadProps({
        Component: 'a',
        rest: {
          href: 'https://example.com',
          target: '_blank',
          onClick: restOnClick,
        },
        onClick: passedOnClick,
      });

      expect(result.onClick).toBe(passedOnClick);
      expect(result.onClick).not.toBe(restOnClick);
    });

    it("adds rel='noopener noreferrer' when target is _blank", () => {
      const result = getSpreadProps({
        Component: 'a',
        rest: { href: 'https://example.com', target: '_blank' },
      });

      expect(result.href).toBe('https://example.com');
      expect(result.target).toBe('_blank');
      expect(result.rel).toBe('noopener noreferrer');
    });

    it("defaults href to '#' when missing", () => {
      const result = getSpreadProps({
        Component: 'a',
        rest: { target: '_self' },
      });

      expect(result.href).toBe('#');
      expect(result.rel).toBeUndefined();
    });
  });

  describe("Component === 'button'", () => {
    it('uses onClick from the argument, not from rest', () => {
      const restOnClick = vi.fn();
      const passedOnClick = vi.fn();

      const result = getSpreadProps({
        Component: 'button',
        rest: { type: 'submit', onClick: restOnClick },
        onClick: passedOnClick,
      });

      expect(result.onClick).toBe(passedOnClick);
      expect(result.type).toBe('submit');
    });
  });
});
