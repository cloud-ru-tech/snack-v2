/**
 * Исправляет глубину относительных импортов модулей из корня `src/` (types, factory/*)
 * в сгенерированных компонентах иконок: шаблоны эмитят фиксированное `../../../`,
 * а фактическая глубина зависит от расположения файла.
 */
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, relative } from 'path';

const SRC_ROOT = join(import.meta.dirname, '..', '..', 'src');
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

function getRelativeSrcPath(filePath: string, srcModule: string): string {
  const fileDir = join(filePath, '..');
  const rel = relative(fileDir, SRC_ROOT).replace(/\\/g, '/');
  return join(rel, srcModule).replace(/\\/g, '/');
}

function main(): void {
  const files = walkTsx(COMPONENTS_ROOT);
  // Импорт модуля из корня src/: `(../)+<module>`, где module — types или factory/*.
  const srcImportRe = /from\s+['"](?:\.\.\/)+(types|factory\/\w+)['"]/g;

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const fixed = content.replace(
      srcImportRe,
      (_, srcModule: string) => `from '${getRelativeSrcPath(file, srcModule)}'`,
    );
    if (fixed !== content) writeFileSync(file, fixed, 'utf-8');
  }

  // eslint-disable-next-line no-console
  console.log(`Импорты из корня src/ исправлены в ${files.length} файлах.`);
}

main();
