/**
 * Remark plugin: injects a hidden H3 anchor before every `<Example title="…">`
 * so its title lands in the `headings` API — the right-hand TOC nests these
 * under the nearest H2 (usually "Примеры использования"), giving readers a
 * per-example jump target.
 *
 * The H3 is marked `class="anchor-heading"`; `doc-page.scss` hides it visually
 * (visibility: visible for focus, but zero size / sr-only positioning) so the
 * visible title inside the Example's own <figcaption> stays the source of
 * truth for layout.
 */
export function remarkExampleHeadings() {
  return function transformer(tree) {
    walk(tree)
  }
}

function walk(parent) {
  const children = parent.children
  if (!Array.isArray(children)) return

  for (let i = 0; i < children.length; i++) {
    const node = children[i]
    if (
      (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
      node.name === 'Example'
    ) {
      const title = readStringAttr(node, 'title')
      if (title) {
        const id = slugify(title)
        const heading = {
          type: 'heading',
          depth: 3,
          data: {
            id,
            hProperties: { id, className: ['anchor-heading'] },
          },
          children: [{ type: 'text', value: title }],
        }
        children.splice(i, 0, heading)
        i++ // skip over the Example we just pushed forward
      }
    }
    if (node.children) walk(node)
  }
}

function readStringAttr(node, name) {
  const attr = node.attributes?.find(
    (a) => a?.type === 'mdxJsxAttribute' && a.name === name,
  )
  if (!attr) return null
  if (typeof attr.value === 'string') return attr.value
  return null
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
}
