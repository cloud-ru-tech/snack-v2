import { ADAPTIVE_QUERY } from '../constants/adaptive';
import { ValueOf } from './valueOf';

/** Ключ одного из adaptive media-query (`isMobile` / `isTablet` / …). */
export type AdaptiveQuery = ValueOf<typeof ADAPTIVE_QUERY>;

/** Карта `query-key → matched?` для произвольного набора media-query. */
export type MatchMediaGeneric<T extends string> = Record<T, boolean>;
