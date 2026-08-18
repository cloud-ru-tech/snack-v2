import { categoriesForDomain } from '../../../../docs/src/config/categories';
import { DOMAINS } from '../../../../docs/src/config/domains';

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

const DOMAIN_BY_LABEL = new Map(DOMAINS.map(domain => [toKebab(domain.storybookLabel), domain]));

/**
 * Снимает с сегментов title группировочную «шапку» и возвращает варианты сегментов, из которых
 * может складываться имя пакета. `main.ts` переписывает title в `<домен>/<категория>/<компонент>`
 * (см. regroupTitle), поэтому категория отбрасывается всегда — в имени пакета она не участвует.
 * С доменом сложнее: у дефолтного домена префикса нет, а у остальных имя компонента может уже
 * нести префикс (`AiCard` → `ai-card`) или не нести (`Copy` → `uikit-product-copy`), поэтому
 * для них проверяются оба варианта, начиная с префиксного.
 */
function candidateSegments(title: string): string[][] {
  const segments = title
    .split('/')
    .map(raw => raw.trim())
    .filter(Boolean)
    .map(toKebab);

  const [first, ...rest] = segments;
  // Легаси-title без домен-группировки: `Components/...` — тот же случай, что домен без префикса.
  if (first === 'components') {
    return [rest];
  }
  const domain = DOMAIN_BY_LABEL.get(first);
  if (!domain) {
    return [segments];
  }
  const tail = categoriesForDomain(domain.id).some(category => toKebab(category.label) === rest[0])
    ? rest.slice(1)
    : rest;
  return domain.prefix ? [[first, ...tail], tail] : [tail];
}

/**
 * Резолвит pkg по `title` story. Стратегия — взять сегменты title без группировочной шапки
 * (домен + категория) и найти самый длинный префикс-конкат, что матчится со списком известных
 * пакетов. Возвращает имя пакета и оставшиеся сегменты после него.
 *
 *   `Snack/Data display/Avatar` → `{ pkg: 'avatar', rest: [] }`
 *   `Snack/Actions/Button/Button` → `{ pkg: 'button', rest: ['button'] }`
 *   `Snack/Inputs & forms/Toggles/Checkbox` → `{ pkg: 'toggles', rest: ['checkbox'] }`
 *   `Uikit Product/Data display/Copy/CopyLine` → `{ pkg: 'uikit-product-copy', rest: ['copy-line'] }`
 *   `AI/Feedback/AiCard` → `{ pkg: 'ai-card', rest: [] }`
 */
export function resolvePkgFromTitle(title: string, knownPkgs: Record<string, unknown>): ResolvedPkg | undefined {
  for (const segments of candidateSegments(title)) {
    for (let take = segments.length; take > 0; take--) {
      const candidate = segments.slice(0, take).join('-');
      if (knownPkgs[candidate]) {
        return { pkg: candidate, rest: segments.slice(take) };
      }
    }
  }
  return undefined;
}
