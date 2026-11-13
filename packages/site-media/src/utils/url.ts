import { isBrowser } from '@ds/utils';

export function resolveUrl(path: string, base: string) {
  if (isBrowser()) {
    try {
      return new URL(path, new URL(base, window.location.href)).href;
    } catch {
      return undefined;
    }
  }

  return undefined;
}
