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
  const refs = cfg.references as Array<{ path: string }>
  if (refs.some((r) => r.path === newRef.path)) return

  const lastIdx = refs.reduce(
    (max, r, i) => (r.path.startsWith(insertAfterPrefix) ? i : max),
    -1,
  )
  refs.splice(lastIdx + 1, 0, newRef)
  cfg.references = refs

  if (dryRun) {
    console.log(`  [dry-run] ${label}: add reference "${newRef.path}"`)
    return
  }
  writeJson(filePath, cfg)
}

export function wireTsconfig(pkgName: string, dryRun = false): void {
  const tsconfigPath = join(ROOT, 'tsconfig.json')
  insertJsonReference(
    tsconfigPath,
    { path: `./packages/${pkgName}` },
    './packages/',
    dryRun,
    'tsconfig.json',
  )

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

export function wireStorybookAlias(pkgName: string, dryRun = false): void {
  const mainPath = join(ROOT, 'apps', 'storybook', '.storybook', 'main.ts')
  let content = readFileSync(mainPath, 'utf8')

  const alias = `'@ds/${pkgName}': join(root, 'packages/${pkgName}/src/index.ts'),`
  if (content.includes(alias)) return

  const marker = '// </add-package:aliases>'
  if (!content.includes(marker)) {
    throw new Error(
      `Anchor comment "${marker}" not found in apps/storybook/.storybook/main.ts`,
    )
  }

  content = content.replace(marker, `        ${alias}\n        ${marker}`)

  if (dryRun) {
    console.log(`  [dry-run] main.ts: add alias "@ds/${pkgName}"`)
    return
  }
  writeFileSync(mainPath, content, 'utf8')
}

export function wireDocsAlias(pkgName: string, dryRun = false): void {
  const configPath = join(ROOT, 'apps', 'docs', 'astro.config.mjs')
  let content = readFileSync(configPath, 'utf8')

  const alias = `'@ds/${pkgName}': resolve(root, 'packages/${pkgName}/src/index.ts'),`
  if (content.includes(alias)) return

  const marker = '// </add-package:aliases>'
  if (!content.includes(marker)) {
    throw new Error(
      `Anchor comment "${marker}" not found in apps/docs/astro.config.mjs`,
    )
  }

  content = content.replace(marker, `        ${alias}\n        ${marker}`)

  if (dryRun) {
    console.log(`  [dry-run] astro.config.mjs: add alias "@ds/${pkgName}"`)
    return
  }
  writeFileSync(configPath, content, 'utf8')
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
    console.log(`  [dry-run] apps/storybook/package.json: add "${dep}": "workspace:*"`)
    return
  }
  writeJson(pkgPath, pkg)
}
