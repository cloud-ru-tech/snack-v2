import { resolveDomainId } from '../config/domains';

const COMPONENT_PATH_PATTERN = /\/components\/([^/]+)/;

/** Extracts the package slug from a component-page pathname, or undefined. */
export function pkgFromPath(pathname: string): string | undefined {
  return pathname.match(COMPONENT_PATH_PATTERN)?.[1];
}

/** Returns the domain id for a given pathname (e.g. "/components/ai-suggestion" → "ai"). */
export function domainIdForPath(pathname: string): string | undefined {
  const pkg = pkgFromPath(pathname);
  return pkg ? resolveDomainId(pkg) : undefined;
}
