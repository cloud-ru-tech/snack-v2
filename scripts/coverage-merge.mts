/**
 * Объединяет istanbul-coverage из трёх источников в единый отчёт:
 *   coverage/raw/storybook/   — vitest browser (storybook play, addon-vitest)
 *   coverage/raw/playwright/  — e2e specs + harvester play-functions
 *   coverage/raw/vitest/      — node-side unit tests (pure utils, managers, hooks-as-functions)
 *
 * Vitest unit-source имеет приоритет: для файлов, покрытых vitest'ом, данные
 * из storybook/playwright игнорируются. Иначе разные istanbul-pipeline дают
 * расходящиеся statementMap'ы и merge раздувает totals → ложно низкий %.
 * См. coverage-standard.md §«vitest unit-source приоритетен».
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import libCoverage from 'istanbul-lib-coverage';
import libReport from 'istanbul-lib-report';
import reports from 'istanbul-reports';

const repoRoot = process.cwd();
const rawDir = resolve(repoRoot, 'coverage', 'raw');
const reportDir = resolve(repoRoot, 'coverage', 'report');

if (!existsSync(rawDir)) {
  console.error(`coverage/raw/ not found at ${rawDir}. Run test:coverage:stories and/or test:coverage:e2e first.`);
  process.exit(1);
}

// 1. Сначала собираем vitest-источник отдельно и фиксируем список файлов, которые
//    он покрыл. Эти файлы должны быть исключены из storybook/playwright merge.
const vitestMap = libCoverage.createCoverageMap({});
let vitestFiles = 0;
const vitestDir = resolve(rawDir, 'vitest');
if (existsSync(vitestDir)) {
  for (const entry of readdirSync(vitestDir)) {
    if (!entry.endsWith('.json')) continue;
    const data = JSON.parse(readFileSync(resolve(vitestDir, entry), 'utf8'));
    vitestMap.merge(data);
    vitestFiles++;
  }
}
const vitestOwned = new Set(vitestMap.files());

const map = libCoverage.createCoverageMap({});
// Vitest данные кладём первыми.
map.merge(vitestMap.toJSON());

let files = vitestFiles;
for (const sub of ['storybook', 'playwright']) {
  const dir = resolve(rawDir, sub);
  if (!existsSync(dir)) continue;
  for (const entry of readdirSync(dir)) {
    if (!entry.endsWith('.json')) continue;
    const data = JSON.parse(readFileSync(resolve(dir, entry), 'utf8')) as Record<string, unknown>;
    // Выкидываем файлы, уже покрытые vitest'ом (разные statementMap → ломают merge).
    for (const k of Object.keys(data)) {
      if (vitestOwned.has(k)) delete data[k];
    }
    map.merge(data as Parameters<typeof map.merge>[0]);
    files++;
  }
}

if (files === 0) {
  console.error(`no coverage json files found under ${rawDir}.`);
  process.exit(1);
}

if (existsSync(reportDir)) rmSync(reportDir, { recursive: true, force: true });
mkdirSync(reportDir, { recursive: true });

writeFileSync(resolve(reportDir, 'coverage-final.json'), JSON.stringify(map.toJSON()));

const context = libReport.createContext({
  dir: reportDir,
  coverageMap: map,
  defaultSummarizer: 'nested',
});

for (const name of ['text', 'html', 'lcov', 'json-summary', 'cobertura'] as const) {
  reports.create(name).execute(context);
}

console.info(`merged ${files} coverage files → ${reportDir}`);
