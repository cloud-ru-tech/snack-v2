import { visit } from 'unist-util-visit'

/**
 * Remark plugin: extracts the raw source of `<Example>` children and
 * injects it as a `code` prop (expression attribute). Allows writing
 *
 *   <Example title="...">
 *     <Button label="Primary" />
 *   </Example>
 *
 * without manually duplicating the code.
 */
export function remarkExampleCode() {
  return function transformer(tree, file) {
    const source = String(file.value)

    visit(tree, (node) => {
      if (
        node.type !== 'mdxJsxFlowElement' &&
        node.type !== 'mdxJsxTextElement'
      ) {
        return
      }
      if (node.name !== 'Example') return
      if (!Array.isArray(node.children) || node.children.length === 0) return

      // If author already passed explicit `code` — don't override.
      const hasCode = (node.attributes ?? []).some(
        (attr) => attr.type === 'mdxJsxAttribute' && attr.name === 'code',
      )
      if (hasCode) return

      const first = node.children[0]
      const last = node.children[node.children.length - 1]
      const startOffset = first.position?.start?.offset
      const endOffset = last.position?.end?.offset

      if (typeof startOffset !== 'number' || typeof endOffset !== 'number') return

      const rawCode = source
        .slice(startOffset, endOffset)
        .replace(/^\s*\n/, '')
        .replace(/\n\s*$/, '')

      // Normalize common leading indentation so the rendered code block is flush-left.
      const lines = rawCode.split('\n')
      const nonEmpty = lines.filter((line) => line.trim().length > 0)
      const minIndent = nonEmpty.reduce((min, line) => {
        const match = line.match(/^\s*/)
        const indent = match ? match[0].length : 0
        return indent < min ? indent : min
      }, Infinity)
      const normalizedCode = (
        minIndent !== Infinity && minIndent > 0
          ? lines.map((line) => line.slice(minIndent)).join('\n')
          : rawCode
      )

      node.attributes = node.attributes ?? []
      node.attributes.push({
        type: 'mdxJsxAttribute',
        name: 'code',
        value: normalizedCode,
      })
    })
  }
}
