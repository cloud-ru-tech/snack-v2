import { visit } from 'unist-util-visit';

/**
 * Remark plugin: ` ```mermaid ` fenced blocks → `<Mermaid client:load="react" chart="…" />`.
 * Файл MDX должен импортировать `{ Mermaid } from '#docs/components/Mermaid'`.
 */
export function remarkMermaid() {
  return function transformer(tree) {
    visit(tree, (node, index, parent) => {
      if (node.type !== 'code' || node.lang !== 'mermaid') return;
      if (!parent || index == null) return;

      parent.children[index] = {
        type: 'mdxJsxFlowElement',
        name: 'Mermaid',
        attributes: [
          { type: 'mdxJsxAttribute', name: 'client:only', value: 'react' },
          { type: 'mdxJsxAttribute', name: 'chart', value: node.value ?? '' },
        ],
        children: [],
      };
    });
  };
}
