import { existsSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const ROOT = join(__filename, '..', '..', '..')

const KEBAB_RE = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/
const PASCAL_RE = /^[A-Z][a-zA-Z0-9]+$/

const RESERVED = new Set(['tokens', 'tsconfig', 'tests', 'scripts', 'tooling', 'apps'])

export type ValidateResult = { ok: true } | { ok: false; message: string }

export function validatePackageName(name: string): ValidateResult {
  if (!KEBAB_RE.test(name)) {
    return {
      ok: false,
      message: `Package name must be kebab-case (e.g. "my-component"). Got: "${name}"`,
    }
  }
  if (RESERVED.has(name)) {
    return { ok: false, message: `"${name}" is a reserved directory name.` }
  }
  return { ok: true }
}

export function validateComponentName(name: string): ValidateResult {
  if (!PASCAL_RE.test(name)) {
    return {
      ok: false,
      message: `Component name must be PascalCase (e.g. "MyComponent"). Got: "${name}"`,
    }
  }
  return { ok: true }
}

export function packageExists(pkgName: string): boolean {
  return existsSync(join(ROOT, 'packages', pkgName))
}

export function toPascal(str: string): string {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

export function toKebab(str: string): string {
  return str
    .replace(/([A-Z])/g, (m, _, offset: number) => (offset > 0 ? '-' : '') + m.toLowerCase())
}
