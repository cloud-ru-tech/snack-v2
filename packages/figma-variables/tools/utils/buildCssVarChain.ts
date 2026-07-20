import { transformDimension } from '@tokens-studio/sd-transforms';
import type { Dictionary, TransformedToken } from 'style-dictionary/types';

import { VARIABLES_WITHOUT_PX } from '../types.js';
import { isColorToken, isColorValue, isTextToken, normalizeOpacityForCss, toKebabCase } from './index.js';
import { getTokenReferencePath, isNumericString, pathToVarName } from './tokenVarUtils.js';

function findTokenByPath(dictionary: Dictionary, referencePath: string): TransformedToken | null {
  const pathParts = referencePath.split('.');

  // Ищем токен по полному пути
  const token = dictionary.allTokens.find(t => {
    const tokenPath = t.path || [];
    if (tokenPath.length !== pathParts.length) return false;
    return tokenPath.every((part, index) => toKebabCase(part) === toKebabCase(pathParts[index]));
  });

  return token || null;
}

export function buildCssVarChain({
  dictionary,
  referencePath,
  visited = new Set<string>(),
  includeFallbackValues = true,
  currentToken,
}: {
  dictionary: Dictionary;
  referencePath: string;
  visited?: Set<string>;
  includeFallbackValues?: boolean;
  currentToken?: TransformedToken;
}): string {
  if (visited.has(referencePath)) {
    return `var(--${pathToVarName(referencePath)})`;
  }

  visited.add(referencePath);

  const token = findTokenByPath(dictionary, referencePath);

  const variableName = pathToVarName(referencePath);
  const kebabName = toKebabCase(variableName);

  if (!token) {
    if (includeFallbackValues && currentToken) {
      let fallbackValue: string | number = normalizeOpacityForCss(currentToken.$value as string | number, variableName);
      const shouldAddPx = !VARIABLES_WITHOUT_PX.some(variable => kebabName.includes(variable));
      if (shouldAddPx) {
        if (typeof fallbackValue === 'number') {
          fallbackValue = `${fallbackValue}px`;
        } else if (typeof fallbackValue === 'string' && isNumericString(fallbackValue)) {
          fallbackValue = `${Number(fallbackValue)}px`;
        }
      }

      return `var(--${variableName}, ${fallbackValue})`;
    }

    return `var(--${variableName})`;
  }

  const nextRefPath = getTokenReferencePath(token.original?.$value);

  let fallbackValue: string | number = VARIABLES_WITHOUT_PX.some(variable => kebabName.includes(variable))
    ? (token.$value as string | number)
    : transformDimension(token);

  fallbackValue = normalizeOpacityForCss(fallbackValue, variableName);
  const shouldAddPx = !VARIABLES_WITHOUT_PX.some(variable => kebabName.includes(variable));
  if (shouldAddPx) {
    if (typeof fallbackValue === 'number') {
      fallbackValue = `${fallbackValue}px`;
    } else if (typeof fallbackValue === 'string' && isNumericString(fallbackValue)) {
      fallbackValue = `${Number(fallbackValue)}px`;
    }
  }

  const isText = isTextToken(token);
  const isColor = isColorToken(token) || (typeof fallbackValue === 'string' && isColorValue(fallbackValue));

  if (
    typeof fallbackValue === 'string' &&
    !isColor &&
    !fallbackValue.startsWith('"') &&
    !fallbackValue.startsWith('var(') &&
    !isNumericString(fallbackValue)
  ) {
    if (isText || fallbackValue.includes(':') || fallbackValue.includes(';') || fallbackValue.includes(')')) {
      fallbackValue = `"${String(fallbackValue).replace(/"/g, '\\"')}"`;
    }
  }

  if (nextRefPath) {
    const nextVarChain = buildCssVarChain({
      dictionary,
      referencePath: nextRefPath,
      visited: new Set(visited),
      includeFallbackValues,
      currentToken: token,
    });
    return `var(--${variableName}, ${nextVarChain})`;
  }

  if (includeFallbackValues) {
    return `var(--${variableName}, ${fallbackValue})`;
  }
  return `var(--${variableName})`;
}
