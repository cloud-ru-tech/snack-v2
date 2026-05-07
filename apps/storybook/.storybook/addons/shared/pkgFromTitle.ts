function toKebab(input: string): string {
  return input
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export type ResolvedPkg = {
  pkg: string;
  /** Сегменты title после распознанного pkg (kebab-case). Используются для sub-ключей. */
  rest: string[];
};

/**
 * Резолвит pkg по `title` story. Стратегия — взять все сегменты title (без ведущего «Components»),
 * привести к kebab-case, и найти самый длинный префикс-конкат, что матчится со списком известных
 * пакетов. Возвращает имя пакета и оставшиеся сегменты после него.
 *
 *   `Components/Avatar` → `{ pkg: 'avatar', rest: [] }`
 *   `Components/Button/Button` → `{ pkg: 'button', rest: ['button'] }`
 *   `Components/Toggles/Checkbox` → `{ pkg: 'toggles', rest: ['checkbox'] }`
 *   `Uikit Product/Copy/CopyLine` → `{ pkg: 'uikit-product-copy', rest: ['copy-line'] }`
 */
export function resolvePkgFromTitle(title: string, knownPkgs: Record<string, unknown>): ResolvedPkg | undefined {
  const segments = title.split('/').reduce<string[]>((acc, raw, i) => {
    const s = raw.trim();
    if (!s) {
      return acc;
    }
    if (i === 0 && s.toLowerCase() === 'components') {
      return acc;
    }
    acc.push(toKebab(s));
    return acc;
  }, []);

  for (let take = segments.length; take > 0; take--) {
    const candidate = segments.slice(0, take).join('-');
    if (knownPkgs[candidate]) {
      return { pkg: candidate, rest: segments.slice(take) };
    }
  }
  return undefined;
}
