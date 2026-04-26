#!/usr/bin/env tsx
/**
 * Extracts React component prop types from TypeScript sources
 * and writes docs/props.json per package.
 *
 * Run: pnpm gen:props
 * Output: packages/<name>/docs/props.json
 */

import { withCustomConfig } from 'react-docgen-typescript'
import { sync as globSync } from 'glob'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const parser = withCustomConfig(resolve(root, 'tsconfig.gen-props.json'), {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter(prop) {
    // Always surface children — useful for demos and docs
    if (prop.name === 'children') return true
    // Keep props defined in our own source files; skip inherited HTML attrs
    if (prop.parent?.fileName.includes('node_modules')) return false
    return true
  },
})

// Find all component source files (skip index.ts barrels — docgen doesn't follow re-exports)
const sourceFiles = globSync('packages/*/src/**/*.tsx', {
  cwd: root,
  absolute: true,
  ignore: ['**/packages/icons/**'],
})

// Group .tsx files by package directory using the packages/<name> path segment
const byPkg = new Map<string, string[]>()
for (const file of sourceFiles) {
  const [before, after] = file.split('/packages/')
  const pkgDir = `${before}/packages/${after.split('/')[0]}`
  const list = byPkg.get(pkgDir) ?? []
  list.push(file)
  byPkg.set(pkgDir, list)
}

if (byPkg.size === 0) {
  console.warn('No packages found matching packages/*/src/**/*.tsx')
  process.exit(0)
}

for (const [pkgDir, files] of byPkg) {
  const pkgName = pkgDir.split(`${root}/packages/`).pop()!
  const docsDir = resolve(pkgDir, 'docs')

  let components
  try {
    components = parser.parse(files)
  } catch (e) {
    console.warn(`⚠  ${pkgName}: parse error — ${e}`)
    continue
  }

  if (components.length === 0) {
    console.log(`—  ${pkgName}: no components found`)
    continue
  }

  const output: Record<string, ComponentDoc> = {}

  for (const comp of components) {
    const props: Record<string, PropDef> = {}

    for (const [name, prop] of Object.entries(comp.props)) {
      const typeStr = prop.type.name

      let values: string[] | undefined
      if (Array.isArray(prop.type.value)) {
        const extracted = (prop.type.value as { value: string }[])
          .map((v) => String(v.value).replace(/^"|"$/g, ''))
          .filter(Boolean)
        if (extracted.length > 0) values = extracted
      }

      const def: PropDef = { type: typeStr, required: prop.required }
      if (values) def.values = values
      if (prop.defaultValue?.value != null) {
        def.defaultValue = String(prop.defaultValue.value).replace(/^"|"$/g, '')
      }
      if (prop.description) def.description = prop.description

      props[name] = def
    }

    output[comp.displayName] = {
      displayName: comp.displayName,
      props,
      ...(comp.description ? { description: comp.description } : {}),
    }
  }

  mkdirSync(docsDir, { recursive: true })
  writeFileSync(resolve(docsDir, 'props.json'), JSON.stringify(output, null, 2) + '\n')

  const names = Object.keys(output).join(', ')
  const count = Object.values(output).reduce((n, c) => n + Object.keys(c.props).length, 0)
  console.log(`✓  ${pkgName} → docs/props.json  (${names}, ${count} props)`)
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface PropDef {
  type: string
  values?: string[]
  defaultValue?: string
  description?: string
  required: boolean
}

interface ComponentDoc {
  displayName: string
  description?: string
  props: Record<string, PropDef>
}
