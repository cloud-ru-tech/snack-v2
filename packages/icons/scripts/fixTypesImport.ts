/**
 * Fix the relative path to types in generated icon components.
 * The depth varies by file location - we need ../../.. to reach src from components/group.
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, relative } from 'path';

const SRC_ROOT = join(import.meta.dirname, '..', 'src');
const COMPONENTS_ROOT = join(SRC_ROOT, 'components');

function walkTsx(dir: string): string[] {
  const result: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      result.push(...walkTsx(full));
    } else if (e.isFile() && e.name.endsWith('.tsx')) {
      result.push(full);
    }
  }
  return result;
}

function getRelativeTypesPath(filePath: string): string {
  const fileDir = join(filePath, '..');
  const rel = relative(fileDir, SRC_ROOT).replace(/\\/g, '/');
  return join(rel, 'types').replace(/\\/g, '/');
}

function main(): void {
  const files = walkTsx(COMPONENTS_ROOT);
  const typesImportRe = /from\s+['"](\.\.\/)+types['"]/;

  for (const file of files) {
    let content = readFileSync(file, 'utf-8');
    const match = content.match(typesImportRe);
    if (!match) continue;

    const correctPath = getRelativeTypesPath(file);
    const newImport = `from '${correctPath}'`;
    content = content.replace(typesImportRe, newImport);
    writeFileSync(file, content, 'utf-8');
  }

  // eslint-disable-next-line no-console
  console.log(`Fixed types import in ${files.length} files.`);
}

main();
