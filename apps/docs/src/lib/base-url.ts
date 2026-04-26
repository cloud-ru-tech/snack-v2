/**
 * Root-relative URL with Astro `base` (`import.meta.env.BASE_URL` from `astro.config` `base`).
 * Page routes get a trailing `/` (matches `trailingSlash: 'always'`).
 * Do not use for static asset paths (`.../pagefind/...`, file URLs).
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = path.replace(/^\/+/, '');
  let out = `${base}${normalized}`;
  if (!out.endsWith('/')) out += '/';
  return out;
}

/** Compare paths whether or not they include a trailing slash. */
export function pathsMatch(a: string, b: string): boolean {
  return normPath(a) === normPath(b);
}

function normPath(p: string): string {
  const t = p.replace(/\/+$/, '');
  return t === '' ? '/' : t;
}
