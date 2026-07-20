import type { Dictionary, TransformedToken, TransformedTokens } from 'style-dictionary';
import { describe, expect, it } from 'vitest';

import { buildNestedStructure } from '../../formats/SCSSBaseStylesFormat/scssBaseStylesHelpers.js';
import { ValueFormat } from '../../types.js';
import { buildScssMapString } from '../../utils/buildScssMapString.js';
import { buildScssMapValue } from '../../utils/buildScssMapValue.js';

function createMinimalDictionary(overrides: Partial<Dictionary> = {}): Dictionary {
  return {
    tokens: {},
    allTokens: [],
    ...overrides,
  } as Dictionary;
}

describe('SCSS camelCase keys preservation', () => {
  describe('buildScssMapValue', () => {
    it('preserves camelCase keys for nested dictionary-style token (e.g. onAccent, background2Level)', () => {
      const dictionary = createMinimalDictionary();

      const token: TransformedTokens = {
        onAccent: {
          name: 'sn-theme-color-onAccent',
          path: ['sn', 'theme', 'color', 'onAccent'],
          $value: '#ffffff',
          $type: 'color',
          original: { $value: '#ffffff', $type: 'color' },
        } as TransformedToken,
        background2Level: {
          name: 'sn-theme-color-background2Level',
          path: ['sn', 'theme', 'color', 'background2Level'],
          $value: '#f5f5f5',
          $type: 'color',
          original: { $value: '#f5f5f5', $type: 'color' },
        } as TransformedToken,
      };

      const result = buildScssMapValue({
        dictionary,
        token,
        valueFormat: ValueFormat.CSSVar,
        includeFallbackValues: true,
      });

      expect(result).toContain('"onAccent":');
      expect(result).toContain('"background2Level":');
      expect(result).not.toContain('"on-accent"');
      expect(result).not.toContain('"background2-level"');
    });

    it('preserves camelCase in deeply nested theme-like structure', () => {
      const dictionary = createMinimalDictionary();

      const token: TransformedTokens = {
        color: {
          onAccent: {
            name: 'sn-theme-color-onAccent',
            path: ['sn', 'theme', 'color', 'onAccent'],
            $value: '#ffffff',
            $type: 'color',
            original: { $value: '#ffffff', $type: 'color' },
          } as TransformedToken,
          stateLayer: {
            name: 'sn-theme-color-stateLayer',
            path: ['sn', 'theme', 'color', 'stateLayer'],
            $value: '#000000',
            $type: 'color',
            original: { $value: '#000000', $type: 'color' },
          } as TransformedToken,
        },
      };

      const result = buildScssMapValue({
        dictionary,
        token,
        valueFormat: ValueFormat.CSSVar,
        includeFallbackValues: true,
      });

      expect(result).toContain('"onAccent":');
      expect(result).toContain('"stateLayer":');
      expect(result).not.toContain('"on-accent"');
      expect(result).not.toContain('"state-layer"');
    });
  });

  describe('buildNestedStructure + buildScssMapString', () => {
    it('preserves camelCase keys from token paths in generated SCSS map string', () => {
      const dictionary = createMinimalDictionary({
        allTokens: [
          {
            name: 'sn-theme-color-onAccent',
            path: ['sn', 'theme', 'color', 'onAccent'],
            $value: '#ffffff',
            $type: 'color',
            original: { $value: '#ffffff', $type: 'color' },
          },
          {
            name: 'sn-theme-color-background2Level',
            path: ['sn', 'theme', 'color', 'background2Level'],
            $value: '#eeeeee',
            $type: 'color',
            original: { $value: '#eeeeee', $type: 'color' },
          },
        ],
      } as Dictionary);

      const nested = buildNestedStructure(dictionary, true);
      const themeGroup = nested.theme as Record<string, unknown>;
      expect(themeGroup).toBeDefined();
      const colorGroup = themeGroup?.color as Record<string, unknown>;
      expect(colorGroup).toBeDefined();
      expect(Object.keys(colorGroup)).toContain('onAccent');
      expect(Object.keys(colorGroup)).toContain('background2Level');

      const mapStr = buildScssMapString(nested.theme as Parameters<typeof buildScssMapString>[0], 0);

      expect(mapStr).toContain('"onAccent":');
      expect(mapStr).toContain('"background2Level":');
      expect(mapStr).not.toContain('"on-accent"');
      expect(mapStr).not.toContain('"background2-level"');
    });
  });

  describe('buildScssMapString formatting', () => {
    it('re-indents multiline string values (JSON.stringify-style, 2 spaces per level)', () => {
      // Значение как от buildScssMapValue(depth=0): скобки и 2 пробела внутри
      const multilineValue = `(
  "font-family": var(--sn-mono-body-l-fontFamily, SB Sans Text Mono),
  "font-size": var(--sn-mono-body-l-fontSize, 18px)
)`;
      const map: Parameters<typeof buildScssMapString>[0] = {
        body: {
          l: multilineValue,
        },
      };
      const result = buildScssMapString(map, 0);
      // Ключ "l" с отступом 4 пробела; строки multiline-значения получают +4 пробела (итого 6)
      expect(result).toContain('"l": (\n      "font-family":');
      expect(result).toContain('\n      "font-size":');
      expect(result).toContain('\n    )');
    });
  });
});
