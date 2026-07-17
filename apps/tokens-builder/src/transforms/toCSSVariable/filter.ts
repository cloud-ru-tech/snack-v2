import type { TransformedToken } from 'style-dictionary';

import { isCompositeToken } from '../../utils/tokenType.js';

export function filter(token: TransformedToken): boolean {
  return isCompositeToken(token);
}
