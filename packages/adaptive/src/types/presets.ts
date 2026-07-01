import { LayoutType } from './layoutTypes';

/**
 * Карта пресетов дефолтов по раскладке: для каждого `layoutType` — частичный набор пропов поверх
 * базовых дефолтов. Обычно непуст только `mobile`. Резолв — `resolveByLayout` / `useLayoutDefaults`.
 */
export type LayoutPresets<P> = Partial<Record<LayoutType, Partial<P>>>;
