import { config } from 'dotenv';
import { resolve } from 'node:path';

config({ path: resolve(process.cwd(), '.env') });

export type FigmaNodeRef = {
  fileKey: string;
  fileName: string;
  nodeId: string;
};

export type FigmaPropertyDef = {
  type: 'VARIANT' | 'BOOLEAN' | 'TEXT' | 'INSTANCE_SWAP' | string;
  defaultValue?: string | boolean;
  variantOptions?: string[];
};

export type FigmaPropAxis = {
  name: string;
  values: string[];
};

export function getFigmaToken(): string {
  const token = process.env.FIGMA_API ?? process.env.FIGMA_TOKEN;
  if (!token) {
    throw new Error('FIGMA_API (or FIGMA_TOKEN) is not set in environment / .env');
  }
  return token;
}

export function toApiNodeId(nodeId: string): string {
  if (nodeId.includes(':')) return nodeId;
  const dash = nodeId.indexOf('-');
  if (dash === -1) return nodeId;
  return `${nodeId.slice(0, dash)}:${nodeId.slice(dash + 1)}`;
}

export function figmaDesignUrl({ fileKey, fileName, nodeId }: FigmaNodeRef): string {
  const params = new URLSearchParams({ 'node-id': nodeId, m: 'dev' });
  return `https://www.figma.com/design/${fileKey}/${fileName}?${params}`;
}

type FigmaNode = {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  componentPropertyDefinitions?: Record<string, FigmaPropertyDef>;
};

export async function fetchFigmaNode(ref: FigmaNodeRef, depth = 4): Promise<FigmaNode | null> {
  const token = getFigmaToken();
  const apiNodeId = toApiNodeId(ref.nodeId);
  const url = `https://api.figma.com/v1/files/${ref.fileKey}/nodes?ids=${encodeURIComponent(apiNodeId)}&depth=${depth}`;

  const response = await fetch(url, { headers: { 'X-Figma-Token': token } });
  if (!response.ok) {
    throw new Error(`Figma API ${response.status} for ${ref.fileKey}/${ref.nodeId}`);
  }

  const data = (await response.json()) as { err?: string; nodes?: Record<string, { document?: FigmaNode }> };
  if (data.err) throw new Error(data.err);
  return data.nodes?.[apiNodeId]?.document ?? null;
}

function collectComponentSets(node: FigmaNode, out: FigmaNode[] = []): FigmaNode[] {
  if (node.type === 'COMPONENT_SET') out.push(node);
  for (const child of node.children ?? []) collectComponentSets(child, out);
  return out;
}

function formatFigmaPropName(key: string): string {
  const base = key.replace(/#.*$/, '');

  const special: Record<string, string> = {
    labelText: 'Label text',
    showCounter: 'Show counter',
    showElementBefore: 'Show element before',
    showElementAfter: 'Show element after',
    iconPosition: 'Icon position',
    visualStyle: 'Visual style',
    appearanceColor: 'Appearance color',
    chevronPosition: 'Chevron position',
  };
  if (special[base]) return special[base];

  const words = base
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .split(' ')
    .filter(Boolean);

  if (words.length === 0) return base;
  return words.map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word)).join(' ');
}

function formatPropValues(def: FigmaPropertyDef): string[] {
  if (def.type === 'BOOLEAN') return ['true', 'false'];
  if (def.type === 'TEXT') return ['[Text]'];
  if (def.type === 'INSTANCE_SWAP') return ['[Instance Swap]'];

  if (def.type === 'VARIANT' && def.variantOptions?.length) {
    return def.variantOptions.map(value => {
      if (value === 'true' || value === 'false') return value;
      return value;
    });
  }

  return [];
}

function mergePropertyMaps(maps: Record<string, FigmaPropertyDef>[]): Record<string, FigmaPropertyDef> {
  const merged: Record<string, FigmaPropertyDef> = {};

  for (const map of maps) {
    for (const [key, def] of Object.entries(map)) {
      const existing = merged[key];
      if (!existing) {
        merged[key] = { ...def, variantOptions: def.variantOptions ? [...def.variantOptions] : undefined };
        continue;
      }

      if (def.variantOptions?.length) {
        const values = new Set([...(existing.variantOptions ?? []), ...def.variantOptions]);
        existing.variantOptions = [...values];
      }
    }
  }

  return merged;
}

function normalizeComponentName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function matchesComponentSet(setName: string, label: string): boolean {
  const setNorm = normalizeComponentName(setName);
  const labelNorm = normalizeComponentName(label);

  if (setNorm === labelNorm) return true;
  if (!setNorm.startsWith(labelNorm)) return false;

  const rest = setNorm.slice(labelNorm.length);
  const excludedSuffixes = ['group', 'combo'];
  return !excludedSuffixes.some(suffix => rest.startsWith(suffix));
}

function filterComponentSets(sets: FigmaNode[], label: string): FigmaNode[] {
  if (sets.length <= 1) return sets;

  const filtered = sets.filter(set => matchesComponentSet(set.name, label));
  return filtered.length > 0 ? filtered : sets.slice(0, 1);
}

function dedupeAxes(axes: FigmaPropAxis[]): FigmaPropAxis[] {
  const byName = new Map<string, Set<string>>();

  for (const axis of axes) {
    const values = byName.get(axis.name) ?? new Set<string>();
    for (const value of axis.values) values.add(value);
    byName.set(axis.name, values);
  }

  return [...byName.entries()]
    .map(([name, values]) => ({ name, values: [...values].sort() }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function extractFigmaAxes(document: FigmaNode, label?: string): FigmaPropAxis[] {
  let sets = collectComponentSets(document);
  if (label) sets = filterComponentSets(sets, label);
  const maps = sets.map(set => set.componentPropertyDefinitions ?? {});
  if (maps.length === 0 && document.componentPropertyDefinitions) {
    maps.push(document.componentPropertyDefinitions);
  }

  const merged = mergePropertyMaps(maps);
  const axes: FigmaPropAxis[] = [];

  for (const [key, def] of Object.entries(merged)) {
    const values = formatPropValues(def);
    if (values.length === 0) continue;
    axes.push({ name: formatFigmaPropName(key), values });
  }

  return dedupeAxes(axes);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
