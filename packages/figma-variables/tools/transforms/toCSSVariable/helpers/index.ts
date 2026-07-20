import type { TransformedToken } from 'style-dictionary';

import { CompositeToken } from '../../../types.js';
import { isBoxShadowToken } from '../../../utils/tokenType.js';
import { transformBoxShadowToken } from './transformBoxShadowToken.js';
import { transformCompositeToken } from './transformCompositeToken.js';

export function transformTokenByType(token: Partial<TransformedToken>): string {
  if (isBoxShadowToken(token)) {
    return transformBoxShadowToken(token);
  }

  switch (token.$type ?? token.original?.$type) {
    case CompositeToken.Typography:
    case CompositeToken.Composition:
      return transformCompositeToken(token);
    default: {
      throw new Error(`Uncaught type: <${token.$type ?? token.original?.$type}> in ~ComponentsTransform~`);
    }
  }
}
