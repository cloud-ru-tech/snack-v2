import { transformDimension } from '@tokens-studio/sd-transforms';
import type { Transform } from 'style-dictionary/types';

import { TransformName } from '../../types.js';
import { filter } from './filter.js';

export const ToPXTransform: Transform = {
  name: TransformName.CustomPx,
  type: 'value',
  transitive: true,
  filter,
  transform: transformDimension,
};
