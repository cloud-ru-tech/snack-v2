import { Markdown } from '@ds/markdown';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Markdown> = {
  title: 'Components/Markdown/Markdown',
  component: Markdown,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Markdown>;

const TYPOGRAPHY = `# H1
## H2
### H3
#### H4
##### H5

Параграф с **жирным**, *курсивом*, ~~зачёркнутым~~ и \`inline code\`.
`;

const LISTS = `- bullet один
- bullet два
  - вложенный
  - ещё вложенный

1. ordered один
2. ordered два
   1. вложенный ordered
`;

const BLOCKQUOTE = `> Цитата с **форматированием**.
>
> > Вложенная цитата.
`;

const CODE_BLOCK = `\`\`\`ts
export function add(a: number, b: number): number {
  return a + b
}

const xs = [1, 2, 3].map(x => x * 2)
\`\`\`
`;

const TABLE = `| Col A | Col B | Col C |
|-------|-------|-------|
| one   | two   | three |
| four  | five  | six   |
`;

const LINKS_IMAGE = `[Snack Ui Kit](https://example.com)

![alt text](/fixtures/placeholder-80x40.svg)

---

Над разделителем — текст, под — следующий блок.

Следующий параграф.
`;

const RAW_HTML = `Обычный markdown.

<div style="padding: 8px; background: rgba(0,0,0,0.06); border-radius: 4px">
  <strong>Raw HTML</strong> блок.
</div>

После HTML.
`;

const sections: Array<{ key: string; value: string }> = [
  { key: 'typography', value: TYPOGRAPHY },
  { key: 'lists', value: LISTS },
  { key: 'blockquote', value: BLOCKQUOTE },
  { key: 'code-block', value: CODE_BLOCK },
  { key: 'table (GFM)', value: TABLE },
  { key: 'links + image + hr', value: LINKS_IMAGE },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Содержимое'
        firstColumnHeader='Block'
        columnHeaders={['Render']}
        rows={sections.map(({ key, value }) => ({
          variantLabel: key,
          cells: [<Markdown key={key} value={value} />],
        }))}
      />

      <StoryTable
        sectionTitle='skipHtml'
        firstColumnHeader='value'
        columnHeaders={['Render']}
        rows={[
          {
            variantLabel: 'skipHtml=true (по умолчанию)',
            cells: [<Markdown key='skip' value={RAW_HTML} skipHtml />],
          },
          {
            variantLabel: 'skipHtml=false',
            cells: [<Markdown key='keep' value={RAW_HTML} skipHtml={false} />],
          },
        ]}
      />
    </div>
  ),
};
