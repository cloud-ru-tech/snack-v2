import type { Format } from 'style-dictionary/types';

import { AUTO_GENERATED_COMMENT } from '../../types.js';
import { isCompositeToken, sortCssCustomProperties } from '../../utils/index.js';
import { getVariableNameFromToken } from '../../utils/tokenVarUtils.js';
import { resolveCssTokenValue } from '../helpers/cssTokenValue.js';

export const format: Format['format'] = ({ dictionary, options }) => {
  const includeFallbackValues = (options?.includeFallbackValues as boolean) ?? true;
  const prefix = (options?.prefix as string) || 'sn';
  const className = options?.className as string | undefined;

  if (!className) {
    throw new Error('className is required for CSSFigmaStylesFormat');
  }

  const lines = dictionary.allTokens.map(token => {
    if (isCompositeToken(token)) {
      return token.$value as string;
    }

    const variableName = getVariableNameFromToken(token);
    const value = resolveCssTokenValue(token, variableName, {
      dictionary,
      includeFallbackValues,
    });

    return `--${variableName}: ${value};`;
  });

  const tokenValues = sortCssCustomProperties(lines).join('\n  ');
  const finalClassName = `${prefix}-${className}`;

  return `${AUTO_GENERATED_COMMENT}
  
.${finalClassName} {
  ${tokenValues}
}
`;
};
