/**
 * Normalizes token references in token content.
 * Fixes common issues with token references from Figma exports.
 *
 * Known issues:
 * - {sn.effect.shadow.*} should be {sn.theme.effect.shadow.*}
 * - {sn.color.forGradient.*} should be {sn.theme.color.forGradient.*}
 */

type AnyRecord = Record<string, unknown>;

const REFERENCE_FIXES: Array<{ pattern: RegExp; replacement: string }> = [
  // Fix effect.shadow references - should reference theme tokens
  {
    pattern: /\{sn\.effect\.shadow\./g,
    replacement: '{sn.theme.effect.shadow.',
  },
  // Fix forGradient color references - should reference theme tokens
  {
    pattern: /\{sn\.color\.forGradient\./g,
    replacement: '{sn.theme.color.forGradient.',
  },
];

/**
 * Recursively walks through token content and fixes token references
 */
function normalizeValue(value: unknown): unknown {
  if (typeof value === 'string') {
    let normalizedValue = value;
    for (const { pattern, replacement } of REFERENCE_FIXES) {
      normalizedValue = normalizedValue.replace(pattern, replacement);
    }
    return normalizedValue;
  }

  if (Array.isArray(value)) {
    return value.map(normalizeValue);
  }

  if (value && typeof value === 'object') {
    const result: AnyRecord = {};
    for (const [key, val] of Object.entries(value as AnyRecord)) {
      result[key] = normalizeValue(val);
    }
    return result;
  }

  return value;
}

/**
 * Normalizes all token references in the given content
 */
export function normalizeTokenReferences(content: AnyRecord): AnyRecord {
  return normalizeValue(content) as AnyRecord;
}
