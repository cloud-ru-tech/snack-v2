/**
 * Builds the machine-readable `llms.txt` content (root index + per-package install,
 * API, related types, examples). Driven by astro.config.mjs: written to the build
 * output at build, served live by a dev middleware. Format: llmstxt.org + Mantine.
 *
 * Source: packages/<pkg>/docs/index.mdx (frontmatter + "Когда использовать"),
 * docs/props.json (typed props), demos/examples/*.tsx (raw examples).
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { categoriesForDomain, domainHasCategories, OTHER_CATEGORY, resolveCategoryId } from '../config/categories';
import { DOMAINS, resolveDomainId } from '../config/domains';

function pushTo<T>(map: Map<string, T[]>, key: string, value: T): void {
  const list = map.get(key);
  if (list) list.push(value);
  else map.set(key, [value]);
}

type PropDoc = {
  type?: string;
  required?: boolean;
  values?: string[];
  defaultValue?: string;
  description?: string;
};
type ComponentDoc = {
  displayName?: string;
  propsTypeName?: string;
  props?: Record<string, PropDoc>;
  relatedTypes?: Record<string, { kind?: string; values?: string[] }>;
};

type PkgInfo = {
  slug: string;
  npmName: string;
  title: string;
  description: string;
  whenToUse: string;
  propsData: Record<string, ComponentDoc>;
  examples: { title: string; code: string }[];
};

// ─── Collection ──────────────────────────────────────────────────────────────

function parseFrontmatter(raw: string): Record<string, string> {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].replace(/^['"]|['"]$/g, '').trim();
  }
  return out;
}

// Body of the "Когда использовать" H2 as plain text (MDX imports/JSX stripped).
function extractWhenToUse(mdx: string): string {
  const body = mdx.replace(/^---\n[\s\S]*?\n---\n/, '');
  const start = body.search(/^##\s+Когда использовать\s*$/m);
  if (start === -1) return '';
  const afterHeading = body.indexOf('\n', start) + 1;
  const nextH2 = body.slice(afterHeading).search(/^##\s/m);
  const section = nextH2 === -1 ? body.slice(afterHeading) : body.slice(afterHeading, afterHeading + nextH2);
  return section
    .split('\n')
    .filter(l => !/^\s*import\s/.test(l) && !/^\s*</.test(l))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function loadExamples(pkgDir: string): { title: string; code: string }[] {
  const dir = resolve(pkgDir, 'demos/examples');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.tsx'))
    .sort()
    .map(f => ({ title: f.replace(/\.tsx$/, ''), code: readFileSync(resolve(dir, f), 'utf-8').trimEnd() }));
}

export function collectPackages(packagesDir: string): PkgInfo[] {
  const out: PkgInfo[] = [];
  for (const slug of readdirSync(packagesDir).sort()) {
    const pkgDir = resolve(packagesDir, slug);
    const indexMdx = resolve(pkgDir, 'docs/index.mdx');
    if (!existsSync(indexMdx)) continue;

    const raw = readFileSync(indexMdx, 'utf-8');
    const fm = parseFrontmatter(raw);
    const propsPath = resolve(pkgDir, 'docs/props.json');
    const propsData: Record<string, ComponentDoc> = existsSync(propsPath)
      ? (JSON.parse(readFileSync(propsPath, 'utf-8')) as Record<string, ComponentDoc>)
      : {};
    const pkgJson = JSON.parse(readFileSync(resolve(pkgDir, 'package.json'), 'utf-8')) as { name?: string };

    out.push({
      slug,
      npmName: pkgJson.name ?? fm.package ?? `@ds/${slug}`,
      title: fm.title ?? slug,
      description: fm.description ?? '',
      whenToUse: extractWhenToUse(raw),
      propsData,
      examples: loadExamples(pkgDir),
    });
  }
  return out;
}

// ─── Rendering ───────────────────────────────────────────────────────────────

// `|` is the markdown table column separator and breaks cells (incl. inside the
// `a | b | c` enum unions), so escape it in every cell.
const cell = (s: string): string => s.replace(/\|/g, '\\|').replace(/\n/g, ' ').trim();

function propType(p: PropDoc): string {
  if (p.type === 'enum' && p.values?.length) return p.values.join(' | ');
  return p.type ?? 'unknown';
}

function renderComponentApi(name: string, doc: ComponentDoc): string {
  const props = doc.props ?? {};
  const names = Object.keys(props).sort();
  const out: string[] = [`### ${name}`];

  if (names.length) {
    out.push('| Prop | Type | Default | Required | Description |');
    out.push('|------|------|---------|----------|-------------|');
    for (const n of names) {
      const p = props[n];
      out.push(
        `| \`${cell(n)}\` | \`${cell(propType(p))}\` | ${p.defaultValue ? `\`${cell(p.defaultValue)}\`` : '—'} | ${p.required ? 'yes' : 'no'} | ${cell(p.description ?? '')} |`,
      );
    }
  } else {
    out.push('_Нет публичных пропсов._');
  }

  const related = Object.entries(doc.relatedTypes ?? {});
  if (related.length) {
    out.push('', '#### Related types');
    for (const [tname, t] of related) {
      out.push(
        t.values?.length ? `- \`${tname}\` = \`${t.values.join(' | ')}\`` : `- \`${tname}\` (${t.kind ?? 'type'})`,
      );
    }
  }
  return out.join('\n');
}

export function renderPackage(pkg: PkgInfo, base: string): string {
  const parts: string[] = [`# ${pkg.npmName}`];
  if (pkg.description) parts.push(`> ${pkg.description}`);
  parts.push(`Docs: ${base}components/${pkg.slug}/`);

  parts.push(`## Установка\n\n\`\`\`sh\npnpm add ${pkg.npmName}\n\`\`\``);

  if (pkg.whenToUse) parts.push(`## Когда использовать\n\n${pkg.whenToUse}`);

  const components = Object.entries(pkg.propsData)
    .filter(([name]) => /^[A-Z]/.test(name) && !name.includes('.'))
    .sort(([a], [b]) => a.localeCompare(b));
  if (components.length) {
    parts.push(`## API\n\n${components.map(([name, doc]) => renderComponentApi(name, doc)).join('\n\n')}`);
  }

  if (pkg.examples.length) {
    const ex = pkg.examples.map(e => `### ${e.title}\n\n\`\`\`tsx\n${e.code}\n\`\`\``).join('\n\n');
    parts.push(`## Примеры\n\n${ex}`);
  }

  return (
    parts
      .join('\n\n')
      .replace(/\n{3,}/g, '\n\n')
      .trimEnd() + '\n'
  );
}

type IndexDomain = { label: string; groups: { label?: string; pkgs: PkgInfo[] }[] };

// Domain block → Category → packages, matching the sidebar grouping.
function groupForIndex(pkgs: PkgInfo[]): IndexDomain[] {
  const byDomain = new Map<string, PkgInfo[]>();
  for (const p of pkgs) {
    pushTo(byDomain, resolveDomainId(p.slug), p);
  }
  const out: IndexDomain[] = [];
  for (const d of DOMAINS) {
    const domainPkgs = byDomain.get(d.id);
    if (!domainPkgs?.length) continue;

    if (domainHasCategories(d.id)) {
      const byCat = new Map<string, PkgInfo[]>();
      for (const p of domainPkgs) {
        pushTo(byCat, resolveCategoryId(d.id, p.slug) ?? OTHER_CATEGORY.id, p);
      }
      const groups = categoriesForDomain(d.id)
        .map(cat => ({ label: cat.label, pkgs: byCat.get(cat.id) ?? [] }))
        .filter(g => g.pkgs.length > 0);
      out.push({ label: d.label, groups });
    } else {
      out.push({ label: d.label, groups: [{ pkgs: domainPkgs }] });
    }
  }
  return out;
}

export function renderIndex(pkgs: PkgInfo[], base: string): string {
  const parts: string[] = [
    '# Snack Design System — LLM index',
    '> Машиночитаемые описания компонентов `@ds`. Каждая ссылка ведёт на `llms.txt` пакета с установкой, API (пропсы, типы) и примерами кода.',
  ];
  const link = (p: PkgInfo): string =>
    `- [${p.npmName}](${base}components/${p.slug}/llms.txt)${p.description ? `: ${p.description}` : ''}`;
  const byTitle = (a: PkgInfo, b: PkgInfo): number => a.title.localeCompare(b.title, 'ru');

  for (const domain of groupForIndex(pkgs)) {
    parts.push(`## ${domain.label}`);
    for (const g of domain.groups) {
      const lines = g.pkgs.slice().sort(byTitle).map(link).join('\n');
      parts.push(g.label ? `### ${g.label}\n\n${lines}` : lines);
    }
  }
  return parts.join('\n\n').trimEnd() + '\n';
}

// ─── Entry point ─────────────────────────────────────────────────────────────

/**
 * Writes the root index and per-package `llms.txt` into `outDir`.
 * `root` is the repo root (parent of `packages/`); `base` is the site base path
 * (e.g. "/snack-v2/" or "/"). Returns the number of per-package files written.
 */
export function generateLlmsFiles({ outDir, base, root }: { outDir: string; base: string; root: string }): number {
  const baseSlash = base.endsWith('/') ? base : `${base}/`;
  const pkgs = collectPackages(resolve(root, 'packages'));

  // BOM: статический хост отдаёт .txt без `charset=utf-8`, и браузер декодирует
  // кириллицу как cp1251. BOM заставляет распознать UTF-8.
  const BOM = '\uFEFF';
  writeFileSync(resolve(outDir, 'llms.txt'), BOM + renderIndex(pkgs, baseSlash));
  for (const pkg of pkgs) {
    const dest = resolve(outDir, 'components', pkg.slug, 'llms.txt');
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, BOM + renderPackage(pkg, baseSlash));
  }
  return pkgs.length;
}
