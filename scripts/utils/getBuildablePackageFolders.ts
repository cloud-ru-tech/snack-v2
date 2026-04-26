import fs from 'fs'
import path from 'path'

/**
 * Package names that participate in the TS + CSS build (from packages/tsconfig.esm.json references).
 */
export function getBuildablePackageFoldersFromSolution(): string[] {
  const solutionPath = path.resolve(__dirname, '..', '..', 'packages', 'tsconfig.esm.json')
  const raw = fs.readFileSync(solutionPath, 'utf8')
  const refs: Array<{ path?: string }> = JSON.parse(raw).references ?? []
  const names: string[] = []
  for (const r of refs) {
    const p = r.path
    if (!p) continue
    const m = /^\.\/([^/]+)\/tsconfig\.esm\.json$/.exec(p)
    if (m) names.push(m[1])
  }
  return names
}
