/** Проверка браузерной среды (SSR-safe). Локальная копия — чтобы SSR-путь `@ds/adaptive/ssr`
 * не тянул баррель `@ds/utils` (createContext/хуки) в React Server Components. */
export function isBrowser() {
  // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi
  return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
}
