import { transformDimension } from '@tokens-studio/sd-transforms';
import type { Dictionary, TransformedToken } from 'style-dictionary';

import { VARIABLES_WITHOUT_PX } from '../../../types.js';
import { buildCssVarChain, normalizeOpacityForCss, toKebabCase } from '../../../utils/index.js';

export function transformCompositeToken(token: Partial<TransformedToken>, dictionary?: Dictionary): string {
  const name = token.path?.join('-') ?? token.name ?? '';

  const flattenedValue = Object.entries(token.$value ?? {}).map(([key, value]) => {
    const originalValue = token.original?.$value?.[key];
    const hasVariableInside = value !== originalValue;

    // Проверяем, является ли originalValue ссылкой вида {sn.path.to.token}
    const originalString = typeof originalValue === 'string' ? originalValue.trim() : null;
    const singleReferenceMatch = originalString?.match(/^\{([^}]+)\}$/);

    let stringValue: string;

    if (hasVariableInside && singleReferenceMatch && singleReferenceMatch[1] && dictionary) {
      // Если есть ссылка и dictionary доступен, строим полную цепочку зависимостей
      stringValue = buildCssVarChain({
        dictionary,
        referencePath: singleReferenceMatch[1],
        includeFallbackValues: true,
        currentToken: token as TransformedToken,
      });
    } else {
      const refPath = singleReferenceMatch?.[1];
      const varNameForRef = refPath
        ? refPath.split('.').join('-')
        : toKebabCase(String(token.original?.$value?.[key] ?? key));
      const kebabVarName = toKebabCase(varNameForRef);
      let fallbackValue: string;
      if (VARIABLES_WITHOUT_PX.some(variable => kebabVarName.includes(variable))) {
        fallbackValue =
          typeof value === 'string' || typeof value === 'number'
            ? String(normalizeOpacityForCss(value, kebabVarName))
            : String(value);
      } else {
        fallbackValue = String(transformDimension({ $value: value as number | string }));
      }

      if (typeof value === 'string' && isNaN(Number(value)) && value !== 'true' && value !== 'false') {
        fallbackValue = `"${fallbackValue.replace(/"/g, '\\"')}"`;
      }

      stringValue = hasVariableInside ? `var(--${varNameForRef}, ${fallbackValue})` : fallbackValue;
    }

    return `--${name}-${key}: ${stringValue};`;
  });

  return `/* ${name} */
  ${flattenedValue.join('\n  ')}`;
}
