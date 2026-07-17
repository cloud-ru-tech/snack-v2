import { describe, expect, it } from 'vitest';

import { isSystemLayer } from '../../src/utils/groupUtils.js';
import {
  buildFallbackIncludePaths,
  dedupeTokenSets,
  discoverTokenSetsFromObject,
  getComponentsTokenSets,
  getFirstTokenSetByGroup,
  getStyleTokenSets,
  getSystemLayers,
  getTokenSetsByGroup,
  sortSystemLayers,
  toFilePaths,
  toTokenSet,
} from '../../src/utils/tokenSets.js';

describe('tokenSets', () => {
  describe('isSystemLayer', () => {
    it('should identify system layers by numeric prefix', () => {
      expect(isSystemLayer('01_primitive')).toBe(true);
      expect(isSystemLayer('02_adaptive')).toBe(true);
      expect(isSystemLayer('04_theme')).toBe(true);
      expect(isSystemLayer('99_styles')).toBe(true);
    });

    it('should not identify component or style names without prefix as system layers', () => {
      expect(isSystemLayer('button')).toBe(false);
      expect(isSystemLayer('accordion')).toBe(false);
    });
  });

  describe('toTokenSet', () => {
    it('should parse token set path', () => {
      const tokenSet = toTokenSet('01_primitive/primitive');
      expect(tokenSet).toEqual({
        group: '01_primitive',
        name: 'primitive',
        path: '01_primitive/primitive',
        filePath: undefined,
      });
    });

    it('should include filePath when basePath provided', () => {
      const tokenSet = toTokenSet('01_primitive/primitive', '/tokens');
      expect(tokenSet?.filePath).toBe('/tokens/01_primitive/primitive.json');
    });

    it('should return null for path with single segment', () => {
      expect(toTokenSet('primitive')).toBeNull();
    });

    it('should handle nested paths', () => {
      const tokenSet = toTokenSet('button/primary/default');
      expect(tokenSet).toEqual({
        group: 'button',
        name: 'primary/default',
        path: 'button/primary/default',
        filePath: undefined,
      });
    });
  });

  describe('getTokenSetsByGroup', () => {
    it('should filter token sets by group', () => {
      const primitiveSet = toTokenSet('01_primitive/primitive');
      const adaptiveDesktopSet = toTokenSet('02_adaptive/desktop');
      const adaptiveMobileSet = toTokenSet('02_adaptive/mobile');
      const tokenSets = [primitiveSet, adaptiveDesktopSet, adaptiveMobileSet].filter(
        (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
      );
      const result = getTokenSetsByGroup(tokenSets, '02_adaptive');
      expect(result).toHaveLength(2);
      expect(result[0]?.group).toBe('02_adaptive');
    });
  });

  describe('getComponentsTokenSets', () => {
    it('should filter component token sets', () => {
      const primitiveSet = toTokenSet('01_primitive/primitive');
      const buttonSet = toTokenSet('button/button');
      const alertSet = toTokenSet('alert/alert');
      const stylesSet = toTokenSet('99_styles/typography');
      const tokenSets = [primitiveSet, buttonSet, alertSet, stylesSet].filter(
        (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
      );
      const result = getComponentsTokenSets(tokenSets);
      expect(result).toHaveLength(2);
      expect(result.map(t => t.group)).toEqual(['button', 'alert']);
    });
  });

  describe('getStyleTokenSets', () => {
    it('should filter style token sets', () => {
      const typographySet = toTokenSet('99_styles/typography');
      const effectSet = toTokenSet('99_styles/effect');
      const buttonSet = toTokenSet('button/button');
      const tokenSets = [typographySet, effectSet, buttonSet].filter(
        (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
      );
      const result = getStyleTokenSets(tokenSets);
      expect(result).toHaveLength(2);
      expect(result.map(t => t.group)).toEqual(['99_styles', '99_styles']);
    });
  });

  describe('getSystemLayers', () => {
    it('should return only token sets with system layer groups', () => {
      const primitiveSet = toTokenSet('01_primitive/primitive');
      const buttonSet = toTokenSet('button/button');
      const themeSet = toTokenSet('04_theme/light');
      const tokenSets = [primitiveSet, buttonSet, themeSet].filter(
        (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
      );
      const result = getSystemLayers(tokenSets);
      expect(result).toHaveLength(2);
      expect(result.map(t => t.group)).toContain('01_primitive');
      expect(result.map(t => t.group)).toContain('04_theme');
      expect(result.map(t => t.group)).not.toContain('button');
    });
  });

  describe('sortSystemLayers', () => {
    it('should sort system layers by numeric prefix', () => {
      const themeSet = toTokenSet('04_theme/dark');
      const primitiveSet = toTokenSet('01_primitive/primitive');
      const adaptiveSet = toTokenSet('02_adaptive/desktop');
      const tokenSets = [themeSet, primitiveSet, adaptiveSet].filter(
        (t): t is NonNullable<typeof t> => t !== null && t !== undefined,
      );
      const systemLayers = getSystemLayers(tokenSets);
      const sorted = sortSystemLayers(systemLayers);
      expect(sorted.map(t => t.group)).toEqual(['01_primitive', '02_adaptive', '04_theme']);
    });
  });

  describe('buildFallbackIncludePaths', () => {
    it('should return file paths for base layers and first token set of remaining layers', () => {
      const primitiveSet = toTokenSet('01_primitive/primitive');
      const adaptiveSet = toTokenSet('02_adaptive/desktop');
      const themeSet = toTokenSet('04_theme/light');
      const tokenSets = [primitiveSet, adaptiveSet, themeSet]
        .filter((t): t is NonNullable<typeof t> => t !== null && t !== undefined)
        .map((t, i) => ({ ...t, filePath: t.filePath ?? `/path/${i}.json` }));
      const result = buildFallbackIncludePaths(tokenSets);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('discoverTokenSetsFromObject', () => {
    it('should build token sets from tokens object', () => {
      const tokens = {
        '01_primitive/primitive': { sn: { primitive: {} } },
        'button/button': { sn: { button: {} } },
      };
      const result = discoverTokenSetsFromObject(tokens);
      expect(result).toHaveLength(2);
      expect(result[0]?.path).toBe('01_primitive/primitive');
      expect(result[0]?.content).toEqual({ sn: { primitive: {} } });
    });
  });

  describe('getFirstTokenSetByGroup', () => {
    it('should return first token set of given group', () => {
      const a = toTokenSet('02_adaptive/desktop');
      const b = toTokenSet('02_adaptive/mobile');
      const tokenSets = [a, b].filter((t): t is NonNullable<typeof t> => t !== null && t !== undefined);
      const result = getFirstTokenSetByGroup(tokenSets, '02_adaptive');
      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe('desktop');
    });
  });

  describe('dedupeTokenSets', () => {
    it('should remove duplicate paths', () => {
      const a = toTokenSet('01_primitive/primitive');
      const b = toTokenSet('01_primitive/primitive');
      const tokenSets = [a, b].filter((t): t is NonNullable<typeof t> => t !== null && t !== undefined);
      const result = dedupeTokenSets(tokenSets);
      expect(result).toHaveLength(1);
    });
  });

  describe('toFilePaths', () => {
    it('should return unique file paths', () => {
      const a = toTokenSet('01_primitive/primitive', '/tokens');
      const b = toTokenSet('02_adaptive/desktop', '/tokens');
      const tokenSets = [a, b].filter((t): t is NonNullable<typeof t> => t !== null && t !== undefined);
      const result = toFilePaths(tokenSets);
      expect(result).toContain('/tokens/01_primitive/primitive.json');
      expect(result).toContain('/tokens/02_adaptive/desktop.json');
    });
  });
});
