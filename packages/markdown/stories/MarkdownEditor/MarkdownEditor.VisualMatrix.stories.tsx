import { MarkdownEditor, MarkdownEditorProps, TOOLBAR_ITEM, ToolbarItemId } from '@ds/markdown';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof MarkdownEditor> = {
  title: 'Components/Markdown/MarkdownEditor',
  component: MarkdownEditor,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof MarkdownEditor>;

const SHORT = `# Заголовок

Параграф с **жирным** и *курсивом*.
`;

const MINIMAL_TOOLBAR: ToolbarItemId[] = [
  TOOLBAR_ITEM.Bold,
  TOOLBAR_ITEM.Italic,
  TOOLBAR_ITEM.Link,
  TOOLBAR_ITEM.BulletList,
];

const toolbarVariants: Array<{ key: string } & Pick<MarkdownEditorProps, 'toolbar'>> = [
  { key: 'full' },
  { key: 'minimal', toolbar: MINIMAL_TOOLBAR },
  { key: 'hidden (toolbar=false)', toolbar: false },
];

const stateVariants: Array<{ key: string; defaultValue: string; placeholder: string }> = [
  { key: 'filled', defaultValue: SHORT, placeholder: 'Начните писать…' },
  { key: 'empty', defaultValue: '', placeholder: 'Начните писать…' },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Toolbar × Content'
        firstColumnHeader='Toolbar'
        columnHeaders={['Editor']}
        rows={toolbarVariants.map(({ key, ...rest }) => ({
          variantLabel: key,
          cells: [
            <div key={key} className={styles.cell}>
              <MarkdownEditor defaultValue={SHORT} {...rest} />
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Header × Content'
        firstColumnHeader='Header'
        columnHeaders={['false', 'true']}
        rows={[
          {
            variantLabel: 'hideHeader',
            cells: [
              <div key={'header'} className={styles.cell}>
                <MarkdownEditor defaultValue={SHORT} />
              </div>,
              <div key={'hideHeader'} className={styles.cell}>
                <MarkdownEditor defaultValue={SHORT} hideHeader />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='State'
        firstColumnHeader='Value'
        columnHeaders={['Raw', 'Preview']}
        rows={stateVariants.map(({ key, ...rest }) => ({
          variantLabel: key,
          cells: [
            <div key={`${key}-raw`} className={styles.cell}>
              <MarkdownEditor {...rest} />
            </div>,
            <div key={`${key}-preview`} className={styles.cell}>
              <MarkdownEditor defaultPreview {...rest} />
            </div>,
          ],
        }))}
      />
    </div>
  ),
};
