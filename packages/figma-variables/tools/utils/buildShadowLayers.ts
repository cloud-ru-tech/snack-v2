import { transformDimension } from '@tokens-studio/sd-transforms';
import type { TransformedToken } from 'style-dictionary';

import { ensureArray } from './ensureArray.js';
import { ShadowItem } from './formatBoxShadowValue.js';

type PrimitiveValue = string | number;

const DIMENSION_KEYS = new Set(['x', 'y', 'blur', 'spread']);

function extractPrimitiveValue(value: unknown): PrimitiveValue | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  if (typeof value === 'boolean') {
    return value ? '1' : '0';
  }

  if (Array.isArray(value)) {
    const flattened = value.map(extractPrimitiveValue).filter((item): item is PrimitiveValue => item !== undefined);

    if (flattened.length === 0) {
      return undefined;
    }

    return flattened.join(', ');
  }

  if (typeof value === 'object') {
    const candidate = value as Record<string, unknown>;

    if ('$value' in candidate) {
      return extractPrimitiveValue(candidate.$value);
    }

    if ('value' in candidate) {
      return extractPrimitiveValue(candidate.value);
    }
  }

  return undefined;
}

function getDimensionValue(value: PrimitiveValue): string {
  if (typeof value === 'number') {
    return String(transformDimension({ $value: value, $type: 'dimension' }));
  }

  const numericValue = Number(value);

  if (!Number.isNaN(numericValue)) {
    return String(transformDimension({ $value: numericValue, $type: 'dimension' }));
  }

  return String(value);
}

function extractReferencePath(value: unknown): string | undefined {
  const primitive = extractPrimitiveValue(value);

  if (typeof primitive !== 'string') {
    return undefined;
  }

  const trimmed = primitive.trim();

  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) {
    return undefined;
  }

  return trimmed.slice(1, -1);
}

export function buildShadowLayers(token: Partial<TransformedToken>): ShadowItem[] {
  const originalLayers = ensureArray(token.original?.$value);

  return ensureArray(token.$value).map((layer, index) => {
    const layerRecord = layer as Record<string, unknown>;
    const originalLayer = (originalLayers[index] ?? {}) as Record<string, unknown>;

    return Object.entries(layerRecord).reduce<ShadowItem>(
      (acc, [key, innerValue]) => {
        if (key === 'type') {
          acc.type = (typeof innerValue === 'string' ? innerValue : 'dropShadow') as ShadowItem['type'];
          return acc;
        }

        let normalizedKey = key;

        if (key === 'offsetX') {
          normalizedKey = 'x';
        } else if (key === 'offsetY') {
          normalizedKey = 'y';
        }

        if (
          normalizedKey !== 'x' &&
          normalizedKey !== 'y' &&
          normalizedKey !== 'blur' &&
          normalizedKey !== 'spread' &&
          normalizedKey !== 'color'
        ) {
          return acc;
        }

        const primitiveValue = extractPrimitiveValue(innerValue);
        let fallbackValue = '';

        if (primitiveValue !== undefined) {
          fallbackValue = DIMENSION_KEYS.has(normalizedKey)
            ? getDimensionValue(primitiveValue)
            : String(primitiveValue);
        }

        const referencePath = extractReferencePath(originalLayer[key]);
        const typedKey = normalizedKey as keyof Omit<ShadowItem, 'type'>;

        if (referencePath) {
          acc[typedKey] = `var(--${referencePath.split('.').join('-')}, ${fallbackValue})`;
        } else {
          acc[typedKey] = fallbackValue;
        }

        return acc;
      },
      { x: '', y: '', blur: '', spread: '', color: '', type: 'dropShadow' },
    );
  });
}
