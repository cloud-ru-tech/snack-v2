import { THEME_OVERRIDE_STORAGE_KEY } from '../constants/colorScheme';

/**
 * Возвращает строку синхронного inline-скрипта для `<head>` (до `<body>`): читает override из
 * cookie + `prefers-color-scheme` и ставит `sn-light`/`sn-dark` на корень ДО первой отрисовки —
 * устраняет «моргание» темы при перезагрузке. Вставляется через `<script dangerouslySetInnerHTML>`
 * (Next) или статическим `<script>` в `<head>` (single-spa). Читает ту же cookie, что и SSR.
 *
 * `target` — CSS-селектор корня; по умолчанию `<html>` (`document.documentElement`).
 */
export function getThemeBootstrapScript(options?: { storageKey?: string; target?: string }): string {
  const storageKey = JSON.stringify(options?.storageKey ?? THEME_OVERRIDE_STORAGE_KEY);
  const target = options?.target
    ? `document.querySelector(${JSON.stringify(options.target)})`
    : 'document.documentElement';

  return `(function(){try{var k=${storageKey},m=document.cookie.match(new RegExp('(?:^|; )'+k+'=([^;]*)')),o=m?decodeURIComponent(m[1]):null,d=(o==='dark')||((o==='system'||!o)&&matchMedia('(prefers-color-scheme: dark)').matches),el=${target};if(el){el.classList.toggle('sn-dark',d);el.classList.toggle('sn-light',!d);}}catch(e){}})();`;
}
