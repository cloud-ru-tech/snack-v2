import type { Dictionary, TransformedToken } from 'style-dictionary';
import { describe, expect, it } from 'vitest';

import { buildCssVarChain } from '../../utils/buildCssVarChain.js';

function createMinimalDictionary(tokens: TransformedToken[] = []): Dictionary {
  return { tokens: {}, allTokens: tokens } as Dictionary;
}

describe('buildCssVarChain', () => {
  it('should return only var(--name) when referencePath was already visited (circular ref)', () => {
    const token: TransformedToken = {
      name: 'sn-primitive-dimension-8',
      path: ['sn', 'primitive', 'dimension', '8'],
      $value: '8px',
      $type: 'dimension',
      original: { $value: '{sn.primitive.dimension.8}' },
    } as TransformedToken;
    const dictionary = createMinimalDictionary([token]);
    const visited = new Set<string>(['sn.primitive.dimension.8']);

    const result = buildCssVarChain({
      dictionary,
      referencePath: 'sn.primitive.dimension.8',
      visited,
      includeFallbackValues: true,
    });

    expect(result).toBe('var(--sn-primitive-dimension-8)');
  });

  it('should return only var(--name) when token not found and includeFallbackValues is false', () => {
    const dictionary = createMinimalDictionary([]);

    const result = buildCssVarChain({
      dictionary,
      referencePath: 'sn.primitive.dimension.16',
      includeFallbackValues: false,
    });

    expect(result).toBe('var(--sn-primitive-dimension-16)');
  });

  it('should return var with nested chain when token has reference', () => {
    const primitiveToken: TransformedToken = {
      name: 'sn-primitive-dimension-8',
      path: ['sn', 'primitive', 'dimension', '8'],
      $value: '8px',
      $type: 'dimension',
      original: { $value: '8', $type: 'number' },
    } as TransformedToken;
    const adaptiveToken: TransformedToken = {
      name: 'sn-adaptive-size-xs',
      path: ['sn', 'adaptive', 'size', 'xs'],
      $value: '8px',
      original: { $value: '{sn.primitive.dimension.8}' },
    } as TransformedToken;
    const dictionary = createMinimalDictionary([primitiveToken, adaptiveToken]);

    const result = buildCssVarChain({
      dictionary,
      referencePath: 'sn.adaptive.size.xs',
      includeFallbackValues: true,
    });

    expect(result).toBe('var(--sn-adaptive-size-xs, var(--sn-primitive-dimension-8, 8px))');
  });

  it('should return var with fallback only when token found and includeFallbackValues is false', () => {
    const token: TransformedToken = {
      name: 'sn-primitive-dimension-8',
      path: ['sn', 'primitive', 'dimension', '8'],
      $value: '8px',
      $type: 'dimension',
      original: { $value: 8, $type: 'dimension' },
    } as TransformedToken;
    const dictionary = createMinimalDictionary([token]);

    const result = buildCssVarChain({
      dictionary,
      referencePath: 'sn.primitive.dimension.8',
      includeFallbackValues: false,
    });

    expect(result).toBe('var(--sn-primitive-dimension-8)');
  });

  it('should quote non-color string fallback when token is text or value contains special chars', () => {
    const textToken: TransformedToken = {
      name: 'sn-theme-font-family-base',
      path: ['sn', 'theme', 'font', 'family', 'base'],
      $value: 'Some Font, sans-serif',
      $type: 'text',
      original: { $value: 'Some Font, sans-serif', $type: 'text' },
    } as TransformedToken;
    const dictionary = createMinimalDictionary([textToken]);

    const result = buildCssVarChain({
      dictionary,
      referencePath: 'sn.theme.font.family.base',
      includeFallbackValues: true,
    });

    expect(result).toContain('"');
    expect(result).toContain('Some Font');
  });
});
