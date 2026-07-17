import { ComponentType } from 'react';

import * as Product from '../../src/components/product';
import * as System from '../../src/components/system';
import * as Web from '../../src/components/web';
import { ICON_GROUPS, IconEntry, IconGroup, IconSubgroupMap, IconSubgroupOrder, normalizeIconName } from './constants';

type ImportMetaWithGlob = ImportMeta & {
  glob: (pattern: string) => Record<string, () => Promise<unknown>>;
};

const SVG_FILES = (import.meta as ImportMetaWithGlob).glob('../../svgs/**/Interface/S/**/*.svg');

export function normalizeToSymbolIdPart(value: string): string {
  return value
    .replace(/\.[^.]+$/g, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-([0-9]+)/g, '$1')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

export function parseSvgPath(path: string): { group: IconGroup; subgroup: string; fileName: string } | null {
  const match = path.match(/svgs\/(system|product|web)\/Interface\/S(?:\/([^/]+))?\/([^/]+)\.svg$/);
  if (!match) return null;

  const [, group, subgroupRaw, fileName] = match;
  const subgroup = subgroupRaw ?? 'Ungrouped';

  return {
    group: group as IconGroup,
    subgroup,
    fileName,
  };
}

function createIconSubgroupData(): { map: IconSubgroupMap; order: IconSubgroupOrder } {
  const map: IconSubgroupMap = {
    system: {},
    product: {},
    web: {},
  };

  const order: IconSubgroupOrder = {
    system: [],
    product: [],
    web: [],
  };

  Object.keys(SVG_FILES)
    .sort((a, b) => a.localeCompare(b))
    .forEach(path => {
      const parsed = parseSvgPath(path);
      if (!parsed) return;

      const symbolIdPart = normalizeToSymbolIdPart(parsed.fileName);
      map[parsed.group][symbolIdPart] = parsed.subgroup;

      if (!order[parsed.group].includes(parsed.subgroup)) {
        order[parsed.group].push(parsed.subgroup);
      }
    });

  return { map, order };
}

const { map: ICON_SUBGROUP_MAP, order: ICON_SUBGROUP_ORDER } = createIconSubgroupData();

export function getSectionKey(group: IconGroup, subgroup: string): string {
  return `${group} / ${subgroup}`;
}

export const ALL_SECTION_KEYS_ORDER: string[] = ICON_GROUPS.flatMap(group =>
  ICON_SUBGROUP_ORDER[group].map(subgroup => getSectionKey(group, subgroup)),
);

export function isIconComponent(value: unknown): value is ComponentType<{ size?: number }> {
  if (typeof value === 'function') return true;
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toIconEntry(group: IconGroup): ([name, Component]: [string, unknown]) => IconEntry {
  return ([name, Component]) => ({
    name,
    baseName: normalizeIconName(name),
    Component: Component as ComponentType<{ size?: number }>,
    group,
  });
}

export function getIconsByGroup(group: IconGroup): IconEntry[] {
  if (group === 'product') {
    return (Object.entries(Product) as Array<[string, unknown]>)
      .filter(([, comp]) => isIconComponent(comp))
      .map(toIconEntry(group))
      .sort((a, b) => a.baseName.localeCompare(b.baseName));
  }

  if (group === 'web') {
    return (Object.entries(Web) as Array<[string, unknown]>)
      .filter(([, comp]) => isIconComponent(comp))
      .map(toIconEntry(group))
      .sort((a, b) => a.baseName.localeCompare(b.baseName));
  }

  return (Object.entries(System) as Array<[string, unknown]>)
    .filter(([, value]) => isIconComponent(value))
    .map(toIconEntry(group))
    .sort((a, b) => a.baseName.localeCompare(b.baseName));
}

export function getAllIcons(): IconEntry[] {
  return ICON_GROUPS.flatMap(group => getIconsByGroup(group));
}

export function getIconSubgroup(group: IconGroup, iconName: string): string {
  const symbolIdPart = normalizeToSymbolIdPart(iconName);
  return ICON_SUBGROUP_MAP[group][symbolIdPart] ?? 'Ungrouped';
}

export function groupAllIconsBySection(icons: IconEntry[]): Record<string, IconEntry[]> {
  const grouped: Record<string, IconEntry[]> = {};
  ALL_SECTION_KEYS_ORDER.forEach(key => {
    grouped[key] = [];
  });
  icons.forEach(icon => {
    const subgroup = getIconSubgroup(icon.group, icon.baseName);
    const key = getSectionKey(icon.group, subgroup);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(icon);
  });
  return grouped;
}

export function toSearchToken(value: string): string {
  return value.trim().toLowerCase();
}

export function hasText(value: string): boolean {
  return value.trim().length > 0;
}
