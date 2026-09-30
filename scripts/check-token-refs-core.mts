/**
 * Чистая логика `check-token-refs.mts` — вынесена отдельно, чтобы покрыть unit-тестами
 * (`scripts/__tests__/check-token-refs.test.ts`). Никакого I/O: на вход тексты файлов, на выход — отчёт.
 */

/** Ссылка на токен: `var(--sn-…`. Имя — первая группа. */
const REFERENCE = /var\(\s*(--sn-[\w-]+)/g;

/** Объявление в CSS или в JS-объекте стилей: `--sn-foo: …` / `'--sn-foo': …`. */
const DECLARATION = /(--sn-[\w-]+)['"]?\s*:/g;

/** Объявление через `style.setProperty('--sn-foo', …)` — так ставит токены `@ds/theme` в рантайме. */
const SET_PROPERTY = /setProperty\(\s*['"`](--sn-[\w-]+)['"`]/g;

/**
 * Роль ссылки в цепочке `var(--a, var(--b, value))`:
 * - `primary` — первая ссылка цепочки, браузер читает её всегда. Если токена нет — стиль сломан.
 * - `fallback` — вложена в фолбэк другой ссылки. Если токена нет — сборка устарела, но на отрисовку
 *   это влияет, только когда не объявлен и `primary`.
 */
export type RefKind = 'primary' | 'fallback';

export type ScanResult = {
  declared: Set<string>;
  refs: Map<string, RefKind>;
};

export type MissingRefs = {
  primary: string[];
  fallback: string[];
};

/** Ссылка стоит в фолбэке, если перед `var(` (без учёта пробелов) идёт запятая. */
function isFallback(text: string, varIndex: number): boolean {
  for (let i = varIndex - 1; i >= 0; i--) {
    const ch = text[i];
    if (ch === ' ' || ch === '\n' || ch === '\t' || ch === '\r') continue;
    return ch === ',';
  }
  return false;
}

export function scanText(text: string, into: ScanResult = { declared: new Set(), refs: new Map() }): ScanResult {
  for (const m of text.matchAll(DECLARATION)) into.declared.add(m[1]);
  for (const m of text.matchAll(SET_PROPERTY)) into.declared.add(m[1]);

  for (const m of text.matchAll(REFERENCE)) {
    const name = m[1];
    const kind: RefKind = isFallback(text, m.index) ? 'fallback' : 'primary';
    // Одна primary-ссылка важнее любого числа fallback-ссылок на тот же токен.
    if (into.refs.get(name) !== 'primary') into.refs.set(name, kind);
  }

  return into;
}

export function scanTexts(texts: Iterable<string>): ScanResult {
  const result: ScanResult = { declared: new Set(), refs: new Map() };
  for (const text of texts) scanText(text, result);
  return result;
}

/**
 * Ссылки пакета, которых нет среди известных токенов. Токены, объявленные самим пакетом
 * (локальные переменные компонента), не считаются пропавшими.
 */
export function findMissing(pkg: ScanResult, known: ReadonlySet<string>): MissingRefs {
  const missing: MissingRefs = { primary: [], fallback: [] };

  for (const [name, kind] of pkg.refs) {
    if (known.has(name) || pkg.declared.has(name)) continue;
    missing[kind].push(name);
  }

  missing.primary.sort();
  missing.fallback.sort();
  return missing;
}

export function hasMissing(missing: MissingRefs): boolean {
  return missing.primary.length > 0 || missing.fallback.length > 0;
}

/** `@ds/button` → `@cloud-ru/ds-button` — то же переименование, что делает `transform-scope.mts` перед публикацией. */
export function toPublishedName(name: string, fromScope: string, toScope: string, prefix: string): string {
  const head = `${fromScope}/`;
  if (!name.startsWith(head)) return name;
  return `${toScope}/${prefix}${name.slice(head.length)}`;
}

/** Вывод `scripts/changed-packages.mts` (`slug1,slug2`) → множество slug'ов. Пустой вывод — пустое множество. */
export function parseSlugList(raw: string): Set<string> {
  return new Set(
    raw
      .split(',')
      .map(s => s.trim())
      .filter(Boolean),
  );
}

/**
 * Шаблоны `ignoreChanges` из `lerna.json` в коротком виде для отчёта: `packages/*\/docs/**\/*.*` → `docs/`,
 * `**\/*.md` → `*.md`. Шаблоны вне пакетов (`./scripts/**\/*`) на выпуск пакетов не влияют и отбрасываются,
 * варианты, отличающиеся только регистром (`*.md` / `*.MD`), схлопываются.
 */
export function simplifyIgnoreGlobs(globs: string[]): string[] {
  const out = new Map<string, string>();

  for (const glob of globs) {
    let short: string;
    if (glob.startsWith('packages/*/')) {
      short = glob.slice('packages/*/'.length).replace(/\/\*\*\/\*(\.\*)?$/, '/');
    } else if (glob.startsWith('**/')) {
      short = glob.slice('**/'.length);
    } else {
      continue;
    }
    if (!out.has(short.toLowerCase())) out.set(short.toLowerCase(), short);
  }

  return [...out.values()];
}

export type StaleItem = {
  slug: string;
  label: string;
  version: string;
  missing: MissingRefs;
};

/** Оформление строк отчёта. В тестах и без TTY — тождественные функции, в CI — ANSI-цвета. */
export type Paint = {
  error: (text: string) => string;
  accent: (text: string) => string;
  dim: (text: string) => string;
};

export const plainPaint: Paint = { error: t => t, accent: t => t, dim: t => t };

const TOKENS_PREVIEW = 3;

function tokensLine(kind: string, list: string[], verbose: boolean): string {
  const shown = verbose ? list : list.slice(0, TOKENS_PREVIEW);
  const rest = list.length - shown.length;
  return `    ${kind}, ${list.length}: ${shown.join(', ')}${rest > 0 ? ` и ещё ${rest}` : ''}`;
}

/**
 * Блок отчёта об устаревших пакетах. Каждая строка — законченная мысль без ручных переносов:
 * GitLab переносит длинные строки сам и не показывает пустые, поэтому структура держится на отступах и маркерах.
 */
export function formatStaleReport(
  items: StaleItem[],
  opts: { mode: 'registry' | 'local'; ignoreChanges: string[]; verbose: boolean; paint?: Paint },
): string[] {
  const paint = opts.paint ?? plainPaint;
  const hasPrimary = items.some(item => item.missing.primary.length > 0);

  const title =
    opts.mode === 'registry'
      ? `✗ Нужно выпустить пакеты: ${items.length} — опубликованная сборка ссылается на удалённые токены`
      : `✗ Нужно пересобрать пакеты: ${items.length} — локальный dist ссылается на удалённые токены`;

  const lines = ['', paint.error(title)];

  for (const { slug, label, version, missing } of items) {
    lines.push(`  • ${paint.accent(`${label}@${version}`)} ${paint.dim(`(packages/${slug})`)}`);
    if (missing.primary.length) {
      lines.push(paint.error(tokensLine('сломано, стиль уже не работает', missing.primary, opts.verbose)));
    }
    if (missing.fallback.length) {
      lines.push(tokensLine('устарело в fallback, на отрисовку не влияет', missing.fallback, opts.verbose));
    }
  }

  lines.push('');

  if (opts.mode === 'registry') {
    const ignored = simplifyIgnoreGlobs(opts.ignoreChanges).join(', ');
    lines.push(
      paint.accent('Как исправить:') +
        ' добавь в src/ каждого пакета незначащую правку (например, комментарий) и закоммить её с префиксом fix — lerna включит пакеты в следующий релиз.',
      `  git commit -m "fix: rebuild on current figma-variables tokens"`,
      `Правки в ${ignored} не подходят — lerna их не учитывает.`,
    );
  } else {
    lines.push(paint.accent('Как исправить:') + ' пересобери пакеты (pnpm build:pkg <slug>) и запусти проверку снова.');
  }

  if (hasPrimary) {
    lines.push('Для «сломано» одной пересборки мало: сначала замени токен в исходниках пакета.');
  }
  if (
    !opts.verbose &&
    items.some(item => item.missing.primary.length + item.missing.fallback.length > TOKENS_PREVIEW)
  ) {
    lines.push(paint.dim('Полный список токенов: pnpm check:token-refs --verbose'));
  }
  lines.push(paint.dim('Подробнее: packages/figma-variables/README.md, раздел «Проверка ссылок на токены».'));

  return lines;
}
