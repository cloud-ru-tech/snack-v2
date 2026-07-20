import type { Transform } from 'style-dictionary/types';

import { VARIABLES_WITHOUT_PX } from '../../types.js';

export const filter: Transform['filter'] = token => {
  const type = token.$type ?? token.type;
  return type === 'number' && !VARIABLES_WITHOUT_PX.some(name => token.name.includes(name));
};
