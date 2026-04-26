/**
 * Remark plugin: scans each `<PropsTable data={xDoc.Y} />` invocation, loads the
 * referenced props.json (via the matching `import xDoc from './props.json'`),
 * and injects hidden H3 anchors for every related type that the PropsTable will
 * render. Result: related types (CounterProps, Appearance, …) land in the
 * right-hand TOC nested under the `## Props` H2.
 *
 * Uses the same `anchor-heading` class as remark-example-headings — it's
 * visually hidden but present in the DOM, so TOC / scroll anchors work.
 */

import { readFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

function slug(typeName, scope) {
  return `related-${scope}-${typeName}`.replace(/[^a-zA-Z0-9_-]/g, '-')
}

export function remarkPropsTableHeadings() {
  return function transformer(tree, file) {
    const mdxPath = file?.history?.[file.history.length - 1] ?? file?.path
    if (!mdxPath) return

    const imports = collectJsonImports(tree, mdxPath)
    walk(tree, imports)
  }
}

function collectJsonImports(tree, mdxPath) {
  // Map: imported binding name → resolved JSON object.
  const map = new Map()
  const baseDir = dirname(mdxPath)

  for (const node of tree.children ?? []) {
    if (node.type !== 'mdxjsEsm') continue
    const body = node.data?.estree?.body ?? []
    for (const decl of body) {
      if (decl.type !== 'ImportDeclaration') continue
      const src = decl.source?.value
      if (typeof src !== 'string' || !src.endsWith('.json')) continue
      const abs = resolve(baseDir, src)
      if (!existsSync(abs)) continue
      let json
      try {
        json = JSON.parse(readFileSync(abs, 'utf8'))
      } catch {
        continue
      }
      for (const spec of decl.specifiers) {
        if (spec.type === 'ImportDefaultSpecifier' || spec.type === 'ImportNamespaceSpecifier') {
          map.set(spec.local.name, json)
        }
      }
    }
  }
  return map
}

function walk(parent, imports) {
  const children = parent.children
  if (!Array.isArray(children)) return

  for (let i = 0; i < children.length; i++) {
    const node = children[i]
    if (
      (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
      node.name === 'PropsTable'
    ) {
      const doc = resolvePropsTableData(node, imports)
      if (doc) {
        const headings = buildHeadings(doc)
        if (headings.length) {
          children.splice(i + 1, 0, ...headings)
          i += headings.length
        }
      }
    }
    if (node.children) walk(node, imports)
  }
}

/** Read `data={xDoc.Y}` → return the ComponentDoc object from the loaded JSON. */
function resolvePropsTableData(node, imports) {
  const attr = node.attributes?.find(
    (a) => a?.type === 'mdxJsxAttribute' && a.name === 'data',
  )
  if (!attr) return null
  const expr = attr.value?.data?.estree?.body?.[0]?.expression
  if (!expr || expr.type !== 'MemberExpression') return null
  if (expr.object?.type !== 'Identifier' || expr.property?.type !== 'Identifier') return null
  const json = imports.get(expr.object.name)
  if (!json) return null
  const doc = json[expr.property.name]
  if (!doc || typeof doc !== 'object') return null
  return doc
}

function buildHeadings(doc) {
  const props = doc.props ?? {}
  const relatedTypes = doc.relatedTypes ?? {}
  const referenced = new Set()
  for (const name of Object.keys(props)) {
    for (const ref of props[name]?.typeRefs ?? []) referenced.add(ref)
  }
  const scope = doc.displayName || doc.propsTypeName || 'props'
  const entries = Object.entries(relatedTypes)
    .filter(([name]) => referenced.has(name))
    .sort(([an], [bn]) => an.localeCompare(bn))
  const typesItems = entries
    .filter(([, r]) => r?.own && r?.kind !== 'union')
    .map(([name]) => ({ name, id: slug(name, scope) }))
  const unionsItems = entries
    .filter(([, r]) => r?.own && r?.kind === 'union')
    .map(([name]) => ({ name, id: slug(name, scope) }))
  const externalItems = entries
    .filter(([, r]) => !r?.own)
    .map(([name]) => ({ name, id: slug(name, scope) }))

  // Prepend the component's own props type (ButtonProps etc.) to Types — it
  // references the main table itself.
  if (doc.propsTypeName) {
    typesItems.unshift({
      name: doc.propsTypeName,
      id: `${scope}-self`.replace(/[^a-zA-Z0-9_-]/g, '-'),
    })
  }

  const out = []
  const emitGroup = (groupId, title, items) => {
    if (items.length === 0) return
    out.push(heading(3, groupId, title))
    for (const it of items) out.push(heading(4, it.id, it.name))
  }
  emitGroup(`${scope}-types`.replace(/[^a-zA-Z0-9_-]/g, '-'), 'Types', typesItems)
  emitGroup(`${scope}-unions`.replace(/[^a-zA-Z0-9_-]/g, '-'), 'Unions', unionsItems)
  emitGroup(`${scope}-related-props`.replace(/[^a-zA-Z0-9_-]/g, '-'), 'Related props', externalItems)
  return out
}

function heading(depth, id, text) {
  return {
    type: 'heading',
    depth,
    data: { id, hProperties: { id, className: ['anchor-heading'] } },
    children: [{ type: 'text', value: text }],
  }
}
