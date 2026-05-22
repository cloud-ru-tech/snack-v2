import { createContext, ReactNode, useContext } from 'react';

export type DrawerCustomLayoutContextValue = {
  /** true только при `heightAuto` и `position` top/bottom; для left/right всегда false */
  heightAutoVertical: boolean;
};

const defaultValue: DrawerCustomLayoutContextValue = {
  heightAutoVertical: false,
};

export const DrawerCustomLayoutContext = createContext<DrawerCustomLayoutContextValue>(defaultValue);

export function DrawerCustomLayoutProvider({
  value,
  children,
}: {
  value: DrawerCustomLayoutContextValue;
  children: ReactNode;
}) {
  return <DrawerCustomLayoutContext.Provider value={value}>{children}</DrawerCustomLayoutContext.Provider>;
}

export function useDrawerCustomLayout(): DrawerCustomLayoutContextValue {
  return useContext(DrawerCustomLayoutContext);
}
