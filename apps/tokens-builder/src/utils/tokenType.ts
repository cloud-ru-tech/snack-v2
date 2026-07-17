import type { TransformedToken } from 'style-dictionary';

import { CompositeToken } from '../types.js';

const BOX_SHADOW_TYPES = new Set<string>([CompositeToken.BoxShadow, 'shadow']);

function getTokenType(token: Partial<TransformedToken>): string | undefined {
  return (token.$type ?? token.type ?? token.original?.$type ?? token.original?.type) as string | undefined;
}

export function isBoxShadowToken(token: Partial<TransformedToken>): boolean {
  const type = getTokenType(token);
  return Boolean(type && BOX_SHADOW_TYPES.has(type));
}

export function isCompositeToken(token: Partial<TransformedToken>): boolean {
  const type = getTokenType(token);

  if (!type) {
    return false;
  }

  if (BOX_SHADOW_TYPES.has(type)) {
    return true;
  }

  return type === CompositeToken.Typography || type === CompositeToken.Composition;
}

export function isTextToken(token: Partial<TransformedToken>): boolean {
  const type = getTokenType(token);
  if (type === 'text') {
    return true;
  }

  // Check if token path contains "text" (for language mode tokens)
  // This handles cases where type might not be preserved after transformation
  const path = token.path ?? [];
  const name = token.name ?? '';
  const fullPath = [...path, name].join('-').toLowerCase();
  return fullPath.includes('text');
}

export function isColorToken(token: Partial<TransformedToken>): boolean {
  const type = getTokenType(token);
  return type === 'color';
}

export function isColorValue(value: unknown): boolean {
  if (typeof value !== 'string') {
    return false;
  }

  const trimmed = value.trim();

  // Check for hex colors: #fff, #ffffff
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)) {
    return true;
  }

  // Check for rgb/rgba: rgb(255, 255, 255), rgba(255, 255, 255, 0.5)
  if (/^rgba?\(/.test(trimmed)) {
    return true;
  }

  // Check for hsl/hsla: hsl(0, 0%, 100%), hsla(0, 0%, 100%, 0.5)
  if (/^hsla?\(/.test(trimmed)) {
    return true;
  }

  // Check for named colors (basic CSS color names)
  const namedColors = new Set([
    'transparent',
    'currentcolor',
    'inherit',
    'initial',
    'unset',
    'black',
    'white',
    'red',
    'green',
    'blue',
    'yellow',
    'cyan',
    'magenta',
    'silver',
    'gray',
    'maroon',
    'olive',
    'lime',
    'aqua',
    'teal',
    'navy',
    'fuchsia',
    'purple',
    'orange',
    'pink',
    'brown',
  ]);

  if (namedColors.has(trimmed.toLowerCase())) {
    return true;
  }

  return false;
}
