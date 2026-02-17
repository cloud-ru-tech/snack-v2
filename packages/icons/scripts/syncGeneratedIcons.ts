import { execSync } from 'child_process';
import { Dirent, existsSync, readdirSync, rmSync, unlinkSync } from 'fs';
import { basename, join } from 'path';
import { getGroupSourcePath, getIconGroups, getSpriteGroupId } from './iconGroups';
import { componentNameToSymbolIdPart, filenameToSymbolIdPart } from './symbolId';

const ICONS_ROOT = join(__dirname, '..');
const COMPONENTS_ROOT = join(ICONS_ROOT, 'src', 'components');
const SPRITE_DIRS = [
  join(ICONS_ROOT, 'src', 'sprite', 'svg'),
  join(ICONS_ROOT, 'dist', 'cjs', 'sprite', 'svg'),
  join(ICONS_ROOT, 'dist', 'esm', 'sprite', 'svg'),
];

type Variant = 'sprite' | 'standalone';

function readEntries(path: string): Dirent[] {
  return readdirSync(path, { withFileTypes: true, encoding: 'utf-8' });
}

function getAllSVGPaths(directory: string): string[] {
  const queue: string[] = [directory];
  const result: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;

    for (const entry of readEntries(current)) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) {
        queue.push(full);
      } else if (entry.isFile() && entry.name.endsWith('.svg')) {
        result.push(full);
      }
    }
  }

  return result;
}

function getSourceIdSet(group: string): Set<string> {
  const sourceRoot = getGroupSourcePath(group);
  if (!existsSync(sourceRoot)) return new Set();

  return new Set(getAllSVGPaths(sourceRoot).map(filePath => filenameToSymbolIdPart(basename(filePath))));
}

function walkGeneratedTsx(directory: string): string[] {
  const queue: string[] = [directory];
  const result: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || !existsSync(current)) continue;

    for (const entry of readEntries(current)) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) {
        queue.push(full);
      } else if (entry.isFile() && entry.name.endsWith('.tsx') && entry.name !== 'index.tsx') {
        result.push(full);
      }
    }
  }

  return result;
}

function removeEmptyDirectories(directory: string): boolean {
  if (!existsSync(directory)) return true;

  let hasFiles = false;
  for (const entry of readEntries(directory)) {
    const full = join(directory, entry.name);
    if (entry.isDirectory()) {
      const childEmpty = removeEmptyDirectories(full);
      if (!childEmpty) hasFiles = true;
    } else {
      hasFiles = true;
    }
  }

  if (!hasFiles) {
    rmSync(directory, { recursive: true, force: true });
    return true;
  }

  return false;
}

function syncVariant(group: string, variant: Variant, sourceIds: Set<string>): number {
  const variantDir = join(COMPONENTS_ROOT, group, variant);
  if (!existsSync(variantDir)) return 0;

  let removed = 0;
  const files = walkGeneratedTsx(variantDir);

  for (const filePath of files) {
    const componentName = basename(filePath, '.tsx');
    const idPart = componentNameToSymbolIdPart(componentName);
    if (!sourceIds.has(idPart)) {
      unlinkSync(filePath);
      removed += 1;
    }
  }

  removeEmptyDirectories(variantDir);
  return removed;
}

function syncComponentGroups(groups: string[]): number {
  if (!existsSync(COMPONENTS_ROOT)) return 0;

  let removed = 0;
  const groupSet = new Set(groups);

  for (const entry of readEntries(COMPONENTS_ROOT)) {
    if (!entry.isDirectory()) continue;

    const group = entry.name;
    const groupPath = join(COMPONENTS_ROOT, group);
    if (!groupSet.has(group)) {
      rmSync(groupPath, { recursive: true, force: true });
      removed += 1;
      continue;
    }

    const sourceIds = getSourceIdSet(group);
    removed += syncVariant(group, 'sprite', sourceIds);
    removed += syncVariant(group, 'standalone', sourceIds);
    removeEmptyDirectories(groupPath);
  }

  return removed;
}

function syncSpriteFiles(groups: string[]): number {
  const validGroupIds = new Set(groups.map(group => getSpriteGroupId(group)));
  let removed = 0;

  for (const spriteDir of SPRITE_DIRS) {
    if (!existsSync(spriteDir)) continue;

    for (const entry of readEntries(spriteDir)) {
      if (!entry.isFile()) continue;
      const match = entry.name.match(/^sprite\.(.+)\.symbol\.svg$/);
      if (!match) continue;

      const groupId = match[1];
      if (!validGroupIds.has(groupId)) {
        unlinkSync(join(spriteDir, entry.name));
        removed += 1;
      }
    }
  }

  return removed;
}

function run(cmd: string): void {
  execSync(cmd, { cwd: ICONS_ROOT, stdio: 'inherit' });
}

function main(): void {
  const groups = getIconGroups();
  const removedComponents = syncComponentGroups(groups);
  const removedSprites = syncSpriteFiles(groups);

  run('ts-node scripts/createExportIndexFile.ts');
  run('ts-node scripts/fixTypesImport.ts');

  // eslint-disable-next-line no-console
  console.log(
    `Sync generated icons complete. Removed components/groups: ${removedComponents}. Removed sprite files: ${removedSprites}.`,
  );
}

main();
