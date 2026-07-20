import { transformDimension } from '@tokens-studio/sd-transforms';
import type { TransformedToken } from 'style-dictionary';

import { VARIABLES_WITHOUT_PX } from '../types.js';
import { isColorToken, isColorValue, normalizeOpacityForCss, toKebabCase } from './index.js';

const CSS_LENGTH_UNITS = /^-?\d+(\.\d+)?(px|em|rem|%|vh|vw|cm|mm|in|pt|pc)\s*$/i;

function isNumeric(value: unknown): value is number | string {
  if (typeof value === 'number') {
    return true;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    return !Number.isNaN(Number(value));
  }

  return false;
}

/** Строка уже содержит единицу измерения (1px, 2rem и т.д.) — в CSS не оборачивать в кавычки. */
function isDimensionValue(value: string): boolean {
  return CSS_LENGTH_UNITS.test(value.trim());
}

export function getCssVarFallback({
  token,
  variableName,
}: {
  token: TransformedToken;
  variableName: string;
}): string | number {
  const kebabName = toKebabCase(variableName);

  if (isNumeric(token.$value) && !VARIABLES_WITHOUT_PX.some(variable => kebabName.includes(variable))) {
    const transformed = transformDimension({
      $type: token.$type ?? 'dimension',
      $value: Number(token.$value),
    });

    if (typeof transformed === 'string') {
      return transformed;
    }

    // Если transformDimension вернул число, добавляем единицы измерения
    if (typeof transformed === 'number') {
      return `${transformed}px`;
    }

    // Если transformDimension вернул что-то другое, преобразуем в строку с единицами
    const numValue = Number(token.$value);
    if (!Number.isNaN(numValue)) {
      return `${numValue}px`;
    }
  }

  // Wrap string values in quotes ONLY for text tokens (not colors)
  // Check if value is a string first
  const value = token.$value;
  if (typeof value !== 'string') {
    return normalizeOpacityForCss(value, kebabName);
  }

  // Now TypeScript knows value is a string
  const stringValue = value;
  const isColor = isColorToken(token) || isColorValue(stringValue);

  // Check if string is numeric (can be converted to number)
  const isNumericString = stringValue.trim() !== '' && !Number.isNaN(Number(stringValue));

  // Dimension values (1px, 2rem, etc.) and numeric strings must not be quoted in CSS
  if (isDimensionValue(stringValue) || isNumericString) {
    const normalized = normalizeOpacityForCss(stringValue, kebabName) as string | number;
    if (typeof normalized === 'number') return normalized; // opacity 0–1
    if (isDimensionValue(stringValue)) return normalized; // already has unit
    // Numeric string for dimension variable (e.g. "16" from token $value) — add px
    if (!VARIABLES_WITHOUT_PX.some(v => kebabName.includes(v))) {
      return `${Number(stringValue)}px`;
    }
    return normalized;
  }

  // Quote only non-color strings that need it (e.g. text, strings with colons/semicolons)
  if (!isColor) {
    return `"${stringValue.replace(/"/g, '\\"')}"`;
  }

  return normalizeOpacityForCss(stringValue, kebabName) as string | number;
}
