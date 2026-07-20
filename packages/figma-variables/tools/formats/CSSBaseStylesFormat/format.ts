import type { Format, TransformedToken } from 'style-dictionary/types';

import { transformCompositeToken } from '../../transforms/toCSSVariable/helpers/transformCompositeToken.js';
import { AUTO_GENERATED_COMMENT } from '../../types.js';
import { isCompositeToken, sortCssCustomProperties } from '../../utils/index.js';
import { getVariableNameFromToken } from '../../utils/tokenVarUtils.js';
import { resolveCssTokenValue } from '../helpers/cssTokenValue.js';

function isPrimitiveToken(token: TransformedToken): boolean {
  const filePath = (token as unknown as { filePath?: string }).filePath ?? '';
  return filePath.replace(/\\/g, '/').includes('/02_primitive/');
}

export const format: Format['format'] = ({ dictionary, options }) => {
  const includeFallbackValues = (options?.includeFallbackValues as boolean) ?? true;
  const prefix = (options?.prefix as string) || 'sn';
  const className = options?.className as string | undefined;

  const lines = dictionary.allTokens.map(token => {
    if (isCompositeToken(token)) {
      return transformCompositeToken(token as Partial<TransformedToken>, dictionary);
    }

    const variableName = getVariableNameFromToken(token);
    const value = resolveCssTokenValue(token, variableName, {
      dictionary,
      includeFallbackValues,
      isPrimitiveValueOnly: isPrimitiveToken,
    });

    return `--${variableName}: ${value};`;
  });

  const tokenValues = sortCssCustomProperties(lines).join('\n  ');
  const finalClassName = className ? `${prefix}-${className}` : `${prefix}-base-styles`;

  return `${AUTO_GENERATED_COMMENT}
  
.${finalClassName} {
  ${tokenValues}
}
`;
};
