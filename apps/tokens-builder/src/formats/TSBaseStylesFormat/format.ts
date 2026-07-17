import type { Format } from 'style-dictionary/types';

import { AUTO_GENERATED_COMMENT } from '../../types.js';
import { buildTsMapValue } from '../../utils/index.js';

export const format: Format['format'] = ({ dictionary }) => `${AUTO_GENERATED_COMMENT}
  
export const themeVars = ${buildTsMapValue({ dictionary, token: dictionary.tokens })};
`;
