import type { TransformedToken } from 'style-dictionary';

import { transformTokenByType } from './helpers/index.js';

export function transform(token: TransformedToken): string {
  if (!token.$value) {
    return '';
  }

  return transformTokenByType(token);
}
