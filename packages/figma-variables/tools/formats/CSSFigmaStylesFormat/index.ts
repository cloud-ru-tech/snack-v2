import type { Format } from 'style-dictionary/types';

import { FormatName } from '../../types.js';
import { format } from './format.js';

export const CSSFigmaStylesFormat: Format = {
  name: FormatName.CSSFigmaStyles,
  format,
};
