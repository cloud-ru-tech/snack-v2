import { createContext } from 'react';

type FunctionBadgeContextValue = {
  visible?: boolean;
  setVisible?(value: boolean): void;
};

export const FunctionBadgeContext = createContext<FunctionBadgeContextValue>({
  visible: false,
  setVisible: () => {},
});
