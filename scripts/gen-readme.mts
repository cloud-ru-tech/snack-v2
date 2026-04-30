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
import { existsSync,readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname,resolve } from 'node:path'
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

// Find packages that have either MDX docs or generated props (auto README still useful for
// SCSS-only packages like @ds/materials and internal *-private packages without docs).
const pkgDirs = [
  ...new Set(
    globSync('packages/*/docs/{*.mdx,props.json}', { cwd: root, absolute: true }).map(
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
  const propsData: Record<string, ComponentDoc> = existsSync(propsPath)
    ? (JSON.parse(readFileSync(propsPath, 'utf-8')) as Record<string, ComponentDoc>)
    : {}
  const pkgJson = JSON.parse(readFileSync(resolve(pkgDir, 'package.json'), 'utf-8')) as {
    name: string
    description?: string
  }
  const npmName = pkgJson.name

  // Entry point: prefer index.mdx, fall back to overview.mdx (legacy)
  const indexPath =
    existsPath(resolve(pkgDir, 'docs/index.mdx')) ??
    existsPath(resolve(pkgDir, 'docs/overview.mdx'))

  // Find per-component MDX files (everything in docs/ except index.mdx / overview.mdx)
  const componentMdxFiles = globSync('docs/*.mdx', { cwd: pkgDir, absolute: true }).filter(
    (f) => !['index.mdx', 'overview.mdx'].includes(basename(f)),
  )

  const consumedComponents = new Set<string>()
  let frontmatter: Record<string, string>
  let indexBody = ''
  if (indexPath) {
    const indexRaw = readFileSync(indexPath, 'utf-8')
    frontmatter = parseFrontmatter(indexRaw)
    indexBody = renderMdxBody(indexRaw, indexPath, propsData, consumedComponents)
  } else {
    // No MDX — derive title/description from package.json so the README still has a header.
    frontmatter = {
      title: npmName.replace(/^@ds\//, ''),
      description: pkgJson.description ?? '',
    }
  }

  const readme = buildReadme({
    frontmatter,
    indexBody,
    componentMdxFiles,
    propsData,
    npmName,
    pkgDir,
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
  pkgDir,
  consumedComponents,
}: {
  frontmatter: Record<string, string>
  indexBody: string
  componentMdxFiles: string[]
  propsData: Record<string, ComponentDoc>
  npmName: string
  pkgDir: string
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
      // Skip compound aliases (`Tabs.Tab` duplicates `Tab`).
      if (name.includes('.')) return ''
      // Skip components that have neither MDX nor a demo example — they're
      // internal helpers (e.g. ScrollButton). The README mirrors the docs surface.
      // Exception: if the package has no demos/examples at all (SCSS-only or
      // *-private packages), render auto sections so the README isn't empty.
      const examplesDirExists = existsSync(resolve(pkgDir, 'demos/examples'))
      if (examplesDirExists && !findDemoExample(doc.displayName, pkgDir)) return ''
      return buildComponentSectionAuto(name, doc, npmName, pkgDir)
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
  md = reorderH2Sections(md)

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
      return renderInlinePropsBlock(doc)
    }
    // No `.Component` accessor — assume single-component package.
    const onlyName = Object.keys(data)[0]
    const doc = onlyName ? data[onlyName] : undefined
    if (!doc) return ''
    consumedComponents.add(onlyName)
    return renderInlinePropsBlock(doc)
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
  // Strip `## Установка` — installation is shown once at the top of the README.
  const md = bumpHeadings(
    dropH2Section(renderMdxBody(raw, mdxFile, propsData, consumedComponents), 'установка'),
  )
  const parts: string[] = [`## ${name}`]
  if (fm.description) parts.push(fm.description)
  if (md) parts.push(md)
  return parts.filter(Boolean).join('\n\n')
}

// Sort top-level H2 sections so README order matches the docs site (docSections.mjs).
// Non-canonical H2s keep their position relative to each other.
function reorderH2Sections(md: string): string {
  // Mirrors apps/docs/src/config/docSections.mjs DOC_SECTIONS — keep in sync.
  const CANONICAL_H2_ORDER: Record<string, number> = {
    'демо': 0,
    'когда использовать': 1,
    'анатомия': 2,
    'установка': 3,
    'примеры использования': 4,
    'props': 5,
    'storybook': 6,
    'figma': 7,
    'смотри также': 8,
  }

  const lines = md.split('\n')
  const sections: { title: string; rank: number; idx: number; lines: string[] }[] = []
  const preamble: string[] = []
  let inFence = false
  let cur: { title: string; rank: number; idx: number; lines: string[] } | null = null

  for (const line of lines) {
    if (line.match(/^```/)) inFence = !inFence
    const m = !inFence && line.match(/^##\s+(.+)$/)
    if (m) {
      if (cur) sections.push(cur)
      const title = m[1].trim().toLowerCase()
      const rank = CANONICAL_H2_ORDER[title] ?? Number.NaN
      cur = { title, rank, idx: sections.length, lines: [line] }
    } else if (cur) {
      cur.lines.push(line)
    } else {
      preamble.push(line)
    }
  }
  if (cur) sections.push(cur)

  if (sections.length === 0) return md

  const withRanks = sections.map((s, i) => ({ ...s, idx: i }))
  withRanks.sort((a, b) => {
    const ar = Number.isNaN(a.rank) ? Infinity : a.rank
    const br = Number.isNaN(b.rank) ? Infinity : b.rank
    if (ar !== br) return ar - br
    return a.idx - b.idx
  })

  return [...preamble, ...withRanks.flatMap((s) => s.lines)].join('\n')
}

// Remove an H2 section (heading + body) by lowercase title match. Body extends
// until the next H1/H2 or end of file. Fenced code blocks are respected.
function dropH2Section(md: string, lowercaseTitle: string): string {
  const lines = md.split('\n')
  const out: string[] = []
  let inFence = false
  let dropping = false
  for (const line of lines) {
    if (line.match(/^```/)) inFence = !inFence
    if (!inFence) {
      const h2 = line.match(/^##\s+(.+)$/)
      if (h2) {
        dropping = h2[1].trim().toLowerCase() === lowercaseTitle
        if (dropping) continue
      } else if (dropping && /^#\s/.test(line)) {
        dropping = false
      }
    }
    if (!dropping) out.push(line)
  }
  return out.join('\n')
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

function buildComponentSectionAuto(
  name: string,
  doc: ComponentDoc,
  npmName: string,
  pkgDir: string,
): string {
  return [
    `## ${name}`,
    generateUsageBlock(doc, npmName, pkgDir),
    generatePropsSection(doc),
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

// Pull a real example from packages/<pkg>/demos/examples/*.tsx — first file
// that mentions `<ComponentName` is inlined verbatim. If none found, return ''.
function generateUsageBlock(doc: ComponentDoc, _npmName: string, pkgDir: string): string {
  const comp = doc.displayName
  const example = findDemoExample(comp, pkgDir)
  if (!example) return ''
  return '```tsx\n' + example.trimEnd() + '\n```'
}

function findDemoExample(componentName: string, pkgDir: string): string | undefined {
  const examplesDir = resolve(pkgDir, 'demos/examples')
  if (!existsSync(examplesDir)) return undefined
  const files = globSync('*.tsx', { cwd: examplesDir, absolute: true }).sort()
  // Prefer file whose name matches the component (e.g. Counter.tsx for Counter).
  const tag = new RegExp(`<${componentName}[\\s/>]|\\.${componentName}[\\s/>]`)
  const exact = files.find((f) => basename(f, '.tsx') === componentName)
  const candidates = exact ? [exact, ...files.filter((f) => f !== exact)] : files
  for (const f of candidates) {
    const src = readFileSync(f, 'utf-8')
    if (tag.test(src)) return src
  }
  return undefined
}

function generatePropsSection(doc: ComponentDoc): string {
  const heading = doc.propsTypeName ? `### Props \`${doc.propsTypeName}\`` : '### Props'
  const parts = [heading, generatePropsTable(doc)]
  const related = renderRelatedTypes(doc.relatedTypes)
  if (related) parts.push(related)
  return parts.join('\n\n')
}

// Inlined into MDX where the surrounding section already has a heading.
function renderInlinePropsBlock(doc: ComponentDoc): string {
  const parts: string[] = []
  if (doc.propsTypeName) parts.push(`**${doc.propsTypeName}**`)
  parts.push(generatePropsTable(doc))
  const related = renderRelatedTypes(doc.relatedTypes)
  if (related) parts.push(related)
  return parts.join('\n\n')
}

function generatePropsTable(doc: ComponentDoc): string {
  const rows = Object.entries(doc.props).map(([name, prop]) => {
    const type = formatPropType(prop)
    const def = prop.defaultValue !== undefined ? `\`${escapeCell(prop.defaultValue)}\`` : '—'
    const desc = formatCellText(prop.description ?? '')
    return `| \`${escapeCell(name)}\` | ${type} | ${def} | ${desc} |`
  })
  return [
    '| Prop | Type | Default | Description |',
    '|------|------|---------|-------------|',
    ...rows,
  ].join('\n')
}

function formatPropType(prop: PropDef): string {
  if (prop.values?.length) {
    return prop.values.map((v) => `\`"${escapeCell(v)}"\``).join(' \\| ')
  }
  if (prop.typeRefs?.length) {
    return prop.typeRefs.map((r) => `\`${escapeCell(r)}\``).join(' \\| ')
  }
  return `\`${escapeCell(prop.type)}\``
}

// Markdown table cells are single-line: a literal newline ends the row, a `|`
// starts a new column. Collapse whitespace and escape pipes; keep `<br/>` so
// hand-written multi-line descriptions still render line breaks.
function formatCellText(text: string): string {
  return text
    .replace(/\r\n?/g, '\n')
    .replace(/\n+/g, ' <br/> ')
    .replace(/\|/g, '\\|')
    .replace(/\s+/g, ' ')
    .replace(/(?:\s*<br\/>\s*){2,}/g, ' <br/> ')
    .trim()
}

function escapeCell(text: string): string {
  return text.replace(/\r\n?/g, '\n').replace(/\n+/g, ' ').replace(/\|/g, '\\|').trim()
}

// Renders unions/aliases/interfaces from props.json relatedTypes. Skips
// inherited DOM/ARIA types (`HTMLAttributes`, `AriaAttributes`, …) — they
// describe the host element, not the component's own API.
function renderRelatedTypes(relatedTypes?: Record<string, RelatedType>): string {
  if (!relatedTypes) return ''
  const entries = Object.entries(relatedTypes).filter(([, t]) => t.own !== false)
  if (entries.length === 0) return ''
  const parts: string[] = []
  for (const [name, t] of entries) {
    if (t.kind === 'union') {
      const values = t.values.map((v) => `\`"${v}"\``).join(' \\| ')
      parts.push(`- \`${name}\` = ${values}`)
    } else if (t.kind === 'alias') {
      parts.push(`- \`${name}\` = \`${t.type}\``)
    } else if (t.kind === 'interface') {
      const rows = Object.entries(t.props).map(([pname, p]) => {
        const type = formatPropType(p)
        const def = p.defaultValue !== undefined ? `\`${escapeCell(p.defaultValue)}\`` : '—'
        const desc = formatCellText(p.description ?? '')
        return `| \`${escapeCell(pname)}\` | ${type} | ${def} | ${desc} |`
      })
      parts.push(
        `**${name}**`,
        ['| Prop | Type | Default | Description |', '|------|------|---------|-------------|', ...rows].join('\n'),
      )
    }
  }
  if (parts.length === 0) return ''
  return ['#### Related types', ...parts].join('\n\n')
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

type PropDef = {
  type: string
  values?: string[]
  typeRefs?: string[]
  defaultValue?: string
  description?: string
  required: boolean
}

type RelatedType =
  | { kind: 'union'; values: string[]; own?: boolean }
  | { kind: 'alias'; type: string; own?: boolean }
  | { kind: 'interface'; props: Record<string, PropDef>; own?: boolean }

type ComponentDoc = {
  displayName: string
  description?: string
  propsTypeName?: string | null
  props: Record<string, PropDef>
  relatedTypes?: Record<string, RelatedType>
}
