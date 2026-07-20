import { describe, expect, it } from 'vitest';

import {
  compareSystemLayers,
  extractLayerNumber,
  getBaseLayers,
  getDirectoryName,
  getNonBaseLayers,
  isBaseLayer,
  isComponentGroup,
  isStylesGroup,
  isSystemLayer,
  shouldExcludeFromValidation,
} from '../../utils/groupUtils.js';

describe('groupUtils', () => {
  describe('isSystemLayer', () => {
    it('should return true for groups with numeric prefix', () => {
      expect(isSystemLayer('01_primitive')).toBe(true);
      expect(isSystemLayer('99_styles')).toBe(true);
    });

    it('should return false for groups without numeric prefix', () => {
      expect(isSystemLayer('button')).toBe(false);
    });
  });

  describe('isStylesGroup', () => {
    it('should return true when group name contains styles', () => {
      expect(isStylesGroup('99_styles')).toBe(true);
    });

    it('should return false when group name does not contain styles', () => {
      expect(isStylesGroup('01_primitive')).toBe(false);
    });
  });

  describe('isComponentGroup', () => {
    it('should return true when group is neither system nor styles', () => {
      expect(isComponentGroup('button')).toBe(true);
    });

    it('should return false for system layer', () => {
      expect(isComponentGroup('01_primitive')).toBe(false);
    });

    it('should return false for styles group', () => {
      expect(isComponentGroup('99_styles')).toBe(false);
    });
  });

  describe('extractLayerNumber', () => {
    it('should extract numeric prefix from group name', () => {
      expect(extractLayerNumber('01_primitive')).toBe(1);
      expect(extractLayerNumber('99_styles')).toBe(99);
    });

    it('should return null when group has no numeric prefix', () => {
      expect(extractLayerNumber('button')).toBeNull();
    });
  });

  describe('compareSystemLayers', () => {
    it('should return negative when first group has smaller layer number', () => {
      expect(compareSystemLayers('01_primitive', '02_adaptive')).toBeLessThan(0);
    });

    it('should return positive when first group has greater layer number', () => {
      expect(compareSystemLayers('04_theme', '02_adaptive')).toBeGreaterThan(0);
    });

    it('should return 0 when both groups have same layer number', () => {
      expect(compareSystemLayers('01_primitive', '01_other')).toBe(0);
    });

    it('should treat non-system group as greater than system group', () => {
      expect(compareSystemLayers('button', '01_primitive')).toBe(1);
      expect(compareSystemLayers('01_primitive', 'button')).toBe(-1);
    });
  });

  describe('getDirectoryName', () => {
    it('should remove numeric prefix and lowercase', () => {
      expect(getDirectoryName('01_primitive')).toBe('primitive');
      expect(getDirectoryName('99_styles')).toBe('styles');
    });
  });

  describe('isBaseLayer', () => {
    it('should return true when group is in base layers range', () => {
      const allSystemLayers = ['01_primitive', '02_adaptive', '03_brand', '04_theme'];
      expect(isBaseLayer('01_primitive', allSystemLayers)).toBe(true);
      expect(isBaseLayer('02_adaptive', allSystemLayers)).toBe(true);
    });

    it('should return false when group is not in base layers range', () => {
      const allSystemLayers = ['01_primitive', '02_adaptive', '03_brand', '04_theme'];
      expect(isBaseLayer('03_brand', allSystemLayers)).toBe(false);
    });
  });

  describe('getBaseLayers', () => {
    it('should return first two system layers', () => {
      const systemLayers = ['01_primitive', '02_adaptive', '03_brand'];
      expect(getBaseLayers(systemLayers)).toEqual(['01_primitive', '02_adaptive']);
    });
  });

  describe('getNonBaseLayers', () => {
    it('should return system layers after base range', () => {
      const systemLayers = ['01_primitive', '02_adaptive', '03_brand', '04_theme'];
      expect(getNonBaseLayers(systemLayers)).toEqual(['03_brand', '04_theme']);
    });
  });

  describe('shouldExcludeFromValidation', () => {
    it('should return true for system layer when excludeSystemLayers is true', () => {
      expect(shouldExcludeFromValidation('01_primitive', true, true)).toBe(true);
    });

    it('should return true for styles group when excludeStylesLayer is true', () => {
      expect(shouldExcludeFromValidation('99_styles', false, true)).toBe(true);
    });

    it('should return false for component group when both exclusions are true', () => {
      expect(shouldExcludeFromValidation('button', true, true)).toBe(false);
    });

    it('should return false for system layer when excludeSystemLayers is false', () => {
      expect(shouldExcludeFromValidation('01_primitive', false, true)).toBe(false);
    });
  });
});
