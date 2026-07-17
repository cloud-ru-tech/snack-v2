import type { Dictionary, TransformedToken } from 'style-dictionary';
import { describe, expect, it } from 'vitest';

import { resolveCssTokenValue } from '../../src/formats/helpers/cssTokenValue.js';
import { buildCssVarChain } from '../../src/utils/buildCssVarChain.js';

function createMinimalDictionary(tokens: TransformedToken[] = []): Dictionary {
  return { tokens: {}, allTokens: tokens } as Dictionary;
}

describe('CSS base styles: dimension variables without quotes', () => {
  it('resolveCssTokenValue returns dimension value without quotes for primitive dimension token', () => {
    const dictionary = createMinimalDictionary();
    const token = {
      name: 'sn-primitive-dimension-8',
      path: ['sn', 'primitive', 'dimension', '8'],
      $value: '8px',
      $type: 'dimension',
      filePath: 'tokens/02_primitive/dimension.json',
      original: { $value: 8, $type: 'dimension' },
    } as TransformedToken;

    const value = resolveCssTokenValue(token, 'sn-primitive-dimension-8', {
      dictionary,
      includeFallbackValues: true,
      isPrimitiveValueOnly: (t: TransformedToken) =>
        ((t as unknown as { filePath?: string }).filePath ?? '').includes('02_primitive'),
    });

    expect(value).toBe('8px');
    expect(String(value).startsWith('"')).toBe(false);
  });

  it('formatted CSS line for dimension must not contain quoted value', () => {
    const dictionary = createMinimalDictionary();
    const token = {
      name: 'sn-primitive-dimension-1',
      path: ['sn', 'primitive', 'dimension', '1'],
      $value: '1px',
      $type: 'dimension',
      filePath: 'tokens/02_primitive/dimension.json',
      original: { $value: 1, $type: 'dimension' },
    } as TransformedToken;

    const variableName = 'sn-primitive-dimension-1';
    const value = resolveCssTokenValue(token, variableName, {
      dictionary,
      includeFallbackValues: true,
      isPrimitiveValueOnly: () => true,
    });

    const line = `--${variableName}: ${value};`;
    expect(line).toBe('--sn-primitive-dimension-1: 1px;');
    expect(line).not.toContain('"1px"');
  });

  it('buildCssVarChain returns fallback with px when referenced token has $value as string number', () => {
    const primitiveToken: TransformedToken = {
      name: 'sn-primitive-dimension-16',
      path: ['sn', 'primitive', 'dimension', '16'],
      $value: '16',
      $type: 'number',
      original: { $value: '16', $type: 'number' },
    } as TransformedToken;
    const dictionary = createMinimalDictionary([primitiveToken]);

    const result = buildCssVarChain({
      dictionary,
      referencePath: 'sn.primitive.dimension.16',
      includeFallbackValues: true,
    });

    expect(result).toBe('var(--sn-primitive-dimension-16, 16px)');
  });

  it('buildCssVarChain returns fallback with px when token not in dictionary (e.g. layer build) and currentToken.$value is string number', () => {
    const dictionary = createMinimalDictionary([]);
    const currentToken: TransformedToken = {
      name: 'sn-adaptive-size-xs',
      path: ['sn', 'adaptive', 'size', 'xs'],
      $value: '16',
      original: { $value: '{sn.primitive.dimension.16}' },
    } as TransformedToken;

    const result = buildCssVarChain({
      dictionary,
      referencePath: 'sn.primitive.dimension.16',
      includeFallbackValues: true,
      currentToken,
    });

    expect(result).toBe('var(--sn-primitive-dimension-16, 16px)');
  });

  it('resolveCssTokenValue returns var chain with 16px fallback when referencing dimension with string $value', () => {
    const primitiveToken: TransformedToken = {
      name: 'sn-primitive-dimension-16',
      path: ['sn', 'primitive', 'dimension', '16'],
      $value: '16',
      $type: 'number',
      original: { $value: '16', $type: 'number' },
    } as TransformedToken;
    const dictionary = createMinimalDictionary([primitiveToken]);
    const consumerToken = {
      name: 'sn-adaptive-size-xs',
      path: ['sn', 'adaptive', 'size', 'xs'],
      $value: '16',
      original: { $value: '{sn.primitive.dimension.16}' },
    } as TransformedToken;

    const value = resolveCssTokenValue(consumerToken, 'sn-adaptive-size-xs', {
      dictionary,
      includeFallbackValues: true,
      isPrimitiveValueOnly: () => false,
    });

    expect(value).toBe('var(--sn-primitive-dimension-16, 16px)');
  });
});

describe('CSS: VARIABLES_WITHOUT_PX (font-weight, etc.) — fallback without px', () => {
  function createMinimalDictionary(tokens: TransformedToken[] = []): Dictionary {
    return { tokens: {}, allTokens: tokens } as Dictionary;
  }

  it('buildCssVarChain returns fallback without px for font-weight (token in dictionary, path contains fontWeightValue)', () => {
    const fontWeightToken: TransformedToken = {
      name: 'sn-primitive-font-fontWeightValue-650',
      path: ['sn', 'primitive', 'font', 'fontWeightValue', '650'],
      $value: 650,
      $type: 'number',
      original: { $value: 650, $type: 'number' },
    } as TransformedToken;
    const dictionary = createMinimalDictionary([fontWeightToken]);

    const result = buildCssVarChain({
      dictionary,
      referencePath: 'sn.primitive.font.fontWeightValue.650',
      includeFallbackValues: true,
    });

    expect(result).toBe('var(--sn-primitive-font-fontWeightValue-650, 650)');
    expect(result).not.toContain('650px');
  });

  it('buildCssVarChain returns fallback without px for font-weight when token not in dictionary', () => {
    const dictionary = createMinimalDictionary([]);
    const currentToken: TransformedToken = {
      name: 'sn-theme-typography-fontWeight-regular-display-s',
      path: ['sn', 'theme', 'typography', 'fontWeight', 'regular', 'display', 's'],
      $value: 650,
      original: { $value: '{sn.primitive.font.fontWeightValue.650}' },
    } as TransformedToken;

    const result = buildCssVarChain({
      dictionary,
      referencePath: 'sn.primitive.font.fontWeightValue.650',
      includeFallbackValues: true,
      currentToken,
    });

    expect(result).toBe('var(--sn-primitive-font-fontWeightValue-650, 650)');
    expect(result).not.toContain('650px');
  });

  it('buildCssVarChain returns fallback without px for font-weight when currentToken.$value is string number', () => {
    const dictionary = createMinimalDictionary([]);
    const currentToken: TransformedToken = {
      name: 'sn-theme-typography-fontWeight-regular-body-m',
      path: ['sn', 'theme', 'typography', 'fontWeight', 'regular', 'body', 'm'],
      $value: '350',
      original: { $value: '{sn.primitive.font.fontWeightValue.350}' },
    } as TransformedToken;

    const result = buildCssVarChain({
      dictionary,
      referencePath: 'sn.primitive.font.fontWeightValue.350',
      includeFallbackValues: true,
      currentToken,
    });

    expect(result).toBe('var(--sn-primitive-font-fontWeightValue-350, 350)');
    expect(result).not.toContain('350px');
  });
});
