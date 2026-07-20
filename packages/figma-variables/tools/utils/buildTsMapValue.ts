import type { Dictionary, TransformedToken, TransformedTokens } from 'style-dictionary';

import { type AnyRecord, BASE_INDENT, BOX_SHADOW_CSS_PROP } from '../types.js';
import { figmaTokenToCssProps } from './figmaTokenToCssProps.js';
import { getCssVarFallback } from './getCssVarFallback.js';
import { objectTokenTransform } from './objectTokenTransform.js';
import { normalizeOpacityForCss } from './opacityUtils.js';
import { toCamelCase } from './toCamelCase.js';
import { toKebabCase } from './toKebabCase.js';
import { isBoxShadowToken, isCompositeToken } from './tokenType.js';

const isToken = (token: TransformedTokens): token is TransformedToken => Boolean(token.name);

const startsWithNumber = (str: string) => /^\d/.test(str);

// Escape string for TypeScript/JavaScript
const escapeString = (str: string): string =>
  str
    .replace(/\\/g, '\\\\') // Escape backslashes first
    .replace(/'/g, "\\'") // Escape single quotes
    .replace(/"/g, '\\"') // Escape double quotes
    .replace(/\n/g, '\\n') // Escape newlines
    .replace(/\r/g, '\\r') // Escape carriage returns
    .replace(/\t/g, '\\t'); // Escape tabs
export function buildTsMapValue({
  dictionary,
  token,
  depth = 0,
}: {
  dictionary: Dictionary;
  token: TransformedTokens;
  depth?: number;
}): string {
  const indent = new Array(depth).fill(BASE_INDENT).join('');
  const indentPlus1 = indent + BASE_INDENT;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokenToString = (token: AnyRecord, formatter: (key: string, value: any) => string) =>
    Object.entries(token)
      .map(([key, value]) => formatter(key, value))
      .join(`,\n${indentPlus1}`);

  const wrapInBrackets = (str: string) => `{
${indentPlus1}${str}
${indent}}`;

  const tokenDictionaryTemplate = (token: TransformedTokens) =>
    wrapInBrackets(
      tokenToString(token, (key, tokenInner) => {
        const propName = toCamelCase(key);

        return `${startsWithNumber(propName) ? `'${propName}'` : propName}: ${buildTsMapValue({
          dictionary,
          token: tokenInner,
          depth: depth + 1,
        })}`;
      }),
    );

  const simpleTokenTemplate = (token: TransformedToken) => {
    const variableName = token.path?.join('-') ?? token.name ?? '';
    const fallbackValue = getCssVarFallback({ token, variableName });
    const fallbackValueStr = typeof fallbackValue === 'string' ? fallbackValue : String(fallbackValue);

    return `'var(--${variableName}, ${escapeString(fallbackValueStr)})'`;
  };
  const boxShadowTokenTemplate = (token: TransformedToken) =>
    `'var(--${token.path?.join('-') ?? token.name ?? ''}, ${objectTokenTransform(token)})'`;

  const compositeTokenTemplate = (token: TransformedToken) => {
    if (isBoxShadowToken(token)) {
      return boxShadowTokenTemplate(token);
    }

    const cssEntryToString = (key: string) =>
      figmaTokenToCssProps(toKebabCase(key))
        .map(prop => {
          let value: unknown = token.$value[key];
          const propName = toKebabCase(key);
          if (typeof value === 'number' || typeof value === 'string') {
            value = normalizeOpacityForCss(value, propName);
          }
          const valueStr = typeof value === 'string' ? value : String(value);
          const escapedValue = escapeString(valueStr);
          return `'${prop}': 'var(--${token.path?.join('-') ?? token.name ?? ''}-${key}, ${escapedValue})'`;
        })
        .join(`,\n${indentPlus1}`);

    return wrapInBrackets(
      tokenToString(token.$value, (key, value) =>
        value && typeof value === 'object' && key !== BOX_SHADOW_CSS_PROP
          ? tokenToString(value, cssEntryToString)
          : cssEntryToString(key),
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
