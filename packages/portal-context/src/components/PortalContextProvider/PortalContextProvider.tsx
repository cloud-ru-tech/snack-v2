import { PropsWithChildren, RefObject } from 'react';

import { PortalRootProvider } from '../../context/portalContext';
import { getGlobalPortalRoot } from '../../store/globalStore';

export type PortalContextProviderProps<T extends RefObject<HTMLElement | null>> = PropsWithChildren<{
  root?: T;
}>;

export function PortalContextProvider<T extends RefObject<HTMLElement | null>>({
  root,
  children,
}: PortalContextProviderProps<T>) {
  return <PortalRootProvider value={root ?? getGlobalPortalRoot()}>{children}</PortalRootProvider>;
}
