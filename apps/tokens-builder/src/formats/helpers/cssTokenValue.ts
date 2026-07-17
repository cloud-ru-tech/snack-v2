import type { Dictionary, TransformedToken } from 'style-dictionary/types';

import { buildCssVarChain } from '../../utils/buildCssVarChain.js';
import { getCssVarFallback } from '../../utils/getCssVarFallback.js';
import { replaceInlineReferences } from '../../utils/tokenVarUtils.js';

/** Опции разрешения значения токена в CSS/SCSS. */
export type ResolveCssTokenOptions = {
  dictionary: Dictionary;
  includeFallbackValues: boolean;
  /** Для примитивов в base.css — подставлять только значение, без var()-цепочек. */
  isPrimitiveValueOnly?: (token: TransformedToken) => boolean;
};

/**
 * Итоговое значение для переменной: var()-цепочка по ссылке {sn.path.to.token}
 * или вычисленный fallback (opacity 0–1, размеры в px, строки в кавычках при необходимости).
 */
export function resolveCssTokenValue(
  token: TransformedToken,
  variableName: string,
  options: ResolveCssTokenOptions,
): string | number {
  const { dictionary, includeFallbackValues, isPrimitiveValueOnly } = options;
  const originalValue = token.original?.$value;
  const originalString = typeof originalValue === 'string' ? originalValue.trim() : null;
  const singleReferenceMatch = originalString?.match(/^\{([^}]+)\}$/);
  const referencePath = singleReferenceMatch?.[1];

  const fallbackValue = getCssVarFallback({ token, variableName });

  if (referencePath) {
    if (isPrimitiveValueOnly?.(token)) {
      return fallbackValue;
    }
    return buildCssVarChain({
      dictionary,
      referencePath,
      includeFallbackValues,
      currentToken: token,
    });
  }

  const hasInlineRefs = typeof originalValue === 'string' && originalValue.includes('{') && !singleReferenceMatch;
  if (hasInlineRefs) {
    return replaceInlineReferences(originalValue as string);
  }

  return fallbackValue;
}
