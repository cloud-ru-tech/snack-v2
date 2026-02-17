/**
 * Icon groups config. Each top-level folder under svgs/ is a group.
 * Add new groups by creating folders in svgs/.
 */
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const SVGS_ROOT = join(__dirname, '..', 'svgs');

function hasSvgFiles(dir: string): boolean {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isFile() && e.name.endsWith('.svg')) return true;
    if (e.isDirectory() && hasSvgFiles(full)) return true;
  }
  return false;
}

function discoverGroups(): string[] {
  const groups: string[] = [];
  const topLevel = readdirSync(SVGS_ROOT, { withFileTypes: true });
  for (const e of topLevel) {
    if (e.isDirectory()) {
      const full = join(SVGS_ROOT, e.name);
      if (hasSvgFiles(full)) {
        groups.push(e.name);
      }
    }
  }
  return groups;
}

export function getIconGroups(): string[] {
  return discoverGroups();
}

export function getGroupSourcePath(group: string): string {
  return join(SVGS_ROOT, group);
}

export function getGroupFixedPath(group: string): string {
  return join(__dirname, '..', 'svgs-fixed', group);
}

/** Group id for sprite filename: snack-icons -> snack-icons, product/basic -> product-basic */
export function getSpriteGroupId(group: string): string {
  return group.replace(/\//g, '-');
}
