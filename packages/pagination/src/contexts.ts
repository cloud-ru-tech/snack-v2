import { createContext, useContext } from 'react';

import { PAGINATION_SIZE, VARIANT } from './constants';
import type { PaginationSize, Variant } from './types';

export type PaginationContextValue = {
  size: PaginationSize;
  variant: Variant;
};

export const PaginationContext = createContext<PaginationContextValue>({
  size: PAGINATION_SIZE.S,
  variant: VARIANT.Button,
});

export const usePaginationContext = () => useContext(PaginationContext);
