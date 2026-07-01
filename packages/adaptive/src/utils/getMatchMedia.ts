import { ADAPTIVE_QUERIES, INITIAL_ADAPTIVE_QUERIES_VALUE } from '../constants/adaptive';
import { MatchMediaGeneric } from '../types/adaptive';
import { isBrowser } from './isBrowser';

function getMediaQueries<T extends string>({ queryValues }: { queryValues: Record<T, string> }) {
  return Object.keys(queryValues).reduce(
    (acc, key) => ({
      ...acc,
      [key]: isBrowser() ? globalThis.matchMedia(queryValues[key as T]) : undefined,
    }),
    {} as Record<T, MediaQueryList>,
  );
}

/** Возвращает пары `[query-key, MediaQueryList]` для подписки на `change`. */
export function getMediaQueryListGeneric<T extends string>({ queryValues }: { queryValues: Record<T, string> }) {
  return Object.entries(getMediaQueries({ queryValues })) as Array<[T, MediaQueryList]>;
}

/** Снимок текущего состояния media-query (`query-key → matched?`); SSR → `initialValues`. */
export function getMatchMediaGeneric<T extends string>({
  queryValues,
  initialValues,
}: {
  queryValues: Record<T, string>;
  initialValues: MatchMediaGeneric<T>;
}): MatchMediaGeneric<T> {
  return getMediaQueryListGeneric<T>({ queryValues }).reduce(
    (acc, [key, q]) => ({ ...acc, [key]: q?.matches || false }),
    initialValues,
  );
}

/** Снимок adaptive media-query (`isMobile` / `isTablet` / …). */
export const getAdaptiveMatchMedia = () =>
  getMatchMediaGeneric({ queryValues: ADAPTIVE_QUERIES, initialValues: INITIAL_ADAPTIVE_QUERIES_VALUE });
