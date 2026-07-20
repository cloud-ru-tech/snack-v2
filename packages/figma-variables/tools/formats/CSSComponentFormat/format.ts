import type { Dictionary, Format, TransformedToken } from 'style-dictionary/types';

import { AUTO_GENERATED_COMMENT } from '../../types.js';
import {
  buildCssVarChain,
  getComponentVariableReferenceCss,
  getCssVarFallback,
  sortCssCustomProperties,
} from '../../utils/index.js';
import {
  getTokenReferencePath,
  getVariableNameFromToken,
  isNumericString,
  pathToVarName,
} from '../../utils/tokenVarUtils.js';

function getTokenValues(
  dictionary: Dictionary,
  componentName: string,
  componentTokens: Array<{ path?: string[]; original?: { $value?: unknown }; $value?: unknown; $type?: string }>,
  includeFallbackValues: boolean = true,
): string {
  const componentTokenLines = componentTokens
    .map(token => {
      const path = token.path || [];
      if (path.length < 2 || path[1] !== componentName) return null;

      const variableName = getVariableNameFromToken(token);
      const valueRef = getComponentVariableReferenceCss(
        path,
        token,
        componentName,
        componentTokens.map(t => ({ path: t.path })),
      );
      const fallbackValue = getCssVarFallback({ token: token as TransformedToken, variableName });

      let stringValue: string;
      const refPath = getTokenReferencePath(token.original?.$value);

      if (refPath) {
        stringValue = buildCssVarChain({
          dictionary,
          referencePath: refPath,
          includeFallbackValues,
          currentToken: token as TransformedToken,
        });
      } else if (valueRef.startsWith('var(')) {
        // Already a CSS variable reference - extract variable name and check if referenced token has dependencies
        const varMatch = valueRef.match(/var\(--([^,)]+)/);
        if (varMatch && varMatch[1]) {
          const varName = varMatch[1].trim();

          // Find the token by variable name
          const referencedToken = dictionary.allTokens.find(t => {
            const tokenPath = t.path || [];
            const tokenVarName = pathToVarName(tokenPath as string[]);
            return tokenVarName === varName;
          });

          if (referencedToken) {
            const refTokenPath = getTokenReferencePath(referencedToken.original?.$value);
            if (refTokenPath) {
              stringValue = buildCssVarChain({
                dictionary,
                referencePath: (referencedToken.path || []).join('.'),
                includeFallbackValues,
                currentToken: referencedToken,
              });
            } else {
              // No chain needed, use as-is but ensure we have fallback if needed
              stringValue = valueRef.includes(',')
                ? valueRef
                : `var(--${variableName}, var(--${varName}, ${fallbackValue}))`;
            }
          } else {
            // Token not found, use as-is
            stringValue = valueRef;
          }
        } else {
          // Could not extract variable name, use as-is
          stringValue = valueRef;
        }
      } else if (valueRef.startsWith('"') || isNumericString(valueRef) || !valueRef.startsWith('--')) {
        stringValue = refPath
          ? buildCssVarChain({
              dictionary,
              referencePath: refPath,
              includeFallbackValues,
              currentToken: token as TransformedToken,
            })
          : valueRef;
      } else {
        if (refPath) {
          stringValue = buildCssVarChain({
            dictionary,
            referencePath: refPath,
            includeFallbackValues,
            currentToken: token as TransformedToken,
          });
        } else if (valueRef.startsWith('--')) {
          stringValue = `var(--${variableName}, var(${valueRef}, ${fallbackValue}))`;
        } else {
          stringValue = valueRef;
        }
      }

      return `--${variableName}: ${stringValue};`;
    })
    .filter((line): line is string => line !== null);

  const sortedLines = sortCssCustomProperties(componentTokenLines);
  return sortedLines.join('\n  ');
}

export const format: Format['format'] = ({ dictionary, options }) => {
  const componentName = (options?.componentName as string) || 'component';
  const prefix = (options?.prefix as string) || 'sn';
  const includeFallbackValues = (options?.includeFallbackValues as boolean) ?? true;

  // Get all tokens for this component
  const componentTokens = dictionary.allTokens.filter(token => {
    const path = token.path || [];
    return path.length > 1 && path[1] === componentName;
  });

  if (componentTokens.length === 0) {
    const finalClassName = `${prefix}-${componentName}`;
    return `${AUTO_GENERATED_COMMENT}
  
.${finalClassName} {
}
`;
  }

  const tokenValues = getTokenValues(dictionary, componentName, componentTokens, includeFallbackValues);
  const finalClassName = `${prefix}-${componentName}`;

  return `${AUTO_GENERATED_COMMENT}
  
.${finalClassName} {
  ${tokenValues}
}
`;
};
