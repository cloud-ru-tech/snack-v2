import type { Dictionary } from 'style-dictionary/types';

import { ValueFormat, VARIABLES_WITHOUT_PX } from '../../types.js';
import type { ScssNestedMap } from '../../utils/buildScssMapString.js';
import {
  buildCssVarChain,
  buildScssMapString,
  buildScssMapValue,
  isBoxShadowToken,
  isCompositeToken,
  normalizeOpacityForCss,
  objectTokenTransform,
  toKebabCase,
} from '../../utils/index.js';
import { getTokenReferencePath } from '../../utils/tokenVarUtils.js';
import { resolveCssTokenValue } from '../helpers/cssTokenValue.js';

export function getVariableEntry(name: string, value?: string): string {
  if (value !== undefined) return `$${name}: var(--${name}, ${value});`;
  return `$${name}: --${name};`;
}

export function printVariableMap(dictionary: Dictionary, includeFallbackValues = true): string {
  const tokens = dictionary.tokens || {};
  const entries = Object.entries(tokens);
  if (entries.length === 0) return `$base-styles: ();`;
  return `$base-styles: (
  ${entries
    .map(
      ([key, value]) =>
        `"${key}": ${buildScssMapValue({
          dictionary,
          token: value,
          depth: 1,
          valueFormat: ValueFormat.CSSVar,
          includeFallbackValues,
        })}`,
    )
    .join(',\n  ')}
);`;
}

const PX_UNITS = /px|em|rem|%|vh|vw|cm|mm|in|pt|pc$/i;

function addPxIfNeeded(propName: string, fallbackValue: string | number): string | number {
  if (VARIABLES_WITHOUT_PX.some(v => propName.includes(v))) {
    return normalizeOpacityForCss(fallbackValue, propName);
  }
  if (typeof fallbackValue === 'number') return `${fallbackValue}px`;
  if (typeof fallbackValue === 'string') {
    const n = Number(fallbackValue);
    if (!Number.isNaN(n) && fallbackValue.trim() !== '' && !fallbackValue.match(PX_UNITS)) {
      return `${n}px`;
    }
  }
  return fallbackValue;
}

export function buildNestedStructure(dictionary: Dictionary, includeFallbackValues = true): ScssNestedMap {
  const rootMap: ScssNestedMap = {};
  dictionary.allTokens.forEach(token => {
    const path = token.path || [];
    if (path.length < 2) return;
    const tokenPath = path.slice(1);
    if (tokenPath.length === 0) return;

    let current = rootMap;
    for (let i = 0; i < tokenPath.length - 1; i++) {
      const key = tokenPath[i];
      if (!key) continue;
      if (!current[key]) current[key] = {};
      current = current[key] as ScssNestedMap;
    }

    const lastKey = tokenPath[tokenPath.length - 1];
    if (!lastKey) return;
    const variableName = path.join('-');

    if (isCompositeToken(token)) {
      current[lastKey] = buildScssMapValue({
        dictionary,
        token,
        valueFormat: ValueFormat.CSSVar,
        includeFallbackValues,
      });
    } else {
      const value =
        typeof token.$value === 'object'
          ? objectTokenTransform(token)
          : resolveCssTokenValue(token, variableName, { dictionary, includeFallbackValues });
      current[lastKey] = `var(--${variableName}, ${typeof value === 'string' ? value : String(value)})`;
    }
  });
  return rootMap;
}

export function printVariableList(dictionary: Dictionary, includeFallbackValues = true): string {
  const nestedStructure = buildNestedStructure(dictionary, includeFallbackValues);
  const maps: string[] = [];
  Object.entries(nestedStructure).forEach(([groupKey, groupValue]) => {
    const mapStr = buildScssMapString(groupValue as ScssNestedMap, 0);
    const mapName = `$sn-${groupKey}`;
    maps.push(mapStr ? `${mapName}: (\n${mapStr}\n);` : `${mapName}: ();`);
  });

  const flatVars = dictionary.allTokens
    .map(token => {
      const name = token.path?.join('-') ?? token.name ?? '';
      if (isCompositeToken(token)) {
        if (isBoxShadowToken(token)) {
          return getVariableEntry(name, objectTokenTransform(token));
        }
        const flatEntries = Object.entries(token.$value as Record<string, unknown>)
          .map(([key]) => {
            const variableName = `${name}-${key}`;
            const propName = toKebabCase(key);
            const value = token.$value[key];
            const refPath = getTokenReferencePath(token.original?.$value?.[key]);
            let fallbackValue: string | number = value as string | number;

            if (refPath) {
              const chainValue = buildCssVarChain({
                dictionary,
                referencePath: refPath,
                includeFallbackValues,
                currentToken: token,
              });
              return `$${variableName}: var(--${variableName}, ${chainValue});`;
            }
            fallbackValue = addPxIfNeeded(propName, fallbackValue);
            return getVariableEntry(
              variableName,
              typeof fallbackValue === 'string' ? fallbackValue : String(fallbackValue),
            );
          })
          .join('\n');
        const mapVars = `$${name}: ${buildScssMapValue({
          dictionary,
          token,
          valueFormat: ValueFormat.CSSVar,
          includeFallbackValues,
        })};`;
        return `${mapVars}\n${flatEntries}`;
      }

      const variableName = token.path?.join('-') ?? token.name ?? '';
      const value =
        typeof token.$value === 'object'
          ? objectTokenTransform(token)
          : resolveCssTokenValue(token, variableName, { dictionary, includeFallbackValues });
      return getVariableEntry(name, typeof value === 'string' ? value : String(value));
    })
    .join('\n');

  return maps.join('\n\n') + (maps.length > 0 && flatVars ? '\n\n' : '') + flatVars;
}
