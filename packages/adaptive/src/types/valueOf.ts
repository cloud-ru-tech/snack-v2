/** Значение объекта-константы как union. Локальная копия (см. isBrowser.ts — SSR-purity). */
export type ValueOf<T> = T[keyof T];
