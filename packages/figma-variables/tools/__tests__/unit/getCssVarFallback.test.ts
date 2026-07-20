import { describe, expect, it } from 'vitest';

import { getCssVarFallback } from '../../utils/getCssVarFallback.js';

describe('getCssVarFallback', () => {
  it('should return opacity value divided by 100 for opacity variable names', () => {
    const token = {
      $type: 'number',
      $value: 100,
      path: ['sn', 'acrylic', 'opacityBackground'],
      original: { $value: 100 },
    };
    const result = getCssVarFallback({
      token: token as Parameters<typeof getCssVarFallback>[0]['token'],
      variableName: 'sn-acrylic-opacityBackground',
    });
    expect(result).toBe(1);
  });

  it('should return 0.8 for opacity 80', () => {
    const token = {
      $type: 'number',
      $value: 80,
      original: { $value: 80 },
    };
    const result = getCssVarFallback({
      token: token as Parameters<typeof getCssVarFallback>[0]['token'],
      variableName: 'sn-theme-effect-acrylic-opacity',
    });
    expect(result).toBe(0.8);
  });

  it('should return numeric string opacity divided by 100', () => {
    const token = {
      $type: 'number',
      $value: '50',
      original: { $value: '50' },
    };
    const result = getCssVarFallback({
      token: token as Parameters<typeof getCssVarFallback>[0]['token'],
      variableName: 'sn-some-opacity-value',
    });
    expect(result).toBe(0.5);
  });

  it('should not convert to opacity scale for non-opacity variable names', () => {
    const token = {
      $type: 'number',
      $value: 16,
      original: { $value: 16 },
    };
    const result = getCssVarFallback({
      token: token as Parameters<typeof getCssVarFallback>[0]['token'],
      variableName: 'sn-primitive-font-fontSize-16',
    });
    expect(result).toBe('16px');
  });

  describe('VARIABLES_WITHOUT_PX (font-weight, letter-spacing, etc.) — no px in fallback', () => {
    it('should return font-weight value as number without px (variableName with fontWeightValue in path)', () => {
      const token = {
        $type: 'number',
        $value: 650,
        path: ['sn', 'primitive', 'font', 'fontWeightValue', '650'],
        original: { $value: 650, $type: 'number' },
      };
      const result = getCssVarFallback({
        token: token as Parameters<typeof getCssVarFallback>[0]['token'],
        variableName: 'sn-primitive-font-fontWeightValue-650',
      });
      expect(result).toBe(650);
      expect(typeof result).toBe('number');
    });

    it('should return font-weight value without px when $value is string (numeric string, no px)', () => {
      const token = {
        $type: 'number',
        $value: '550',
        original: { $value: '550' },
      };
      const result = getCssVarFallback({
        token: token as Parameters<typeof getCssVarFallback>[0]['token'],
        variableName: 'sn-primitive-font-fontWeightValue-550',
      });
      expect(Number(result)).toBe(550);
      expect(String(result)).not.toContain('px');
    });

    it('should add px for letter-spacing variable', () => {
      const token = {
        $type: 'number',
        $value: 0.5,
        original: { $value: 0.5 },
      };
      const result = getCssVarFallback({
        token: token as Parameters<typeof getCssVarFallback>[0]['token'],
        variableName: 'sn-primitive-font-letterSpacing-050',
      });
      expect(result).toBe('0.5px');
      expect(String(result)).toContain('px');
    });
  });

  it('should return color as-is', () => {
    const token = {
      $type: 'color',
      $value: '#5e606e',
      original: { $value: '#5e606e' },
    };
    const result = getCssVarFallback({
      token: token as Parameters<typeof getCssVarFallback>[0]['token'],
      variableName: 'sn-primitive-color-gray-45',
    });
    expect(result).toBe('#5e606e');
  });

  describe('dimension with string numeric $value (token format: $value as string)', () => {
    it('should return "16px" when $value is string "16" for dimension variable', () => {
      const token = {
        $type: 'number',
        $value: '16',
        path: ['sn', 'primitive', 'dimension', '16'],
        original: { $value: '16', $type: 'number' },
      };
      const result = getCssVarFallback({
        token: token as Parameters<typeof getCssVarFallback>[0]['token'],
        variableName: 'sn-primitive-dimension-16',
      });
      expect(result).toBe('16px');
    });

    it('should return "72px" when $value is string "72" for dimension variable', () => {
      const token = {
        $type: 'number',
        $value: '72',
        original: { $value: '72' },
      };
      const result = getCssVarFallback({
        token: token as Parameters<typeof getCssVarFallback>[0]['token'],
        variableName: 'sn-primitive-dimension-72',
      });
      expect(result).toBe('72px');
    });

    it('should not add px for opacity variable when $value is string "50"', () => {
      const token = {
        $type: 'number',
        $value: '50',
        original: { $value: '50' },
      };
      const result = getCssVarFallback({
        token: token as Parameters<typeof getCssVarFallback>[0]['token'],
        variableName: 'sn-acrylic-opacityBackground',
      });
      expect(result).toBe(0.5);
    });
  });

  describe('dimension values (base CSS variables without quotes)', () => {
    it('should return dimension string "1px" as-is without wrapping in quotes', () => {
      const token = {
        $type: 'dimension',
        $value: '1px',
        path: ['sn', 'primitive', 'dimension', '1'],
        original: { $value: 1, $type: 'dimension' },
      };
      const result = getCssVarFallback({
        token: token as Parameters<typeof getCssVarFallback>[0]['token'],
        variableName: 'sn-primitive-dimension-1',
      });
      expect(result).toBe('1px');
      expect(typeof result).toBe('string');
      expect((result as string).startsWith('"')).toBe(false);
    });

    it('should return dimension strings (8px, 2rem, 100%) without quotes', () => {
      const cases: Array<{ value: string; variableName: string }> = [
        { value: '8px', variableName: 'sn-primitive-dimension-8' },
        { value: '2rem', variableName: 'sn-primitive-dimension-2rem' },
        { value: '100%', variableName: 'sn-primitive-dimension-100' },
      ];
      for (const { value, variableName } of cases) {
        const token = {
          $type: 'dimension',
          $value: value,
          path: [],
          original: { $value: value, $type: 'dimension' },
        };
        const result = getCssVarFallback({
          token: token as Parameters<typeof getCssVarFallback>[0]['token'],
          variableName,
        });
        expect(result).toBe(value);
        expect((result as string).startsWith('"')).toBe(false);
      }
    });
  });

  describe('non-color string values (quoted in CSS)', () => {
    it('should return quoted string for font-family-like value', () => {
      const token = {
        $type: 'text',
        $value: 'Inter, sans-serif',
        original: { $value: 'Inter, sans-serif' },
      };
      const result = getCssVarFallback({
        token: token as Parameters<typeof getCssVarFallback>[0]['token'],
        variableName: 'sn-theme-font-family-base',
      });
      expect(typeof result).toBe('string');
      expect((result as string).startsWith('"')).toBe(true);
      expect((result as string).endsWith('"')).toBe(true);
      expect((result as string).replace(/^"|"$/g, '')).toBe('Inter, sans-serif');
    });
  });
});
