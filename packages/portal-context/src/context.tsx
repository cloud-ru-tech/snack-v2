import { isBrowser } from '@design-system/utils';
import { createContext, PropsWithChildren, RefObject, useContext } from 'react';

const DEFAULT_CONTEXT_VALUE = { current: isBrowser() ? document.body : null } as RefObject<HTMLElement | null>;

const PortalContext = createContext(DEFAULT_CONTEXT_VALUE);

export type PortalContextProviderProps<T extends RefObject<HTMLElement | null>> = PropsWithChildren<{
  root?: T;
}>;

export function PortalContextProvider<T extends RefObject<HTMLElement | null>>({
  root,
  children,
}: PortalContextProviderProps<T>) {
  return <PortalContext.Provider value={root ?? DEFAULT_CONTEXT_VALUE}>{children}</PortalContext.Provider>;
}

export function usePortalContext() {
  return useContext(PortalContext);
}
