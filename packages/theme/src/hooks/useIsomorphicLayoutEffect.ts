// eslint-disable-next-line no-restricted-imports -- единственная точка, где берём сырой useLayoutEffect
import { useEffect, useLayoutEffect } from 'react';

/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- это и есть SSR-guard, DOM читается только для детекта браузера */

function isBrowser(): boolean {
  return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
}

/* eslint-enable @cloud-ru/ssr-safe-react/domApi */

/**
 * `useLayoutEffect`, безопасный для SSR: на клиенте — настоящий `useLayoutEffect` (применяет эффект
 * синхронно до пейнта, поэтому инъекция бренд-`<style>` не даёт кадра с дефолтным акцентом — «моргания»),
 * на сервере — `useEffect` (сырой `useLayoutEffect` на сервере варнит и всё равно не выполняется).
 */
export const useIsomorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
