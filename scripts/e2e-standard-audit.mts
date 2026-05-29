/**
 * Static audit of Playwright E2E specs against e2e-testing-standard.md.
 *
 * Usage:
 *   pnpm exec tsx scripts/e2e-standard-audit.mts
 *   pnpm exec tsx scripts/e2e-standard-audit.mts button toggles
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join, relative, resolve } from 'path';

type Violation = {
  id: string;
  file: string;
  line?: number;
  message: string;
  fix: string;
};

const FORBIDDEN_SPECS = ['url-args.spec.ts', 'states.spec.ts', 'dimensions.spec.ts'];
const REQUIRED_FILES = ['helpers.ts', 'rendering.spec.ts', 'visual.spec.ts'];

const repoRoot = process.cwd();
const packagesDir = resolve(repoRoot, 'packages');

function listPackages(filter?: string[]): string[] {
  if (filter && filter.length > 0) {
    return filter.filter(p => existsSync(join(packagesDir, p)));
  }
  return readdirSync(packagesDir).filter(name => {
    const pkgPath = join(packagesDir, name);
    return statSync(pkgPath).isDirectory() && existsSync(join(pkgPath, 'src'));
  });
}

function walkSpecFiles(pkg: string): string[] {
  const testRoot = join(packagesDir, pkg, '__test__');
  if (!existsSync(testRoot)) return [];

  const files: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (entry === '__snapshots__') continue;
        walk(full);
      } else if (entry.endsWith('.spec.ts') || entry.endsWith('.ts')) {
        files.push(full);
      }
    }
  };
  walk(testRoot);
  return files;
}

function componentDirs(pkg: string): string[] {
  const testRoot = join(packagesDir, pkg, '__test__');
  if (!existsSync(testRoot)) return [];

  return readdirSync(testRoot).filter(name => {
    const full = join(testRoot, name);
    return statSync(full).isDirectory() && name !== '__snapshots__';
  });
}

function rel(file: string): string {
  return relative(repoRoot, file).replace(/\\/g, '/');
}

function scanFileContent(file: string, content: string, violations: Violation[]): void {
  const relPath = rel(file);
  const lines = content.split('\n');
  const isSpec = file.endsWith('.spec.ts');
  const isRendering = file.endsWith('rendering.spec.ts');

  if (isSpec) {
    for (const match of content.matchAll(/gotoStory\s*\(/g)) {
      const start = match.index ?? 0;
      const snippet = content.slice(start, start + 300);
      const closeIdx = snippet.indexOf(');');
      const callBody = closeIdx >= 0 ? snippet.slice(0, closeIdx) : snippet;

      if (/gotoStory\s*\(\s*['"`]components-/.test(callBody)) {
        const lineNo = content.slice(0, start).split('\n').length;
        violations.push({
          id: 'E2',
          file: relPath,
          line: lineNo,
          message: 'Хардкод story ID в gotoStory',
          fix: 'Используй gotoStory(buildStoryOptions(...)) — e2e-standard §«gotoStory — единая форма»',
        });
      } else if (!/build\w*StoryOptions/.test(callBody)) {
        const lineNo = content.slice(0, start).split('\n').length;
        violations.push({
          id: 'E3',
          file: relPath,
          line: lineNo,
          message: 'gotoStory без buildStoryOptions',
          fix: 'Замени на gotoStory(buildStoryOptions(...) или build<Component>StoryOptions(...)) — e2e-standard §«gotoStory — единая форма»',
        });
      }
    }
  }

  lines.forEach((line, idx) => {
    const lineNo = idx + 1;

    if (/\.\.\/.*playwright/.test(line) || /\.\.\/\.\.\/.*playwright/.test(line)) {
      violations.push({
        id: 'E4',
        file: relPath,
        line: lineNo,
        message: 'Относительный импорт playwright вместо #playwright-tooling/*',
        fix: "Импортируй через алиас '#playwright-tooling/fixtures' — e2e-standard §«Импорты»",
      });
    }

    if (isRendering && /for\s*\([^)]*of\s+Object\.values\s*\(/.test(line)) {
      violations.push({
        id: 'E5',
        file: relPath,
        line: lineNo,
        message: 'Axis-per-test loop в rendering.spec.ts',
        fix: 'Параметризуй через KEY_COMBOS (1 представитель на ось), не цикл по всем enum-values — e2e §«Запрещённые паттерны» п.1',
      });
    }

    if (
      /import\s+\{[^}]*\b(expect|test)\b[^}]*\}\s+from\s+['"]@playwright\/test['"]/.test(line) &&
      !/^import\s+type\s/.test(line.trim())
    ) {
      violations.push({
        id: 'E6',
        file: relPath,
        line: lineNo,
        message: "Прямой импорт expect/test из '@playwright/test'",
        fix: "Используй import { expect, test } from '#playwright-tooling/fixtures' — e2e-standard §«Импорты»",
      });
    }

    if (isSpec && /getBy(Role|Text|LabelText)\s*\(/.test(line)) {
      violations.push({
        id: 'E9',
        file: relPath,
        line: lineNo,
        message: 'Локатор через role/text/label вместо getByTestId',
        fix: 'Локаторы только через getByTestId и TEST_IDS — e2e-standard + visual-regression-standard',
      });
    }
  });
}

function auditPackage(pkg: string): Violation[] {
  const violations: Violation[] = [];
  const testRoot = join(packagesDir, pkg, '__test__');

  if (!existsSync(testRoot)) return violations;

  for (const forbidden of FORBIDDEN_SPECS) {
    const walkForForbidden = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) {
          walkForForbidden(full);
        } else if (entry === forbidden) {
          violations.push({
            id: 'E1',
            file: rel(full),
            message: `Запрещённый spec-файл: ${forbidden}`,
            fix: 'Перенеси проверки в rendering.spec.ts (props propagation) или visual.spec.ts — e2e-standard §«Запрещённые паттерны»',
          });
        }
      }
    };
    walkForForbidden(testRoot);
  }

  const flatSnapshots = join(packagesDir, pkg, '__snapshots__');
  if (existsSync(flatSnapshots) && statSync(flatSnapshots).isDirectory()) {
    violations.push({
      id: 'E7',
      file: rel(flatSnapshots),
      message: 'Устаревшая flat-раскладка __snapshots__ на уровне пакета',
      fix: 'Перенеси baselines в packages/<pkg>/__test__/<Component>/__snapshots__/ — e2e-standard §«Папка тестов пакета»',
    });
  }

  for (const component of componentDirs(pkg)) {
    const dir = join(testRoot, component);
    for (const required of REQUIRED_FILES) {
      if (!existsSync(join(dir, required))) {
        violations.push({
          id: 'E8',
          file: rel(dir),
          message: `Отсутствует обязательный файл: ${required}`,
          fix: `Добавь ${required} в packages/${pkg}/__test__/${component}/ — e2e-standard §«Папка тестов пакета»`,
        });
      }
    }
  }

  for (const file of walkSpecFiles(pkg)) {
    if (file.endsWith('helpers.ts')) continue;
    const content = readFileSync(file, 'utf8');
    scanFileContent(file, content, violations);
  }

  return violations;
}

function formatMarkdown(violations: Violation[], pkgs: string[]): string {
  const lines: string[] = ['## E2E standard', ''];

  const byPkg = new Map<string, Violation[]>();
  for (const v of violations) {
    const pkgMatch = v.file.match(/^packages\/([^/]+)/);
    const pkg = pkgMatch?.[1] ?? 'unknown';
    const list = byPkg.get(pkg) ?? [];
    list.push(v);
    byPkg.set(pkg, list);
  }

  if (violations.length === 0) {
    lines.push('E2E тесты соответсвуют стандартам ˶ᵔ ᵕ ᵔ˶');
    return lines.join('\n');
  }

  for (const pkg of pkgs) {
    const pkgViolations = byPkg.get(pkg);
    if (!pkgViolations?.length) continue;
    lines.push(`### @ds/${pkg}`, '');
    for (const v of pkgViolations) {
      const loc = v.line ? `\`${v.file}:${v.line}\`` : `\`${v.file}\``;
      lines.push(`- ${loc} — ${v.message}. **Исправление:** ${v.fix}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

const filterPkgs = process.argv.slice(2);
const pkgs = listPackages(filterPkgs.length > 0 ? filterPkgs : undefined).sort();

const allViolations: Violation[] = [];
for (const pkg of pkgs) {
  allViolations.push(...auditPackage(pkg));
}

console.log(formatMarkdown(allViolations, pkgs));
process.exit(allViolations.length > 0 ? 1 : 0);
