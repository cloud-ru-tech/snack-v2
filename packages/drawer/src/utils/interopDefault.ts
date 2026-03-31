/**
 * В Node ESM default-импорт из части CJS-пакетов приходит как `{ default: value }`, а не как сам `value`.
 * В бандле Vite/Webpack обычно уже подставляется функция/класс.
 */
export function interopDefault<T>(mod: T | { default: T }): T {
  return (typeof mod === 'function' ? mod : (mod as { default: T }).default) as T;
}
