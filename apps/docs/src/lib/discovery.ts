import { getCollection } from 'astro:content';

import { DOMAINS, resolveDomainId } from '../config/domains';
import { withBase } from './base-url';

export type NavItem = {
  title: string;
  href: string;
  order: number;
  /** Sub-pages within a multi-component package */
  children?: NavItem[];
};

export type NavGroup = {
  /** Stable id of the domain (e.g. "components", "ai", "uikit-product"). */
  id: string;
  label: string;
  items: NavItem[];
};

const byOrder = (a: { order: number; title: string }, b: { order: number; title: string }) =>
  a.order - b.order || a.title.localeCompare(b.title);

const byTitle = (a: { title: string }, b: { title: string }) => a.title.localeCompare(b.title, 'ru');

export type FlatPage = {
  title: string;
  href: string;
};

const PATTERNS_GROUP_ID = 'patterns';

export async function buildNav(): Promise<NavGroup[]> {
  const [components, patterns] = await Promise.all([getCollection('components'), getCollection('patterns')]);

  // Group component entries by package name (first path segment of the entry ID)
  const byPackage = new Map<string, typeof components>();
  for (const entry of components) {
    const pkg = entry.id.split('/')[0];
    const list = byPackage.get(pkg) ?? [];
    list.push(entry);
    byPackage.set(pkg, list);
  }

  // Initialize one bucket per domain so the groups always render in DOMAINS order,
  // even if a domain has no packages (we'll filter empty ones at the end).
  const itemsByDomain = new Map<string, NavItem[]>(DOMAINS.map(d => [d.id, [] as NavItem[]]));

  for (const [pkg, entries] of byPackage) {
    const domainId = resolveDomainId(pkg);
    // itemsByDomain is seeded from DOMAINS above and resolveDomainId always
    // returns an id from that same list, so the bucket is guaranteed to exist;
    // the ?? branch is just here to satisfy strict-null-checks.
    const target = itemsByDomain.get(domainId) ?? [];
    // "index" entry: ID equals the package name alone (from docs/index.mdx)
    const indexEntry = entries.find(e => e.id === pkg);
    const subEntries = entries
      .filter(e => e !== indexEntry)
      .sort((a, b) => byTitle({ title: a.data.title }, { title: b.data.title }));

    if (subEntries.length === 0) {
      // Single page (index-only or legacy overview): flat link
      const e = indexEntry ?? entries[0];
      target.push({
        title: e.data.title,
        href: withBase(`/components/${e.id}`),
        order: e.data.order,
      });
    } else {
      // Multi-page package: nested group
      target.push({
        title: indexEntry?.data.title ?? pkg,
        href: indexEntry ? withBase(`/components/${pkg}`) : withBase(`/components/${subEntries[0].id}`),
        order: indexEntry?.data.order ?? subEntries[0].data.order,
        children: subEntries
          .map(e => ({
            title: e.data.title,
            href: withBase(`/components/${e.id}`),
            order: e.data.order,
          }))
          .sort(byTitle),
      });
    }
  }

  const patternItems: NavItem[] = patterns.map(e => ({
    title: e.data.title,
    href: withBase(`/patterns/${e.id}`),
    order: e.data.order,
  }));

  const componentGroups: NavGroup[] = DOMAINS.map(d => ({
    id: d.id,
    label: d.label,
    items: (itemsByDomain.get(d.id) ?? []).sort(byTitle),
  })).filter(g => g.items.length > 0);

  return [...componentGroups, { id: PATTERNS_GROUP_ID, label: 'Patterns', items: patternItems.sort(byOrder) }];
}

export { domainIdForPath, pkgFromPath } from './path';

export async function flatPages(): Promise<FlatPage[]> {
  const nav = await buildNav();
  const pages: FlatPage[] = [];
  for (const group of nav) {
    for (const item of group.items) {
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
