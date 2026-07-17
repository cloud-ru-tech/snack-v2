import type { Format } from 'style-dictionary/types';

import { FormatName } from '../../types.js';
import { format } from './format.js';

export const SCSSBaseStylesFormat: Format = {
  name: FormatName.SCSSBaseStyles,
  format,
};
