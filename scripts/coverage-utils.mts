/**
 * Shared coverage aggregation and report formatting.
 * Used by coverage-pkg.mts and coverage-gate.mts.
 * Thresholds and exemptions — `.claude/rules/coverage-standard.md`.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';

export type MetricKey = 'lines' | 'stmts' | 'funcs' | 'branches';

export type MinThresholds = Record<MetricKey, number>;

/** Per-package coverage gate defaults — coverage-standard.md §«Пороги per-package». */
export const DEFAULT_MIN: MinThresholds = {
  lines: 80,
  stmts: 80,
  funcs: 75,
  branches: 70,
};

/** Packages excluded from per-package gate — coverage-standard.md §«Исключения». */
export const GATE_EXEMPT = new Set([
  'utils',
  'locale',
  'fonts',
  'materials',
  'portal-context',
  'icon-predefined',
  'scroll',
  'icons',
]);

export type FileMetric = { covered: number; total: number };
export type FileSummary = {
  statements: FileMetric;
  branches: FileMetric;
  functions: FileMetric;
  lines: FileMetric;
};

export type PackageAgg = {
  sc: number;
  st: number;
  fc: number;
  ft: number;
  bc: number;
  bt: number;
  lc: number;
  lt: number;
};

export type PackageMetrics = {
  lines: number;
  stmts: number;
  funcs: number;
  branches: number;
};

export type GateStatus = 'pass' | 'fail' | 'exempt' | 'no-data';

const METRIC_ROWS: Array<{ key: MetricKey; label: string; description: string }> = [
  { key: 'lines', label: 'lines', description: 'Покрытие строк runtime-кода `packages/*/src/**`' },
  { key: 'stmts', label: 'statements', description: "Покрытие statement'ов" },
  { key: 'funcs', label: 'functions', description: 'Покрытие функций' },
  { key: 'branches', label: 'branches', description: 'Покрытие ветвлений' },
];

export function pctValue(c: number, t: number): number {
  return t ? (100 * c) / t : 100;
}

export function pctString(c: number, t: number): string {
  return t ? `${pctValue(c, t).toFixed(1)}%` : 'n/a';
}

export function readCoverageSummary(summaryPath?: string): Record<string, FileSummary> {
  const path = summaryPath ?? resolve(process.cwd(), 'coverage', 'report', 'coverage-summary.json');
  const raw = JSON.parse(readFileSync(path, 'utf8')) as Record<string, FileSummary>;
  delete (raw as Record<string, unknown>).total;
  return raw;
}

export function aggregatePackages(raw: Record<string, FileSummary>, filter?: string[]): Record<string, PackageAgg> {
  const filterSet = filter ? new Set(filter) : null;
  const agg: Record<string, PackageAgg> = {};

  for (const [path, m] of Object.entries(raw)) {
    const seg = path.split('/packages/')[1];
    if (!seg) continue;
    const pkg = seg.split('/')[0];
    if (filterSet && !filterSet.has(pkg)) continue;

    const a = (agg[pkg] ??= { sc: 0, st: 0, fc: 0, ft: 0, bc: 0, bt: 0, lc: 0, lt: 0 });
    a.sc += m.statements.covered;
    a.st += m.statements.total;
    a.fc += m.functions.covered;
    a.ft += m.functions.total;
    a.bc += m.branches.covered;
    a.bt += m.branches.total;
    a.lc += m.lines.covered;
    a.lt += m.lines.total;
  }

  return agg;
}

export function aggToMetrics(a: PackageAgg): PackageMetrics {
  return {
    lines: pctValue(a.lc, a.lt),
    stmts: pctValue(a.sc, a.st),
    funcs: pctValue(a.fc, a.ft),
    branches: pctValue(a.bc, a.bt),
  };
}

export function evaluatePackage(
  pkg: string,
  agg: PackageAgg | undefined,
  min: MinThresholds = DEFAULT_MIN,
): { status: GateStatus; metrics?: PackageMetrics; fails: string[] } {
  if (GATE_EXEMPT.has(pkg)) {
    return { status: 'exempt', fails: [] };
  }
  if (!agg) {
    return { status: 'no-data', fails: ['no data'] };
  }

  const metrics = aggToMetrics(agg);
  const fails: string[] = [];
  if (metrics.stmts < min.stmts) fails.push(`stmts ${metrics.stmts.toFixed(1)}<${min.stmts}`);
  if (metrics.branches < min.branches) fails.push(`branches ${metrics.branches.toFixed(1)}<${min.branches}`);
  if (metrics.funcs < min.funcs) fails.push(`funcs ${metrics.funcs.toFixed(1)}<${min.funcs}`);
  if (metrics.lines < min.lines) fails.push(`lines ${metrics.lines.toFixed(1)}<${min.lines}`);

  return { status: fails.length ? 'fail' : 'pass', metrics, fails };
}

function complianceCell(status: GateStatus, value?: number, min?: number): string {
  if (status === 'exempt') return '— (исключён из gate)';
  if (status === 'no-data') return '— (нет данных)';
  if (value === undefined) return '— (нет данных)';
  const pct = value.toFixed(1);
  const ok = min === undefined || value >= min;
  return ok ? `✅ ${pct}%` : `❌ ${pct}%`;
}

function gateLabel(status: GateStatus): string {
  switch (status) {
    case 'pass':
      return '✅ OK';
    case 'fail':
      return '❌ FAIL';
    case 'exempt':
      return '— exempt';
    case 'no-data':
      return '— no data';
    default:
      return '— unknown';
  }
}

function metricValue(metrics: PackageMetrics | undefined, key: MetricKey): number | undefined {
  return metrics?.[key];
}

export function formatAsciiSummary(pkgs: string[], agg: Record<string, PackageAgg>): string {
  const lines: string[] = [];
  lines.push(
    `${'package'.padEnd(28)} ${'stmts'.padStart(8)} ${'funcs'.padStart(8)} ${'branches'.padStart(10)} ${'lines'.padStart(8)}`,
  );

  for (const p of pkgs) {
    const a = agg[p];
    if (!a) {
      lines.push(`${p.padEnd(28)} (no data)`);
      continue;
    }
    lines.push(
      `${p.padEnd(28)} ${pctString(a.sc, a.st).padStart(8)} ${pctString(a.fc, a.ft).padStart(8)} ${pctString(a.bc, a.bt).padStart(10)} ${pctString(a.lc, a.lt).padStart(8)}`,
    );
  }

  return lines.join('\n');
}

export function formatMarkdownReport(
  pkg: string,
  agg: Record<string, PackageAgg>,
  min: MinThresholds = DEFAULT_MIN,
): string {
  const { status, metrics } = evaluatePackage(pkg, agg[pkg], min);
  const lines: string[] = [`# Test coverage: @ds/${pkg}`, '', '## Метрики coverage', ''];
  lines.push('| Метрика | Описание | Минимум | Соответствие |');
  lines.push('|---------|----------|---------|--------------|');

  for (const row of METRIC_ROWS) {
    const value = metricValue(metrics, row.key);
    lines.push(
      `| ${row.label} | ${row.description} | ${min[row.key]}% | ${complianceCell(status, value, min[row.key])} |`,
    );
  }

  return lines.join('\n');
}

export function formatMarkdownCompact(
  pkgs: string[],
  agg: Record<string, PackageAgg>,
  min: MinThresholds = DEFAULT_MIN,
): string {
  const lines: string[] = ['# Test coverage: all packages', '', '## Сводка', ''];
  lines.push('| Пакет | lines | statements | functions | branches | Gate |');
  lines.push('|-------|-------|------------|-----------|----------|------|');

  const failing: string[] = [];

  for (const pkg of pkgs) {
    const { status, metrics } = evaluatePackage(pkg, agg[pkg], min);
    if (status === 'fail' || status === 'no-data') failing.push(pkg);

    const cell = (key: MetricKey) => {
      if (status === 'exempt') return '—';
      if (status === 'no-data') return '—';
      if (!metrics) return '—';
      const v = metrics[key];
      const ok = v >= min[key];
      return ok ? `✅ ${v.toFixed(1)}%` : `❌ ${v.toFixed(1)}%`;
    };

    lines.push(
      `| ${pkg} | ${cell('lines')} | ${cell('stmts')} | ${cell('funcs')} | ${cell('branches')} | ${gateLabel(status)} |`,
    );
  }

  if (failing.length > 0) {
    lines.push('', '## Детали (ниже порога или нет данных)', '');
    for (const pkg of failing) {
      lines.push(formatMarkdownReport(pkg, agg, min));
      lines.push('');
    }
  }

  return lines.join('\n');
}

export function listPackagesFromSummary(raw: Record<string, FileSummary>): string[] {
  const pkgs = new Set<string>();
  for (const path of Object.keys(raw)) {
    const seg = path.split('/packages/')[1];
    if (!seg) continue;
    pkgs.add(seg.split('/')[0]);
  }
  return [...pkgs].sort();
}
