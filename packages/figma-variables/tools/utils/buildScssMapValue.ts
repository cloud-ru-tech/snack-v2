import type { Dictionary, TransformedToken, TransformedTokens } from 'style-dictionary';
import { getReferences, usesReferences } from 'style-dictionary/utils';

import { type AnyRecord, BASE_INDENT, BOX_SHADOW_CSS_PROP, ValueFormat, VARIABLES_WITHOUT_PX } from '../types.js';
import { buildCssVarChain } from './buildCssVarChain.js';
import { figmaTokenToCssProps } from './figmaTokenToCssProps.js';
import { getCssVarFallback } from './getCssVarFallback.js';
import { objectTokenTransform } from './objectTokenTransform.js';
import { normalizeOpacityForCss } from './opacityUtils.js';
import { toKebabCase } from './toKebabCase.js';
import { isBoxShadowToken, isCompositeToken } from './tokenType.js';
import { getTokenReferencePath } from './tokenVarUtils.js';

const isToken = (token: TransformedTokens): token is TransformedToken => Boolean(token.name);

function replaceRefs({
  dictionary,
  value,
  valueWithRefs,
}: {
  dictionary: Dictionary;
  value: unknown;
  valueWithRefs: unknown;
}): string {
  let replacedValue = String(value);

  if (usesReferences(valueWithRefs)) {
    const refs = getReferences(valueWithRefs as string, dictionary.tokens);

    refs.forEach(ref => {
      replacedValue = replacedValue.replace(String(ref.value), `$${ref.name}`);
    });
  }

  return replacedValue;
}

export function buildScssMapValue({
  dictionary,
  token,
  depth = 0,
  valueFormat = ValueFormat.Original,
  includeFallbackValues = true,
}: {
  dictionary: Dictionary;
  token: TransformedTokens;
  depth?: number;
  valueFormat?: ValueFormat;
  includeFallbackValues?: boolean;
}): string {
  const indent = new Array(depth).fill(BASE_INDENT).join('');
  const indentPlus1 = indent + BASE_INDENT;

  const tokenToString = (token: AnyRecord, formatter: (key: string, value: unknown) => string) =>
    Object.entries(token)
      .map(([key, value]) => formatter(key, value))
      .filter(result => result.trim() !== '') // Filter out empty results
      .join(`,\n${indentPlus1}`);

  const wrapInBrackets = (str: string) => `(
${indentPlus1}${str}
${indent})`;

  const tokenDictionaryTemplate = (token: TransformedTokens) => {
    const content = tokenToString(token, (key, tokenInner) => {
      if (typeof tokenInner === 'object' && tokenInner !== null && !Array.isArray(tokenInner)) {
        const innerValue = buildScssMapValue({
          dictionary,
          token: tokenInner as TransformedTokens,
          depth: depth + 1,
          valueFormat,
          includeFallbackValues,
        });
        const trimmedValue = innerValue.trim();
        if (trimmedValue === '()' || trimmedValue === '(\n)' || trimmedValue.match(/^\(\s*\)$/)) return '';
        return `"${key}": ${innerValue}`;
      }
      return `"${key}": ${String(tokenInner)}`;
    });

    if (content.trim() === '') {
      return '()';
    }

    return wrapInBrackets(content);
  };

  const simpleTokenTemplate = (token: TransformedToken) => {
    const variableName = token.path?.join('-') ?? token.name ?? '';

    if (valueFormat === ValueFormat.Original) {
      return replaceRefs({ dictionary, value: token.$value, valueWithRefs: token.original.$value });
    }

    const refPath = getTokenReferencePath(token.original?.$value);
    if (refPath) {
      const chainValue = buildCssVarChain({
        dictionary,
        referencePath: refPath,
        includeFallbackValues,
        currentToken: token,
      });
      return `var(--${variableName}, ${chainValue})`;
    }
    const fallbackValue =
      typeof token.$value === 'object' ? objectTokenTransform(token) : getCssVarFallback({ token, variableName });

    return `var(--${variableName}, ${fallbackValue})`;
  };

  const compositeTokenTemplate = (token: TransformedToken) => {
    if (isBoxShadowToken(token)) {
      return simpleTokenTemplate(token);
    }

    const cssEntryToString = (key: string, value: unknown) => {
      if (valueFormat === ValueFormat.Original) {
        const stringValue = typeof value === 'string' ? value : String(value);
        return figmaTokenToCssProps(toKebabCase(key))
          .map(prop => `"${prop}": ${stringValue}`)
          .join(`,\n${indentPlus1}`);
      }

      const variableName = `${token.path?.join('-') ?? token.name ?? ''}-${key}`;
      const refPath = getTokenReferencePath(token.original?.$value?.[key]);
      let fallbackValue: string | number = value as string | number;

      if (refPath) {
        const chainValue = buildCssVarChain({
          dictionary,
          referencePath: refPath,
          includeFallbackValues,
          currentToken: token,
        });
        return figmaTokenToCssProps(toKebabCase(key))
          .map(prop => `"${prop}": var(--${variableName}, ${chainValue})`)
          .join(`,\n${indentPlus1}`);
      }

      const propName = toKebabCase(key);
      const shouldAddPx = !VARIABLES_WITHOUT_PX.some(variable => propName.includes(variable));

      fallbackValue = normalizeOpacityForCss(fallbackValue, propName);
      if (shouldAddPx) {
        if (typeof fallbackValue === 'number') fallbackValue = `${fallbackValue}px`;
        else if (typeof fallbackValue === 'string') {
          const n = Number(fallbackValue);
          if (
            !Number.isNaN(n) &&
            fallbackValue.trim() !== '' &&
            !fallbackValue.match(/px|em|rem|%|vh|vw|cm|mm|in|pt|pc$/i)
          ) {
            fallbackValue = `${n}px`;
          }
        }
      }

      const fallbackValueStr = typeof fallbackValue === 'string' ? fallbackValue : String(fallbackValue);
      return figmaTokenToCssProps(toKebabCase(key))
        .map(prop => `"${prop}": var(--${variableName}, ${fallbackValueStr})`)
        .join(`,\n${indentPlus1}`);
    };

    return wrapInBrackets(
      tokenToString(token.$value, (key, value) =>
        value && typeof value === 'object' && key !== BOX_SHADOW_CSS_PROP
          ? tokenToString(value as AnyRecord, cssEntryToString)
          : cssEntryToString(key, value),
      ),
    );
  };

  if (!isToken(token)) {
    return tokenDictionaryTemplate(token);
  }

  if (isCompositeToken(token)) {
    return compositeTokenTemplate(token);
  }

  return simpleTokenTemplate(token);
}
