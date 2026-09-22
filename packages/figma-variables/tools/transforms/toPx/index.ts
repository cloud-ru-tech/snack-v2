import type { Transform } from 'style-dictionary/types';

import { TransformName } from '../../types.js';
import { transformDimensionToPx } from '../../utils/transformDimensionToPx.js';
import { filter } from './filter.js';

export const ToPXTransform: Transform = {
  name: TransformName.CustomPx,
  type: 'value',
  transitive: true,
  filter,
  transform: transformDimensionToPx,
};
