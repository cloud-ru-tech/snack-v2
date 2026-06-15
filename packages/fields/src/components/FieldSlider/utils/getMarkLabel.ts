import { ReactNode } from 'react';

import { isMarkObject } from './isMarkObject';

export function getMarkLabel(mark: unknown): ReactNode {
  return isMarkObject(mark) ? mark.label : (mark as ReactNode);
}
