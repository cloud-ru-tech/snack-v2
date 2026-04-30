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

  // Find per-component MDX files (everything in docs/ except index.mdx / overview.mdx)
  const componentMdxFiles = globSync('docs/*.mdx', { cwd: pkgDir, absolute: true }).filter(
    (f) => !['index.mdx', 'overview.mdx'].includes(basename(f)),
  )

  const consumedComponents = new Set<string>()
  const indexRaw = readFileSync(indexPath, 'utf-8')
  const frontmatter = parseFrontmatter(indexRaw)
  const indexBody = renderMdxBody(indexRaw, indexPath, propsData, consumedComponents)

  const readme = buildReadme({
    frontmatter,
    indexBody,
    componentMdxFiles,
    propsData,
    npmName,
    consumedComponents,
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
  consumedComponents,
}: {
  frontmatter: Record<string, string>
  indexBody: string
  componentMdxFiles: string[]
  propsData: Record<string, ComponentDoc>
  npmName: string
  consumedComponents: Set<string>
}): string {
  const description = frontmatter.description ?? ''
  const title = frontmatter.title ?? npmName

  // Per-component sections — sorted by MDX `order`, then name. Skip components
  // whose props table is already inlined in the index body or per-component MDX.
  const componentSections = Object.entries(propsData)
    .map(([name, doc]) => {
      const mdxFile = findComponentMdx(name, componentMdxFiles)
      const order = mdxFile
        ? Number(parseFrontmatter(readFileSync(mdxFile, 'utf-8')).order ?? 100)
        : 100
      return { name, doc, mdxFile, order }
    })
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
    .map(({ name, doc, mdxFile }) => {
      if (mdxFile) {
        // Per-component MDX: render and let it consume its own PropsTable.
        return buildComponentSectionFromMdx(name, doc, mdxFile, propsData, consumedComponents)
      }
      if (consumedComponents.has(name)) return ''
      // Skip non-component utilities/internals — published README only documents the public component API.
      if (!isPublicComponent(name)) return ''
      return buildComponentSectionAuto(name, doc, npmName)
    })
    .filter(Boolean)

  const parts = [
    `# ${title}`,
    `\`${npmName}\` — ${description}`,
    indexBody,
    ...componentSections,
  ]

  return parts.filter(Boolean).join('\n\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n'
}

// Heuristic: only `Capital`-named symbols document a published component or hook.
// Lowercase exports (`formatValue`, `getPosition`, …) are utilities — skip.
function isPublicComponent(name: string): boolean {
  return /^[A-Z]/.test(name) || /^use[A-Z]/.test(name)
}

// Parse top-level `import` statements relevant for README expansion:
//  - `?raw` source imports → file path (used to inline <Example code={Var}/>)
//  - `props.json` imports   → propsData (used to inline <PropsTable data={var.Comp}/>)
function collectMdxImports(
  body: string,
  mdxPath: string,
  propsData: Record<string, ComponentDoc>,
): { rawImports: Map<string, string>; docImports: Map<string, Record<string, ComponentDoc>> } {
  const rawImports = new Map<string, string>()
  const docImports = new Map<string, Record<string, ComponentDoc>>()
  const lines = body.split('\n')
  let inFence = false
  for (const line of lines) {
    if (line.match(/^```/)) inFence = !inFence
    if (inFence) continue
    const raw = line.match(/^import\s+(\w+)\s+from\s+['"]([^'"]+\?raw)['"]/)
    if (raw) {
      const [, name, spec] = raw
      const cleanSpec = spec.replace(/\?raw$/, '')
      rawImports.set(name, resolve(dirname(mdxPath), cleanSpec))
      continue
    }
    const doc = line.match(/^import\s+(\w+)\s+from\s+['"]([^'"]+\.json)['"]/)
    if (doc) {
      rawImports
      const [, name] = doc
      // We always alias to the package's own props.json — index.mdx convention.
      docImports.set(name, propsData)
      continue
    }
  }
  return { rawImports, docImports }
}

// Full MDX → README transform. Inlines <Example> code from `?raw` imports,
// inlines <PropsTable> as a markdown table, strips MDX-only JSX (Storybook,
// Figma, *Demo, anything with client:*).
function renderMdxBody(
  raw: string,
  mdxPath: string,
  propsData: Record<string, ComponentDoc>,
  consumedComponents: Set<string>,
): string {
  const body = stripFrontmatter(raw)
  const { rawImports, docImports } = collectMdxImports(body, mdxPath, propsData)

  let md = removeTopLevelImports(body)

  // Strip first H1 — we render our own from frontmatter.
  md = md.replace(/^#\s+.+\n*/m, '')

  md = expandExamples(md, rawImports)
  md = expandPropsTables(md, docImports, consumedComponents)
  md = stripMdxOnlyJsx(md)
  md = stripDocsOnlyContent(md)
  md = stripEmptyHeadings(md)

  return md.replace(/\n{3,}/g, '\n\n').trim()
}

// <Example title='X' description='Y' code={Src}>...</Example>
//   → ### X
//      Y
//      ```tsx
//      <contents of Src file>
//      ```
function expandExamples(body: string, rawImports: Map<string, string>): string {
  return body.replace(/<Example\b([^>]*)>([\s\S]*?)<\/Example>/g, (_full, attrs: string) => {
    const title = readJsxAttr(attrs, 'title')
    const description = readJsxAttr(attrs, 'description')
    const codeVar = attrs.match(/code=\{(\w+)\}/)?.[1]
    const codeFile = codeVar ? rawImports.get(codeVar) : undefined
    const code = codeFile && existsSync(codeFile) ? readFileSync(codeFile, 'utf-8').trimEnd() : ''
    const out: string[] = []
    if (title) out.push(`### ${title}`)
    if (description) out.push(description)
    if (code) out.push('```tsx\n' + code + '\n```')
    return out.join('\n\n')
  })
}

// <PropsTable data={varname.Component} /> or <PropsTable data={varname} />
function expandPropsTables(
  body: string,
  docImports: Map<string, Record<string, ComponentDoc>>,
  consumedComponents: Set<string>,
): string {
  return body.replace(/<PropsTable\b([^/]*)\/>/g, (_full, attrs: string) => {
    const m = attrs.match(/data=\{(\w+)(?:\.(\w+))?\}/)
    if (!m) return ''
    const [, varname, compName] = m
    const data = docImports.get(varname)
    if (!data) return ''
    if (compName) {
      const doc = data[compName]
      if (!doc) return ''
      consumedComponents.add(compName)
      return generatePropsTable(doc)
    }
    // No `.Component` accessor — assume single-component package.
    const onlyName = Object.keys(data)[0]
    const doc = onlyName ? data[onlyName] : undefined
    if (!doc) return ''
    consumedComponents.add(onlyName)
    return generatePropsTable(doc)
  })
}

// Strip JSX that has no plain-Markdown equivalent: storybook iframe, figma iframe,
// `*Demo` / `*Scenario` interactive widgets, anything carrying a `client:*` directive.
function stripMdxOnlyJsx(body: string): string {
  let md = body
  // Self-closing or paired with explicit names + Demo/Scenario suffix.
  const namedTags = ['StorybookEmbed', 'FigmaEmbed', 'Canvas', '\\w+Demo', '\\w+Scenario'].join('|')
  md = md.replace(new RegExp(`<(?:${namedTags})\\b[^>]*\\/>`, 'g'), '')
  md = md.replace(new RegExp(`<(?:${namedTags})\\b[^>]*>[\\s\\S]*?<\\/(?:${namedTags})>`, 'g'), '')
  // Anything else with a `client:*` hydration directive is MDX-only (won't render here).
  md = md.replace(/<[A-Z]\w*\b[^>]*\bclient:\w+[^>]*\/>/g, '')
  md = md.replace(/<([A-Z]\w*)\b[^>]*\bclient:\w+[^>]*>[\s\S]*?<\/\1>/g, '')
  return md
}

function stripDocsOnlyContent(body: string): string {
  let md = body
  // "Подробнее: ..." links to docs portal.
  md = md.replace(/Подробнее:.+\n?/g, '')
  // [text](/components/...) → bold text (no portal link in README).
  md = md.replace(/\[([^\]]+)\]\(\/components\/[^)]+\)/g, '**$1**')
  // Index overview tables ("| Компонент | ... |") — redundant for a published README.
  md = md.replace(/\|[^|\n]*Компонент[^|\n]*\|[\s\S]*?(?=\n\n|\n#|$)/g, '').trim()
  return md
}

// Drop H2/H3 sections whose body is empty after JSX stripping. A heading is
// "empty" only if no non-heading content appears before the next sibling
// (heading of same-or-higher level). We do NOT eat an H2 just because an H3
// follows — the H3 is the H2's content.
function stripEmptyHeadings(body: string): string {
  let prev: string
  let md = body
  do {
    prev = md
    // Empty H3: next non-blank is H1, H2 or H3 (i.e. a sibling/parent).
    md = md.replace(/^###\s+.+\n+(?=#{1,3}\s)/gm, '')
    // Empty H2: next non-blank is H1 or H2 (NOT H3 — that's content of this H2).
    md = md.replace(/^##\s+.+\n+(?=#{1,2}\s)/gm, '')
    // Dangling H2/H3 at EOF with nothing after.
    md = md.replace(/^(#{2,3})\s+.+\s*$(?![\s\S]*\S)/m, '')
  } while (prev !== md)
  return md
}

function readJsxAttr(attrs: string, name: string): string {
  const re = new RegExp(`${name}=(?:'([^']*)'|"([^"]*)"|\\{['"]([^'"]*)['"]\\})`)
  const m = attrs.match(re)
  return m ? m[1] ?? m[2] ?? m[3] ?? '' : ''
}

function buildComponentSectionFromMdx(
  name: string,
  _doc: ComponentDoc,
  mdxFile: string,
  propsData: Record<string, ComponentDoc>,
  consumedComponents: Set<string>,
): string {
  const raw = readFileSync(mdxFile, 'utf-8')
  const fm = parseFrontmatter(raw)
  // Bump headings down by one level — the rendered MDX nests under `## ${name}`.
  const md = bumpHeadings(renderMdxBody(raw, mdxFile, propsData, consumedComponents))
  const parts: string[] = [`## ${name}`]
  if (fm.description) parts.push(fm.description)
  if (md) parts.push(md)
  return parts.filter(Boolean).join('\n\n')
}

function bumpHeadings(md: string): string {
  // ## → ###, ### → ####, … (cap at H6 — Markdown's max). Outside fenced code.
  const lines = md.split('\n')
  let inFence = false
  return lines
    .map((line) => {
      if (line.match(/^```/)) inFence = !inFence
      if (inFence) return line
      const m = line.match(/^(#{2,5})(\s.*)$/)
      return m ? `#${m[1]}${m[2]}` : line
    })
    .join('\n')
}

function buildComponentSectionAuto(name: string, doc: ComponentDoc, npmName: string): string {
  return [
    `## ${name}`,
    generateUsageBlock(doc, npmName),
    '### Props',
    generatePropsTable(doc),
  ]
    .filter(Boolean)
    .join('\n\n')
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
