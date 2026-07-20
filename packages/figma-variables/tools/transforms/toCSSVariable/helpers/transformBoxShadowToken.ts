import type { TransformedToken } from 'style-dictionary';

import { buildShadowLayers, formatBoxShadowValue } from '../../../utils/index.js';

export function transformBoxShadowToken(token: Partial<TransformedToken>): string {
  const name = token.path?.join('-') ?? token.name ?? '';
  const shadowLayers = buildShadowLayers(token);

  return `--${name}: ${formatBoxShadowValue(shadowLayers)};`;
}
