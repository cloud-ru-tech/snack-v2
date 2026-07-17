import { execSync } from 'child_process';
import { Dirent, existsSync, readdirSync, rmSync, unlinkSync } from 'fs';
import { basename, join } from 'path';
import { getGroupSourcePath, getIconGroups, getSpriteGroupId } from '../shared/iconGroups';
import { filenameToSymbolIdPart } from '../shared/symbolId';

const ICONS_ROOT = join(import.meta.dirname, '..', '..');
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

/**
 * Ключ сравнения без учёта дефисов. Собственный пересчёт PascalCase svgr для имени сгенери-
 * рованного компонента может внести границу слова, которой не было в нормализации ИСХОДНОГО
 * имени файла (например, имена вида цифра+строчная буква: источник "K8scleanerLogoDark"
 * нормализуется в "k8scleaner-logo-dark", но svgr переименовывает выходной файл в
 * "K8ScleanerLogoDark" — заглавная S — что нормализуется в "k8-scleaner-logo-dark").
 * Буквенно-цифровое содержимое идентично, разница только в расстановке дефисов, поэтому
 * сравнение по id без дефисов не даёт принять свежесгенерированный файл за осиротевший
 * и удалить его.
 */
function looseId(idPart: string): string {
  return idPart.replace(/-/g, '');
}

function getSourceIdSet(group: string): Set<string> {
  const sourceRoot = getGroupSourcePath(group);
  if (!existsSync(sourceRoot)) return new Set();

  return new Set(getAllSVGPaths(sourceRoot).map(filePath => looseId(filenameToSymbolIdPart(basename(filePath)))));
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
    // Basename сгенерированного файла отражает basename исходного svg (svgr -d его сохраняет,
    // с поправкой на собственный пересчёт PascalCase) — нормализуем так же, как нормализовалось
    // бы имя исходного файла, а не через `Svg`-strip из componentNameToSymbolIdPart (тот — для
    // *внутреннего* имени переменной svgr, которое действительно всегда с префиксом Svg; резать
    // этот префикс из basename ФАЙЛА неверно, если собственное имя иконки реально начинается
    // с "Svg", например `SvgExtension.svg`).
    const componentName = basename(filePath, '.tsx');
    const idPart = looseId(filenameToSymbolIdPart(componentName));
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

  run('tsx scripts/pipeline/createExportIndexFile.ts');
  run('tsx scripts/pipeline/fixTypesImport.ts');

  // eslint-disable-next-line no-console
  console.log(
    `Синхронизация сгенерированных иконок завершена. Удалено компонентов/групп: ${removedComponents}. Удалено sprite-файлов: ${removedSprites}.`,
  );
}

main();
