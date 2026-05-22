import { createContext, useContext } from 'react';

import { RADIUS } from './constants';
import { Radius } from './types';

export type CardContextValue = {
  radius: Radius;
  disabled: boolean;
};

export const CardContext = createContext<CardContextValue>({
  radius: RADIUS.M,
  disabled: false,
});

export function useCardContext() {
  return useContext(CardContext);
}
