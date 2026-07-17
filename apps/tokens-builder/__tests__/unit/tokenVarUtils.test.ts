import { describe, expect, it } from 'vitest';

import {
  getTokenReferencePath,
  getVariableNameFromToken,
  isNumericString,
  pathToVarName,
  replaceInlineReferences,
} from '../../src/utils/tokenVarUtils.js';

describe('tokenVarUtils', () => {
  describe('pathToVarName', () => {
    it('should join array path with hyphen', () => {
      expect(pathToVarName(['sn', 'primitive', 'dimension', '16'])).toBe('sn-primitive-dimension-16');
    });

    it('should replace dots with hyphens for string path', () => {
      expect(pathToVarName('sn.primitive.dimension.16')).toBe('sn-primitive-dimension-16');
    });

    it('should trim string path', () => {
      expect(pathToVarName('  sn.primitive  ')).toBe('sn-primitive');
    });
  });

  describe('getVariableNameFromToken', () => {
    it('should use path when available', () => {
      expect(getVariableNameFromToken({ path: ['sn', 'primitive', 'color'] })).toBe('sn-primitive-color');
    });

    it('should fallback to key when path is empty', () => {
      expect(getVariableNameFromToken({ key: 'myToken' })).toBe('my-token');
    });

    it('should fallback to name when path and key are missing', () => {
      expect(getVariableNameFromToken({ name: 'sn-primitive-color' })).toBe('sn-primitive-color');
    });
  });

  describe('getTokenReferencePath', () => {
    it('should extract path from single reference string', () => {
      expect(getTokenReferencePath('{sn.primitive.dimension.16}')).toBe('sn.primitive.dimension.16');
    });

    it('should return null for non-reference string', () => {
      expect(getTokenReferencePath('#fff')).toBeNull();
      expect(getTokenReferencePath('16px')).toBeNull();
    });

    it('should return null for non-string value', () => {
      expect(getTokenReferencePath(123)).toBeNull();
    });

    it('should trim string before matching', () => {
      expect(getTokenReferencePath('  {sn.primitive.color}  ')).toBe('sn.primitive.color');
    });
  });

  describe('isNumericString', () => {
    it('should return true for numeric string', () => {
      expect(isNumericString('16')).toBe(true);
      expect(isNumericString('  72  ')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(isNumericString('')).toBe(false);
    });

    it('should return false for non-numeric string', () => {
      expect(isNumericString('16px')).toBe(false);
      expect(isNumericString('abc')).toBe(false);
    });
  });

  describe('replaceInlineReferences', () => {
    it('should replace single reference with var()', () => {
      expect(replaceInlineReferences('var(--sn-primitive, {sn.primitive.dimension.8})')).toBe(
        'var(--sn-primitive, var(--sn-primitive-dimension-8))',
      );
    });

    it('should replace multiple references', () => {
      const value = '{sn.primitive.dimension.8} and {sn.primitive.color.gray}';
      expect(replaceInlineReferences(value)).toBe('var(--sn-primitive-dimension-8) and var(--sn-primitive-color-gray)');
    });
  });
});
