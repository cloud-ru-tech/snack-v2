import { getCollection } from 'astro:content';

import { categoriesForDomain, domainHasCategories, OTHER_CATEGORY, resolveCategoryId } from '../config/categories';
import { DOMAINS, resolveDomainId } from '../config/domains';
import { withBase } from './base-url';

function pushTo<T>(map: Map<string, T[]>, key: string, value: T): void {
  const list = map.get(key);
  if (list) list.push(value);
  else map.set(key, [value]);
}

export type NavItem = {
  title: string;
  href: string;
  order: number;
  /** Sub-pages of a multi-component package. */
  children?: NavItem[];
};

export type NavCategory = {
  id: string;
  label: string;
  description?: string;
  items: NavItem[];
};

export type NavGroup = {
  id: string;
  label: string;
  description?: string;
  // A group has either `categories` (categorized domain) or `items` (flat domain / patterns).
  categories?: NavCategory[];
  items?: NavItem[];
};

const PATTERNS_DESCRIPTION =
  'Гайды и паттерны проектирования: как собирать сценарии из компонентов, контрибьютить, стандарты и процессы.';

const DOMAIN_DESCRIPTION = new Map<string, string | undefined>(DOMAINS.map(d => [d.id, d.description]));

const PATTERNS_GROUP_ID = 'patterns';

const byOrder = (a: { order: number; title: string }, b: { order: number; title: string }) =>
  a.order - b.order || a.title.localeCompare(b.title);

const byTitle = (a: { title: string }, b: { title: string }) => a.title.localeCompare(b.title, 'ru');

export type FlatPage = {
  title: string;
  href: string;
};

/** Flat list of a group's package items, whether categorized or not. */
export function groupItems(group: NavGroup): NavItem[] {
  return group.categories ? group.categories.flatMap(c => c.items) : (group.items ?? []);
}

export async function buildNav(): Promise<NavGroup[]> {
  const [components, patterns] = await Promise.all([getCollection('components'), getCollection('patterns')]);

  // Group component entries by package name (first path segment of the entry ID).
  const byPackage = new Map<string, typeof components>();
  for (const entry of components) {
    const pkg = entry.id.split('/')[0];
    const list = byPackage.get(pkg) ?? [];
    list.push(entry);
    byPackage.set(pkg, list);
  }

  // One NavItem per package, bucketed by domain; pkg name kept for category resolution.
  const byDomain = new Map<string, { pkg: string; item: NavItem }[]>();
  for (const [pkg, entries] of byPackage) {
    // "index" entry: ID equals the package name alone (from docs/index.mdx).
    const indexEntry = entries.find(e => e.id === pkg);
    const subEntries = entries
      .filter(e => e !== indexEntry)
      .sort((a, b) => byTitle({ title: a.data.title }, { title: b.data.title }));

    let item: NavItem;
    if (subEntries.length === 0) {
      const e = indexEntry ?? entries[0];
      item = { title: e.data.title, href: withBase(`/components/${e.id}`), order: e.data.order };
    } else {
      // Multi-page package: nested sub-pages.
      item = {
        title: indexEntry?.data.title ?? pkg,
        href: indexEntry ? withBase(`/components/${pkg}`) : withBase(`/components/${subEntries[0].id}`),
        order: indexEntry?.data.order ?? subEntries[0].data.order,
        children: subEntries
          .map(e => ({ title: e.data.title, href: withBase(`/components/${e.id}`), order: e.data.order }))
          .sort(byTitle),
      };
    }

    pushTo(byDomain, resolveDomainId(pkg), { pkg, item });
  }

  // Assemble in DOMAINS order; categorized domains get a category sub-level, others stay flat.
  const groups: NavGroup[] = [];
  for (const d of DOMAINS) {
    const entries = byDomain.get(d.id);
    if (!entries?.length) continue;

    if (domainHasCategories(d.id)) {
      const byCat = new Map<string, NavItem[]>();
      for (const { pkg, item } of entries) {
        pushTo(byCat, resolveCategoryId(d.id, pkg) ?? OTHER_CATEGORY.id, item);
      }
      const categories: NavCategory[] = [];
      for (const cat of categoriesForDomain(d.id)) {
        const items = byCat.get(cat.id);
        if (!items?.length) continue;
        if (cat.id === OTHER_CATEGORY.id) {
          console.warn(
            `[discovery] ${items.length} "${d.id}" package(s) not assigned to a category (config/categories.ts) → "Other": ${items
              .map(i => i.title)
              .join(', ')}`,
          );
        }
        categories.push({ id: cat.id, label: cat.label, description: cat.description, items: items.sort(byTitle) });
      }
      groups.push({ id: d.id, label: d.label, description: DOMAIN_DESCRIPTION.get(d.id), categories });
    } else {
      groups.push({
        id: d.id,
        label: d.label,
        description: DOMAIN_DESCRIPTION.get(d.id),
        items: entries.map(e => e.item).sort(byTitle),
      });
    }
  }

  const patternItems: NavItem[] = patterns.map(e => ({
    title: e.data.title,
    href: withBase(`/patterns/${e.id}`),
    order: e.data.order,
  }));
  groups.push({
    id: PATTERNS_GROUP_ID,
    label: 'Patterns',
    description: PATTERNS_DESCRIPTION,
    items: patternItems.sort(byOrder),
  });

  return groups;
}

export { domainIdForPath, pkgFromPath } from './path';

export async function flatPages(): Promise<FlatPage[]> {
  const nav = await buildNav();
  const pages: FlatPage[] = [];
  for (const group of nav) {
    for (const item of groupItems(group)) {
      pages.push({ title: item.title, href: item.href });
      if (item.children) {
        for (const child of item.children) {
          pages.push({ title: child.title, href: child.href });
        }
      }
    }
  }
  return pages;
}
