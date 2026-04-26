import { readFile } from 'node:fs/promises'
import { dirname, resolve as resolvePath } from 'node:path'

import { codeToHtml } from 'shiki'
import { visit } from 'unist-util-visit'

const SHIKI_THEME = 'github-dark'
const SHIKI_LANG_DEFAULT = 'tsx'

/**
 * Remark plugin: extracts the raw source of `<Example>` children and
 * injects it as a `code` prop (expression attribute), then pre-highlights
 * the code via Shiki at build time and injects the resulting HTML as a
 * `codeHtml` prop. Example renders `codeHtml` directly — no client-side
 * hydration needed, so it works for server-only MDX pages.
 *
 * Supports two forms:
 *   1) <Example>...</Example>                        — children used as source
 *   2) <Example code={FooSrc}>...</Example>, where FooSrc is
 *      `import FooSrc from './foo.tsx?raw'`          — ?raw import resolved
 */
export function remarkExampleCode() {
  return async function transformer(tree, file) {
    const source = String(file.value)
    const mdxPath = typeof file.path === 'string' ? file.path : null

    // ── 1. Collect `import X from './path?raw'` declarations ───────────────
    const rawImports = new Map() // name -> absolute path
    for (const node of tree.children ?? []) {
      if (node.type !== 'mdxjsEsm') continue
      const body = node.data?.estree?.body
      if (!Array.isArray(body)) continue
      for (const stmt of body) {
        if (stmt.type !== 'ImportDeclaration') continue
        const src = stmt.source?.value
        if (typeof src !== 'string' || !src.endsWith('?raw')) continue
        const defaultSpec = stmt.specifiers.find(s => s.type === 'ImportDefaultSpecifier')
        if (!defaultSpec || !mdxPath) continue
        const relPath = src.slice(0, -'?raw'.length)
        const absPath = resolvePath(dirname(mdxPath), relPath)
        rawImports.set(defaultSpec.local.name, absPath)
      }
    }

    // ── 2. Collect Example nodes to process ────────────────────────────────
    const targets = []
    visit(tree, node => {
      if (node.type !== 'mdxJsxFlowElement' && node.type !== 'mdxJsxTextElement') return
      if (node.name !== 'Example') return
      targets.push(node)
    })

    // ── 3. For each Example: resolve code, highlight, inject attributes ────
    await Promise.all(
      targets.map(async node => {
        const attrs = (node.attributes ??= [])
        const codeAttr = attrs.find(a => a.type === 'mdxJsxAttribute' && a.name === 'code')

        let code = null

        if (codeAttr) {
          // `code={Identifier}` — try resolving via ?raw imports
          const expr = codeAttr.value?.data?.estree?.body?.[0]?.expression
          if (expr?.type === 'Identifier' && rawImports.has(expr.name)) {
            try {
              code = await readFile(rawImports.get(expr.name), 'utf8')
            } catch {
              // ignore — leave fallback to runtime
            }
          }
        } else if (Array.isArray(node.children) && node.children.length > 0) {
          // Children form — extract raw slice of MDX source.
          const first = node.children[0]
          const last = node.children[node.children.length - 1]
          const startOffset = first.position?.start?.offset
          const endOffset = last.position?.end?.offset
          if (typeof startOffset === 'number' && typeof endOffset === 'number') {
            code = source.slice(startOffset, endOffset)
          }
        }

        if (code == null) return

        const normalized = normalizeIndent(code.replace(/^\s*\n/, '').replace(/\n\s*$/, ''))

        if (!codeAttr) {
          attrs.push({ type: 'mdxJsxAttribute', name: 'code', value: normalized })
        }

        let html = null
        try {
          html = await codeToHtml(normalized, { lang: SHIKI_LANG_DEFAULT, theme: SHIKI_THEME })
        } catch {
          // Unsupported lang or parse error — skip, runtime fallback renders plain <pre>.
        }
        if (html) {
          attrs.push({ type: 'mdxJsxAttribute', name: 'codeHtml', value: html })
        }
      }),
    )
  }
}

function normalizeIndent(code) {
  const lines = code.split('\n')
  const nonEmpty = lines.filter(line => line.trim().length > 0)
  const minIndent = nonEmpty.reduce((min, line) => {
    const match = line.match(/^\s*/)
    const indent = match ? match[0].length : 0
    return indent < min ? indent : min
  }, Infinity)
  return minIndent !== Infinity && minIndent > 0
    ? lines.map(line => line.slice(minIndent)).join('\n')
    : code
}
