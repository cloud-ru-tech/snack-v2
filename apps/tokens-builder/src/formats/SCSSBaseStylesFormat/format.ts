import type { Format } from 'style-dictionary/types';

import { AUTO_GENERATED_COMMENT } from '../../types.js';
import { printPredefinedFunctions } from './scssBaseStylesFunctions.js';
import { printVariableList, printVariableMap } from './scssBaseStylesHelpers.js';

export const format: Format['format'] = ({ dictionary, options }) => {
  const includeFunctions = (options?.includeFunctions as boolean) ?? false;
  const includeFallbackValues = (options?.includeFallbackValues as boolean) ?? true;

  const functionsSection = includeFunctions ? `${printPredefinedFunctions()}\n\n` : '';
  const mapSection = includeFunctions ? `${printVariableMap(dictionary, includeFallbackValues)}\n\n` : '';

  return `${AUTO_GENERATED_COMMENT}
  
${functionsSection}${mapSection}${printVariableList(dictionary, includeFallbackValues)}
`;
};
