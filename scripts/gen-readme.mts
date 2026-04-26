#!/usr/bin/env tsx
/**
 * Generates README.md for each component package.
 *
 * Source of truth:
 *   docs/index.mdx   — package overview (installation, see-also, etc.)
 *   docs/<comp>.mdx  — per-component content (variants, sizes, etc.)
 *   docs/props.json  — auto-generated prop types
 *
 * Run: pnpm gen:readme
 * Output: packages/<name>/README.md
 */

import { sync as globSync } from 'glob'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function packageExportsStyleCss(npmName: string): boolean {
  const folder = npmName.replace(/^@ds\//, '')
  const pkgPath = resolve(root, 'packages', folder, 'package.json')
  if (!existsSync(pkgPath)) return false
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as { exports?: Record<string, unknown> }
    return Boolean(pkg.exports && typeof pkg.exports === 'object' && './style.css' in pkg.exports)
  } catch {
    return false
  }
}

// Find packages that have at least one MDX file in docs/
const pkgDirs = [
  ...new Set(
    globSync('packages/*/docs/*.mdx', { cwd: root, absolute: true }).map(
      (f) => f.split('/packages/')[0] + '/packages/' + f.split('/packages/')[1].split('/')[0],
    ),
  ),
]

if (pkgDirs.length === 0) {
  console.warn('No packages found with docs/*.mdx')
  process.exit(0)
}

for (const pkgDir of pkgDirs) {
  const pkgName = pkgDir.split(`${root}/packages/`).pop()!
  const propsPath = resolve(pkgDir, 'docs/props.json')

  if (!existsSync(propsPath)) {
    console.warn(`⚠  ${pkgName}: docs/props.json not found — run pnpm gen:props first`)
    continue
  }

  const propsData = JSON.parse(readFileSync(propsPath, 'utf-8')) as Record<string, ComponentDoc>
  const pkgJson = JSON.parse(readFileSync(resolve(pkgDir, 'package.json'), 'utf-8')) as {
    name: string
  }
  const npmName = pkgJson.name

  // Entry point: prefer index.mdx, fall back to overview.mdx (legacy)
  const indexPath =
    existsPath(resolve(pkgDir, 'docs/index.mdx')) ??
    existsPath(resolve(pkgDir, 'docs/overview.mdx'))

  if (!indexPath) {
    console.warn(`⚠  ${pkgName}: no docs/index.mdx found`)
    continue
  }

  const indexRaw = readFileSync(indexPath, 'utf-8')
  const frontmatter = parseFrontmatter(indexRaw)
  const indexBody = stripFrontmatter(indexRaw)

  // Find per-component MDX files (everything in docs/ except index.mdx / overview.mdx)
  const componentMdxFiles = globSync('docs/*.mdx', { cwd: pkgDir, absolute: true }).filter(
    (f) => !['index.mdx', 'overview.mdx'].includes(basename(f)),
  )

  const readme = buildReadme({
    frontmatter,
    indexBody,
    componentMdxFiles,
    propsData,
    npmName,
  })

  writeFileSync(resolve(pkgDir, 'README.md'), readme)
  const comps = Object.keys(propsData).join(', ')
  console.log(`✓  ${pkgName} → README.md  (${comps})`)
}

// ─── Builder ─────────────────────────────────────────────────────────────────

function buildReadme({
  frontmatter,
  indexBody,
  componentMdxFiles,
  propsData,
  npmName,
}: {
  frontmatter: Record<string, string>
  indexBody: string
  componentMdxFiles: string[]
  propsData: Record<string, ComponentDoc>
  npmName: string
}): string {
  const description = frontmatter.description ?? ''
  const title = frontmatter.title ?? npmName

  // Transform the index body for README (remove imports, JSX components, doc links)
  const indexSection = transformIndexBody(indexBody, npmName)

  // Build per-component sections — sorted by MDX frontmatter `order`, then name
  const componentSections = Object.entries(propsData)
    .map(([name, doc]) => {
      const mdxFile = findComponentMdx(name, componentMdxFiles)
      const order = mdxFile
        ? Number(parseFrontmatter(readFileSync(mdxFile, 'utf-8')).order ?? 100)
        : 100
      return { name, doc, mdxFile, order }
    })
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
    .map(({ name, doc, mdxFile }) => buildComponentSection(name, doc, mdxFile, npmName))

  const parts = [
    `# ${title}`,
    `\`${npmName}\` — ${description}`,
    indexSection,
    ...componentSections,
  ]

  return parts.filter(Boolean).join('\n\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n'
}

function transformIndexBody(body: string, npmName: string): string {
  let md = removeTopLevelImports(body)

  // Remove the first H1 (we generate our own)
  md = md.replace(/^#\s+.+\n*/m, '')

  // Remove JSX demo components (<*Demo client:load />)
  md = md.replace(/<\w+Demo[^>]*client:load\s*\/>/g, '')

  // Remove "Подробнее" links that point to /components/... internal paths
  md = md.replace(/Подробнее:.+\n?/g, '')

  // Remove H2 headings that have no content before the next H2 (empty demo sections)
  // Only match when the NEXT non-blank content is another ## heading (not end-of-line)
  md = md.replace(/^##\s+.+\n+(?=##)/gm, '')

  // Replace markdown links to /components/... with plain text (no portal link in README)
  md = md.replace(/\[([^\]]+)\]\(\/components\/[^)]+\)/g, '**$1**')

  // Remove the component table (it's the index overview, redundant in README)
  // Detect and strip: | Компонент | ... | headers
  md = stripComponentIndexTable(md)

  // Collapse blank lines
  return md.replace(/\n{3,}/g, '\n\n').trim()
}

function stripComponentIndexTable(md: string): string {
  // Remove markdown tables whose header row contains "Компонент"
  return md.replace(/\|[^|\n]*Компонент[^|\n]*\|[\s\S]*?(?=\n\n|\n#|$)/g, '').trim()
}

function buildComponentSection(
  name: string,
  doc: ComponentDoc,
  mdxFile: string | undefined,
  npmName: string,
): string {
  const parts: string[] = [`## ${name}`]

  if (mdxFile) {
    const raw = readFileSync(mdxFile, 'utf-8')
    const fm = parseFrontmatter(raw)
    const body = stripFrontmatter(raw)

    if (fm.description) parts.push(fm.description)

    let md = removeTopLevelImports(body)
    md = md.replace(/^#\s+.+\n*/m, '')                           // strip H1
    md = md.replace(/<\w+Demo[^>]*client:load\s*\/>/g, '')        // strip demo JSX
    md = md.replace(/<PropsTable\s[^/]*\/>/gs, generatePropsTable(doc))  // inline props table
    md = md.replace(/\n{3,}/g, '\n\n').trim()
    parts.push(md)
  } else {
    // No MDX — generate from props.json only
    parts.push(generateUsageBlock(doc, npmName))
    parts.push('### Props')
    parts.push(generatePropsTable(doc))
  }

  return parts.filter(Boolean).join('\n\n')
}

// ─── MDX helpers ─────────────────────────────────────────────────────────────

function removeTopLevelImports(content: string): string {
  const lines = content.split('\n')
  const out: string[] = []
  let inFence = false

  for (const line of lines) {
    if (line.match(/^```/)) inFence = !inFence
    if (!inFence && /^import .+ from ['"]/.test(line)) continue
    out.push(line)
  }

  return out.join('\n')
}

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]+?)\n---/)
  if (!match) return {}
  return Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => {
        const idx = line.indexOf(':')
        if (idx === -1) return null
        const key = line.slice(0, idx).trim()
        const value = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '')
        return [key, value]
      })
      .filter((e): e is [string, string] => e !== null),
  )
}

function stripFrontmatter(content: string): string {
  return content.replace(/^---\n[\s\S]+?\n---\n?/, '')
}

// ─── Generators ──────────────────────────────────────────────────────────────

function generateUsageBlock(doc: ComponentDoc, npmName: string): string {
  const comp = doc.displayName
  const styleLine = packageExportsStyleCss(npmName) ? `\nimport '${npmName}/style.css'` : ''

  // Hooks are not valid JSX tags — avoid bogus <useFoo> examples.
  if (/^use[A-Z]/.test(comp)) {
    return `\`\`\`tsx
import { ${comp} } from '${npmName}'${styleLine}

// Используйте хук внутри React-компонента (см. разделы выше в этом README).
\`\`\``
  }

  const SKIP = new Set(['size', 'loading', 'disabled', 'children', 'label'])
  const propStr = Object.entries(doc.props)
    .filter(([name, prop]) => !SKIP.has(name) && prop.defaultValue !== undefined)
    .map(([name, prop]) => {
      const val = prop.defaultValue!
      if (prop.type === 'boolean') return val === 'true' ? name : ''
      return `${name}="${val}"`
    })
    .filter(Boolean)
    .join(' ')

  const jsxProps = propStr ? ` ${propStr}` : ''

  return `\`\`\`tsx
import { ${comp} } from '${npmName}'${styleLine}

export function Example() {
  return <${comp}${jsxProps}>Click me</${comp}>
}
\`\`\``
}

function generatePropsTable(doc: ComponentDoc): string {
  const rows = Object.entries(doc.props).map(([name, prop]) => {
    const type = prop.values?.length
      ? prop.values.map((v) => `\`"${v}"\``).join(' \\| ')
      : `\`${prop.type}\``
    const def = prop.defaultValue !== undefined ? `\`${prop.defaultValue}\`` : '—'
    const desc = prop.description ?? ''
    return `| \`${name}\` | ${type} | ${def} | ${desc} |`
  })
  return [
    '| Prop | Type | Default | Description |',
    '|------|------|---------|-------------|',
    ...rows,
  ].join('\n')
}

// ─── Utils ───────────────────────────────────────────────────────────────────

function findComponentMdx(compName: string, files: string[]): string | undefined {
  // Convert "ButtonIcon" → "button-icon", "Button" → "button"
  const kebab = compName
    .replace(/([A-Z])/g, (m, l, i) => (i === 0 ? l : `-${l}`))
    .toLowerCase()
  return files.find((f) => basename(f, '.mdx') === kebab)
}

function existsPath(p: string): string | undefined {
  return existsSync(p) ? p : undefined
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
