import { FIGMA_NODES, figmaDesignUrl, type FigmaNodeRef } from '../../apps/docs/src/lib/figma.ts';

export type FigmaTarget = {
  pkg: string;
  label: string;
  ref: FigmaNodeRef;
  cacheKey: string;
};

const SKIP_SUB_KEYS = new Set([
  'canvas',
  'private-elements',
  'property-matrix',
  'examples',
]);

function isLeaf(entry: unknown): entry is FigmaNodeRef {
  return typeof (entry as FigmaNodeRef)?.nodeId === 'string';
}

function cacheKey(ref: FigmaNodeRef): string {
  return `${ref.fileKey}__${ref.nodeId.replace(/:/g, '-')}`;
}

export function buildFigmaTargets(publicPackages: Set<string>): FigmaTarget[] {
  const targets: FigmaTarget[] = [];
  const seen = new Set<string>();

  for (const [pkg, entry] of Object.entries(FIGMA_NODES)) {
    if (!publicPackages.has(pkg)) continue;

    if (isLeaf(entry)) {
      const dedupe = `${pkg}::${cacheKey(entry)}`;
      if (seen.has(dedupe)) continue;
      seen.add(dedupe);
      targets.push({ pkg, label: pkg, ref: entry, cacheKey: cacheKey(entry) });
      continue;
    }

    const subEntries = Object.entries(entry).filter(([key]) => key !== '_' && !SKIP_SUB_KEYS.has(key));
    const hasSpecificSubs = subEntries.length > 0;

    if (hasSpecificSubs) {
      for (const [subKey, ref] of subEntries) {
        const dedupe = `${pkg}/${subKey}::${cacheKey(ref)}`;
        if (seen.has(dedupe)) continue;
        seen.add(dedupe);
        targets.push({ pkg, label: subKey, ref, cacheKey: cacheKey(ref) });
      }
    } else if (entry._) {
      const ref = entry._;
      const dedupe = `${pkg}::${cacheKey(ref)}`;
      if (seen.has(dedupe)) continue;
      seen.add(dedupe);
      targets.push({ pkg, label: pkg, ref, cacheKey: cacheKey(ref) });
    }
  }

  return targets.sort((a, b) => a.pkg.localeCompare(b.pkg) || a.label.localeCompare(b.label));
}

export { figmaDesignUrl };
