import type { TransformedToken } from 'style-dictionary';

import { buildShadowLayers } from './buildShadowLayers.js';
import { formatBoxShadowValue } from './formatBoxShadowValue.js';
import { isBoxShadowToken } from './tokenType.js';

export const objectTokenTransform = (token: TransformedToken): string => {
  if (isBoxShadowToken(token)) {
    return formatBoxShadowValue(buildShadowLayers(token));
  }

  if (Array.isArray(token.$value)) {
    return token.$value.map(value => String(value ?? '')).join(', ');
  }

  if (token.$value && typeof token.$value === 'object') {
    return JSON.stringify(token.$value);
  }

  return String(token.$value ?? '');
};
