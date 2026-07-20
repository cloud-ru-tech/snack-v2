import type { Filter } from 'style-dictionary/types';

import { FilterName } from '../types.js';

export const SourceTokensFilter: Filter = {
  name: FilterName.SourceTokens,
  filter: token => token.isSource,
};
