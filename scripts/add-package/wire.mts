import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const ROOT = join(__filename, '..', '..', '..')

function readJson(filePath: string): Record<string, unknown> {
  return JSON.parse(readFileSync(filePath, 'utf8')) as Record<string, unknown>
}

function writeJson(filePath: string, data: Record<string, unknown>): void {
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

function insertJsonReference(
  filePath: string,
  newRef: { path: string },
  insertAfterPrefix: string,
  dryRun: boolean,
  label: string,
): void {
  const cfg = readJson(filePath)
  const refs = (cfg.references as Array<{ path: string }> | undefined) ?? []
  if (refs.some((r) => r.path === newRef.path)) return

  const lastIdx = refs.reduce(
    (max, r, i) => (r.path.startsWith(insertAfterPrefix) ? i : max),
    -1,
  )
  refs.splice(lastIdx + 1, 0, newRef)
  cfg.references = refs

  if (dryRun) {
    console.info(`  [dry-run] ${label}: add reference "${newRef.path}"`)
    return
  }
  writeJson(filePath, cfg)
}

export function wireTsconfig(pkgName: string, dryRun = false): void {
  const esmSolution = join(ROOT, 'packages', 'tsconfig.esm.json')
  insertJsonReference(
    esmSolution,
    { path: `./${pkgName}/tsconfig.esm.json` },
    './',
    dryRun,
    'packages/tsconfig.esm.json',
  )

  const cjsSolution = join(ROOT, 'packages', 'tsconfig.cjs.json')
  insertJsonReference(
    cjsSolution,
    { path: `./${pkgName}/tsconfig.cjs.json` },
    './',
    dryRun,
    'packages/tsconfig.cjs.json',
  )
}

export function wireStorybookDep(pkgName: string, dryRun = false): void {
  const pkgPath = join(ROOT, 'apps', 'storybook', 'package.json')
  const pkg = readJson(pkgPath)
  const deps = (pkg.dependencies ?? {}) as Record<string, string>

  const dep = `@ds/${pkgName}`
  if (deps[dep]) return

  deps[dep] = 'workspace:*'
  pkg.dependencies = Object.fromEntries(Object.entries(deps).sort())

  if (dryRun) {
    console.info(`  [dry-run] apps/storybook/package.json: add "${dep}": "workspace:*"`)
    return
  }
  writeJson(pkgPath, pkg)
}
