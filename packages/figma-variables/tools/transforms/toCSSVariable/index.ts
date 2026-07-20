import type { Transform } from 'style-dictionary/types';

import { TransformName } from '../../types.js';
import { filter } from './filter.js';
import { transform } from './transform.js';

export const ToCSSVariableTransform: Transform = {
  type: 'value',
  transitive: true,
  name: TransformName.CustomCssVariable,
  filter,
  transform,
};
