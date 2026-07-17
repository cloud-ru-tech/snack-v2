import { describe, expect, it } from 'vitest';

import {
  isBoxShadowToken,
  isColorToken,
  isColorValue,
  isCompositeToken,
  isTextToken,
} from '../../src/utils/tokenType.js';

describe('tokenType', () => {
  describe('isBoxShadowToken', () => {
    it('should return true when token $type is boxShadow', () => {
      expect(isBoxShadowToken({ $type: 'boxShadow' })).toBe(true);
    });

    it('should return true when token type is shadow', () => {
      expect(isBoxShadowToken({ type: 'shadow' })).toBe(true);
    });

    it('should return false when token type is color', () => {
      expect(isBoxShadowToken({ $type: 'color' })).toBe(false);
    });

    it('should return false when token has no type', () => {
      expect(isBoxShadowToken({})).toBe(false);
    });
  });

  describe('isCompositeToken', () => {
    it('should return true for boxShadow type', () => {
      expect(isCompositeToken({ $type: 'boxShadow' })).toBe(true);
    });

    it('should return true for typography type', () => {
      expect(isCompositeToken({ $type: 'typography' })).toBe(true);
    });

    it('should return true for composition type', () => {
      expect(isCompositeToken({ $type: 'composition' })).toBe(true);
    });

    it('should return false for color type', () => {
      expect(isCompositeToken({ $type: 'color' })).toBe(false);
    });

    it('should return false when token has no type', () => {
      expect(isCompositeToken({})).toBe(false);
    });
  });

  describe('isTextToken', () => {
    it('should return true when $type is text', () => {
      expect(isTextToken({ $type: 'text' })).toBe(true);
    });

    it('should return true when path and name contain text', () => {
      expect(isTextToken({ path: ['sn', 'language', 'title'], name: 'text' })).toBe(true);
    });

    it('should return false when type is not text and path does not contain text', () => {
      expect(isTextToken({ $type: 'color', path: ['sn', 'primitive'], name: 'gray' })).toBe(false);
    });
  });

  describe('isColorToken', () => {
    it('should return true when $type is color', () => {
      expect(isColorToken({ $type: 'color' })).toBe(true);
    });

    it('should return false when $type is not color', () => {
      expect(isColorToken({ $type: 'dimension' })).toBe(false);
    });
  });

  describe('isColorValue', () => {
    it('should return true for hex color', () => {
      expect(isColorValue('#fff')).toBe(true);
      expect(isColorValue('#ffffff')).toBe(true);
      expect(isColorValue('#abc')).toBe(true);
    });

    it('should return true for rgb/rgba', () => {
      expect(isColorValue('rgb(255, 255, 255)')).toBe(true);
      expect(isColorValue('rgba(255, 255, 255, 0.5)')).toBe(true);
    });

    it('should return true for hsl/hsla', () => {
      expect(isColorValue('hsl(0, 0%, 100%)')).toBe(true);
      expect(isColorValue('hsla(0, 0%, 100%, 0.5)')).toBe(true);
    });

    it('should return true for named colors', () => {
      expect(isColorValue('transparent')).toBe(true);
      expect(isColorValue('black')).toBe(true);
      expect(isColorValue('White')).toBe(true);
    });

    it('should return false for non-string value', () => {
      expect(isColorValue(123)).toBe(false);
      expect(isColorValue(null)).toBe(false);
    });

    it('should return false for non-color string', () => {
      expect(isColorValue('16px')).toBe(false);
      expect(isColorValue('sans-serif')).toBe(false);
    });
  });
});
