import { describe, expect, it } from 'vitest';

import { FILE_EXTENSIONS } from '../../src/constants/index.js';
import {
  ensureExtension,
  getFileNameWithoutExtension,
  hasExtension,
  isSpecialFile,
  joinPath,
  normalizeTokenPath,
  removeExtension,
  splitTokenPath,
} from '../../src/utils/pathUtils.js';

describe('pathUtils', () => {
  describe('removeExtension', () => {
    it('should remove default .json extension from path', () => {
      expect(removeExtension('tokens/01_primitive/primitive.json')).toBe('tokens/01_primitive/primitive');
    });

    it('should remove specified extension from path', () => {
      expect(removeExtension('style.css', FILE_EXTENSIONS.CSS)).toBe('style');
    });
  });

  describe('ensureExtension', () => {
    it('should append extension when path does not end with it', () => {
      expect(ensureExtension('tokens/primitive', '.json')).toBe('tokens/primitive.json');
    });

    it('should not duplicate extension when path already has it', () => {
      expect(ensureExtension('tokens/primitive.json', '.json')).toBe('tokens/primitive.json');
    });
  });

  describe('hasExtension', () => {
    it('should return true when filename ends with extension', () => {
      expect(hasExtension('primitive.json', '.json')).toBe(true);
    });

    it('should return false when filename does not end with extension', () => {
      expect(hasExtension('primitive.json', '.css')).toBe(false);
    });
  });

  describe('normalizeTokenPath', () => {
    it('should remove leading ./ and .json extension', () => {
      expect(normalizeTokenPath('./01_primitive/primitive.json')).toBe('01_primitive/primitive');
    });
  });

  describe('splitTokenPath', () => {
    it('should split normalized path by slash', () => {
      expect(splitTokenPath('01_primitive/primitive.json')).toEqual(['01_primitive', 'primitive']);
    });
  });

  describe('joinPath', () => {
    it('should join parts without extension when extension not provided', () => {
      expect(joinPath(['01_primitive', 'primitive'])).toBe('01_primitive/primitive');
    });

    it('should join parts and ensure extension when provided', () => {
      expect(joinPath(['01_primitive', 'primitive'], '.json')).toBe('01_primitive/primitive.json');
    });
  });

  describe('isSpecialFile', () => {
    it('should return true for filename starting with $', () => {
      expect(isSpecialFile('$metadata.json')).toBe(true);
    });

    it('should return false for normal filename', () => {
      expect(isSpecialFile('primitive.json')).toBe(false);
    });
  });

  describe('getFileNameWithoutExtension', () => {
    it('should return last path segment without extension', () => {
      expect(getFileNameWithoutExtension('01_primitive/primitive.json')).toBe('primitive');
    });
  });
});
